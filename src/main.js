/**
 * main.js - Central AnimationController.
 * Coordinates AudioClock, Timeline, SceneRenderer, PixelTypography,
 * CharacterRenderer, EffectsRenderer, and UI interactions.
 */

import { AudioClock } from './audio.js';
import { TIMELINE, getSceneAtTime, getSceneIndexAtTime } from './timeline.js';
import { SceneRenderer } from './renderer.js';
import { PixelTypography } from './typography.js';
import { CharacterRenderer } from './characters.js';
import { EffectsRenderer } from './effects.js';

export class AnimationController {
  constructor() {
    // Core Subsystems
    this.audioClock = new AudioClock('audio-master');
    this.timeline = TIMELINE;
    this.renderer = new SceneRenderer('display-canvas');
    this.typography = new PixelTypography();
    this.characters = new CharacterRenderer();
    this.effects = new EffectsRenderer();

    // State
    this.isScrubbing = false;
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this.fpsTimer = performance.now();
    this.currentFps = 60;

    // DOM Elements
    this.dom = {
      btnPlayPause: document.getElementById('btn-play-pause'),
      iconPlay: document.getElementById('icon-play'),
      iconPause: document.getElementById('icon-pause'),
      playPauseLabel: document.getElementById('play-pause-label'),
      btnRestart: document.getElementById('btn-restart'),
      btnPrevScene: document.getElementById('btn-prev-scene'),
      btnNextScene: document.getElementById('btn-next-scene'),
      slider: document.getElementById('timeline-slider'),
      sceneMarkers: document.getElementById('scene-markers'),
      currentTime: document.getElementById('current-time-display'),
      totalTime: document.getElementById('total-time-display'),
      currentSceneId: document.getElementById('current-scene-id'),
      currentLyric: document.getElementById('current-lyric-display'),
      currentTiming: document.getElementById('current-scene-timing'),
      fpsCounter: document.getElementById('fps-counter'),
      paletteSelect: document.getElementById('palette-select'),
      speedSelect: document.getElementById('speed-select'),
      btnMute: document.getElementById('btn-mute'),
      muteIcon: document.getElementById('mute-icon'),
      btnFullscreen: document.getElementById('btn-fullscreen')
    };

    this._initUI();
    this._renderSceneMarkers();
    this._bindEvents();
    this._startLoop();
  }

  _initUI() {
    this.dom.totalTime.textContent = this._formatTime(this.audioClock.duration);
    this.dom.slider.max = this.audioClock.duration.toString();
  }

  _renderSceneMarkers() {
    if (!this.dom.sceneMarkers) return;
    this.dom.sceneMarkers.innerHTML = '';
    const totalDuration = this.audioClock.duration;

    for (const scene of this.timeline) {
      if (scene.id === 1) continue;
      const marker = document.createElement('div');
      marker.className = 'scene-marker-tick';
      const pct = (scene.startTime / totalDuration) * 100;
      marker.style.left = `${pct}%`;
      marker.title = `Scene ${scene.id}: ${scene.name} (${scene.startTime.toFixed(2)}s)`;
      this.dom.sceneMarkers.appendChild(marker);
    }
  }

  _bindEvents() {
    // Play/Pause Button
    this.dom.btnPlayPause.addEventListener('click', () => {
      this.audioClock.toggle();
    });

    // Audio Clock Events
    this.audioClock.on('play', () => {
      this.dom.iconPlay.style.display = 'none';
      this.dom.iconPause.style.display = 'inline-block';
      this.dom.playPauseLabel.textContent = 'Pause';
    });

    this.audioClock.on('pause', () => {
      this.dom.iconPlay.style.display = 'inline-block';
      this.dom.iconPause.style.display = 'none';
      this.dom.playPauseLabel.textContent = 'Play';
    });

    this.audioClock.on('ended', () => {
      this.dom.iconPlay.style.display = 'inline-block';
      this.dom.iconPause.style.display = 'none';
      this.dom.playPauseLabel.textContent = 'Play';
    });

    // Restart Button
    this.dom.btnRestart.addEventListener('click', () => {
      this.audioClock.seek(0);
      this.audioClock.play();
    });

    // Previous Scene
    this.dom.btnPrevScene.addEventListener('click', () => {
      const curIdx = getSceneIndexAtTime(this.audioClock.currentTime);
      if (curIdx > 0) {
        this.audioClock.seek(this.timeline[curIdx - 1].startTime);
      } else {
        this.audioClock.seek(0);
      }
    });

    // Next Scene
    this.dom.btnNextScene.addEventListener('click', () => {
      const curIdx = getSceneIndexAtTime(this.audioClock.currentTime);
      if (curIdx < this.timeline.length - 1) {
        this.audioClock.seek(this.timeline[curIdx + 1].startTime);
      }
    });

    // Timeline Slider Scrubbing
    this.dom.slider.addEventListener('input', (e) => {
      this.isScrubbing = true;
      const targetTime = parseFloat(e.target.value);
      this.audioClock.seek(targetTime);
      this._updateHUD(targetTime);
    });

    this.dom.slider.addEventListener('change', () => {
      this.isScrubbing = false;
    });

    // Palette Selector
    this.dom.paletteSelect.addEventListener('change', (e) => {
      this.effects.setPalette(e.target.value);
    });

    // Speed Selector
    this.dom.speedSelect.addEventListener('change', (e) => {
      this.audioClock.setPlaybackRate(parseFloat(e.target.value));
    });

    // Mute Button
    this.dom.btnMute.addEventListener('click', () => {
      const isMuted = !this.audioClock.isMuted;
      this.audioClock.setMuted(isMuted);
      this.dom.muteIcon.textContent = isMuted ? '🔇' : '🔊';
    });

    // Fullscreen
    this.dom.btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        this.audioClock.toggle();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        const curIdx = getSceneIndexAtTime(this.audioClock.currentTime);
        const targetTime = Math.max(0, this.timeline[Math.max(0, curIdx - 1)].startTime);
        this.audioClock.seek(targetTime);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        const curIdx = getSceneIndexAtTime(this.audioClock.currentTime);
        const targetTime = Math.min(this.audioClock.duration, this.timeline[Math.min(this.timeline.length - 1, curIdx + 1)].startTime);
        this.audioClock.seek(targetTime);
      } else if (e.code === 'Home') {
        e.preventDefault();
        this.audioClock.seek(0);
      } else if (e.code === 'KeyM') {
        this.dom.btnMute.click();
      }
    });
  }

  _startLoop() {
    const loop = (timestamp) => {
      // FPS measurement
      this.frameCount++;
      if (timestamp - this.fpsTimer >= 1000) {
        this.currentFps = Math.round((this.frameCount * 1000) / (timestamp - this.fpsTimer));
        this.dom.fpsCounter.textContent = `${this.currentFps} FPS`;
        this.frameCount = 0;
        this.fpsTimer = timestamp;
      }

      // Master audio clock time
      const time = this.isScrubbing ? parseFloat(this.dom.slider.value) : this.audioClock.currentTime;
      const scene = getSceneAtTime(time);

      // Render frame
      this.renderer.render(
        scene,
        time,
        this.characters,
        this.typography,
        this.effects
      );

      // Update HUD if not actively scrubbing with mouse
      if (!this.isScrubbing) {
        this._updateHUD(time, scene);
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  _updateHUD(time, scene = getSceneAtTime(time)) {
    this.dom.currentTime.textContent = this._formatTime(time);
    this.dom.slider.value = time.toString();

    const sceneIdx = getSceneIndexAtTime(time) + 1;
    this.dom.currentSceneId.textContent = `SCENE ${String(sceneIdx).padStart(2, '0')} / ${this.timeline.length}`;
    
    // Clean preview lyric
    const displayLyric = scene.lyric ? scene.lyric.replace('\n', ' / ') : `[${scene.name}]`;
    this.dom.currentLyric.textContent = displayLyric;

    this.dom.currentTiming.textContent = `${scene.startTime.toFixed(2)}s – ${scene.endTime.toFixed(2)}s`;
  }

  _formatTime(seconds) {
    const s = Math.max(0, seconds);
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    const centis = Math.floor((s % 1) * 100);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(centis).padStart(2, '0')}`;
  }
}

// Instantiate AnimationController when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.animationController = new AnimationController();
});
