/**
 * AudioClock - Master time source for the Bumblebee animation.
 * The audio playback position drives the animation timeline.
 */
export class AudioClock {
  constructor(audioElementId = 'audio-master') {
    this.audio = document.getElementById(audioElementId);
    this.fallbackTime = 0;
    this.lastFallbackTimestamp = null;
    this.isFallback = false;
    this.simulatedPlaying = false;
    this.playbackRate = 1.0;
    this.duration = 31.87;

    this.listeners = {
      play: [],
      pause: [],
      seek: [],
      ended: [],
      timeupdate: []
    };

    this._initAudio();
  }

  _initAudio() {
    if (!this.audio) {
      console.warn('Audio element not found, using performance.now fallback clock.');
      this.isFallback = true;
      return;
    }

    this.audio.addEventListener('loadedmetadata', () => {
      if (this.audio.duration && !isNaN(this.audio.duration)) {
        this.duration = this.audio.duration;
      }
    });

    this.audio.addEventListener('play', () => {
      this._emit('play');
    });

    this.audio.addEventListener('pause', () => {
      this._emit('pause');
    });

    this.audio.addEventListener('seeked', () => {
      this._emit('seek', this.currentTime);
    });

    this.audio.addEventListener('ended', () => {
      this._emit('ended');
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('Audio element error, falling back to simulated high-precision clock:', e);
      this.isFallback = true;
    });
  }

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  _emit(event, payload) {
    if (this.listeners[event]) {
      for (const cb of this.listeners[event]) {
        cb(payload);
      }
    }
  }

  /**
   * Current master time in seconds.
   */
  get currentTime() {
    if (this.audio && !this.isFallback && !this.audio.error) {
      if (this.audio.paused && this.fallbackTime !== undefined) {
        return this.fallbackTime;
      }
      return this.audio.currentTime;
    }
    if (this.simulatedPlaying && this.lastFallbackTimestamp !== null) {
      const now = performance.now();
      const delta = (now - this.lastFallbackTimestamp) / 1000 * this.playbackRate;
      this.fallbackTime = Math.min(this.duration, this.fallbackTime + delta);
      this.lastFallbackTimestamp = now;
      if (this.fallbackTime >= this.duration) {
        this.simulatedPlaying = false;
        this._emit('ended');
      }
    }
    return this.fallbackTime;
  }

  set currentTime(time) {
    const clamped = Math.max(0, Math.min(this.duration, time));
    this.fallbackTime = clamped;
    this.lastFallbackTimestamp = performance.now();
    if (this.audio && !this.isFallback && !this.audio.error) {
      try {
        this.audio.currentTime = clamped;
      } catch (e) {
        // Ignored if audio element is not yet interactive
      }
    }
    this._emit('seek', clamped);
  }

  get isPlaying() {
    if (this.audio && !this.isFallback && !this.audio.error) {
      return !this.audio.paused && !this.audio.ended;
    }
    return this.simulatedPlaying;
  }

  async play() {
    if (this.audio && !this.isFallback && !this.audio.error) {
      try {
        await this.audio.play();
        return true;
      } catch (err) {
        console.warn('Audio play request blocked by browser policy, falling back to simulated clock until user gesture:', err);
        this.simulatedPlaying = true;
        this.lastFallbackTimestamp = performance.now();
        this._emit('play');
        return false;
      }
    } else {
      this.simulatedPlaying = true;
      this.lastFallbackTimestamp = performance.now();
      this._emit('play');
      return true;
    }
  }

  pause() {
    if (this.audio && !this.isFallback && !this.audio.error) {
      this.audio.pause();
    }
    this.simulatedPlaying = false;
    this.lastFallbackTimestamp = null;
    this._emit('pause');
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  seek(seconds) {
    this.currentTime = seconds;
  }

  setPlaybackRate(rate) {
    this.playbackRate = Number(rate);
    if (this.audio) {
      this.audio.playbackRate = this.playbackRate;
    }
  }

  setVolume(volume) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  get volume() {
    return this.audio ? this.audio.volume : 1.0;
  }

  setMuted(muted) {
    if (this.audio) {
      this.audio.muted = Boolean(muted);
    }
  }

  get isMuted() {
    return this.audio ? this.audio.muted : false;
  }
}
