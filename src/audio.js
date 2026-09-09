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
    this.isLooping = false;

    this.listeners = {
      play: [],
      pause: [],
      seek: [],
      ended: [],
      timeupdate: [],
      durationchange: []
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
        this._emit('durationchange', this.duration);
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
      if (this.isLooping) {
        this.seek(0);
        this.play();
      } else {
        this._emit('ended');
      }
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
   * Directly driven by audio.currentTime with zero drift.
   */
  get currentTime() {
    if (this.audio && !this.isFallback && !this.audio.error && !this.audio.paused) {
      return this.audio.currentTime;
    }
    if (this.simulatedPlaying && this.lastFallbackTimestamp !== null) {
      const now = performance.now();
      const delta = (now - this.lastFallbackTimestamp) / 1000 * this.playbackRate;
      this.fallbackTime = Math.min(this.duration, this.fallbackTime + delta);
      this.lastFallbackTimestamp = now;
      if (this.fallbackTime >= this.duration) {
        if (this.isLooping) {
          this.fallbackTime = 0;
          this._emit('seek', 0);
        } else {
          this.simulatedPlaying = false;
          this._emit('ended');
        }
      }
      return this.fallbackTime;
    }
    return this.audio ? this.audio.currentTime : this.fallbackTime;
  }

  set currentTime(time) {
    const clamped = Math.max(0, Math.min(this.duration, time));
    this.fallbackTime = clamped;
    this.lastFallbackTimestamp = performance.now();
    if (this.audio && !this.isFallback && !this.audio.error) {
      try {
        this.audio.currentTime = clamped;
      } catch (e) {
        console.warn('Seek error on audio element:', e);
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
        this.simulatedPlaying = false;
        this._emit('play');
        return true;
      } catch (err) {
        console.warn('Unmuted audio play blocked by browser policy. Falling back to muted autoplay:', err);
        try {
          this.audio.muted = true;
          await this.audio.play();
          this.simulatedPlaying = false;
          this._emit('play');
          return true;
        } catch (mutedErr) {
          console.warn('Muted autoplay deferred, running simulated high-precision clock:', mutedErr);
          this.simulatedPlaying = true;
          this.lastFallbackTimestamp = performance.now();
          this._emit('play');
          return false;
        }
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

  setLoop(loop) {
    this.isLooping = Boolean(loop);
  }

  get loop() {
    return this.isLooping;
  }
}
