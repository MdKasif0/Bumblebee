/**
 * app.js
 * Main application coordinator: Audio sync, player controls, keyboard navigation,
 * and presentation styling.
 */

import { SpriteManager } from './sprites.js';
import { LCDRenderer } from './renderer.js';
import { SCENES, getSceneAt } from './timeline.js';

class BumblebeeApp {
  constructor() {
    this.canvas = document.getElementById('lcd-canvas');
    this.audio = document.getElementById('audio-track');
    this.playBtn = document.getElementById('play-btn');
    this.scrubber = document.getElementById('scrubber');
    this.timeDisplay = document.getElementById('time-display');
    this.volumeSlider = document.getElementById('volume-slider');
    this.muteBtn = document.getElementById('mute-btn');
    this.fullscreenBtn = document.getElementById('fullscreen-btn');
    this.gridToggle = document.getElementById('grid-toggle');
    this.bezelToggle = document.getElementById('bezel-toggle');
    this.displayWrapper = document.getElementById('display-wrapper');
    this.startOverlay = document.getElementById('start-overlay');
    this.loadingProgress = document.getElementById('loading-progress');
    this.sceneList = document.getElementById('scene-list');

    this.sprites = new SpriteManager();
    this.renderer = new LCDRenderer(this.canvas, this.sprites);

    this.isPlaying = false;
    this.duration = 31.88;
    this.isScrubbing = false;
    this.animFrameId = null;

    this.init();
  }

  async init() {
    this.setupUI();
    this.buildSceneJumpList();

    // Preload all sprites with progress feedback
    await this.sprites.loadAll((progress) => {
      if (this.loadingProgress) {
        this.loadingProgress.style.width = `${Math.round(progress * 100)}%`;
      }
    });

    if (this.startOverlay) {
      this.startOverlay.classList.remove('loading');
      this.startOverlay.classList.add('ready');
    }

    // Render initial scene at 0.0s
    this.renderAt(0);
  }

  setupUI() {
    // Start Overlay click
    this.startOverlay.addEventListener('click', () => {
      this.startOverlay.classList.add('hidden');
      this.play();
    });

    // Play/Pause button
    this.playBtn.addEventListener('click', () => {
      this.togglePlay();
    });

    // Audio event listeners
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration || 31.88;
      if (this.pendingSeek !== undefined && this.pendingSeek !== null) {
        this.audio.currentTime = this.pendingSeek;
        this.pendingSeek = null;
      }
      this.updateTimeDisplay(this.audio.currentTime);
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.updatePlayBtnIcon();
      this.startLoop();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updatePlayBtnIcon();
      this.stopLoop();
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.updatePlayBtnIcon();
      this.stopLoop();
      this.scrubber.value = 100;
      this.updateTimeDisplay(this.duration);
    });

    this.audio.addEventListener('timeupdate', () => {
      if (!this.isScrubbing) {
        const cur = this.audio.currentTime;
        this.scrubber.value = (cur / this.duration) * 100;
        this.updateTimeDisplay(cur);
      }
    });

    // Scrubber controls
    this.scrubber.addEventListener('input', () => {
      this.isScrubbing = true;
      const targetTime = (this.scrubber.value / 100) * this.duration;
      this.updateTimeDisplay(targetTime);
      this.renderAt(targetTime);
      this.highlightActiveScene(targetTime);
    });

    this.scrubber.addEventListener('change', () => {
      const targetTime = (this.scrubber.value / 100) * this.duration;
      this.isScrubbing = false;
      this.seekTo(targetTime);
      if (this.isPlaying) {
        this.audio.play().catch(() => {});
      }
    });

    // Volume & Mute
    this.volumeSlider.addEventListener('input', () => {
      this.audio.volume = parseFloat(this.volumeSlider.value);
      this.audio.muted = false;
      this.updateMuteBtnIcon();
    });

    this.muteBtn.addEventListener('click', () => {
      this.audio.muted = !this.audio.muted;
      this.updateMuteBtnIcon();
    });

    // Fullscreen
    this.fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        this.displayWrapper.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Display Toggles
    this.gridToggle.addEventListener('change', (e) => {
      this.renderer.setOptions({ showPixelGrid: e.target.checked });
      this.renderAt(this.audio.currentTime);
    });

    this.bezelToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        this.displayWrapper.classList.add('hardware-bezel');
      } else {
        this.displayWrapper.classList.remove('hardware-bezel');
      }
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' && e.target.type !== 'range') return;
      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        this.seekRelative(-2.0);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        this.seekRelative(2.0);
      } else if (e.code === 'KeyM') {
        this.audio.muted = !this.audio.muted;
        this.updateMuteBtnIcon();
      } else if (e.code === 'KeyF') {
        this.fullscreenBtn.click();
      }
    });
  }

  buildSceneJumpList() {
    if (!this.sceneList) return;
    this.sceneList.innerHTML = '';

    SCENES.forEach((scene, index) => {
      const btn = document.createElement('button');
      btn.className = 'scene-pill';
      btn.innerHTML = `<span class="pill-time">${scene.start.toFixed(1)}s</span> ${scene.title}`;
      btn.addEventListener('click', () => {
        this.seekTo(scene.start);
      });
      this.sceneList.appendChild(btn);
    });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.audio.play().catch((err) => {
      console.warn('[BumblebeeApp] Autoplay blocked:', err);
    });
  }

  pause() {
    this.audio.pause();
  }

  seekTo(seconds) {
    const clamped = Math.max(0, Math.min(this.duration, seconds));
    if (this.audio.readyState >= 1) {
      this.audio.currentTime = clamped;
    } else {
      this.pendingSeek = clamped;
      this.audio.load();
    }
    this.scrubber.value = (clamped / this.duration) * 100;
    this.updateTimeDisplay(clamped);
    this.renderAt(clamped);
    this.highlightActiveScene(clamped);
  }

  seekRelative(delta) {
    this.seekTo(this.audio.currentTime + delta);
  }

  startLoop() {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

    const frame = () => {
      if (!this.isPlaying) return;
      const t = this.audio.currentTime;
      this.renderAt(t);
      this.highlightActiveScene(t);
      this.animFrameId = requestAnimationFrame(frame);
    };
    this.animFrameId = requestAnimationFrame(frame);
  }

  stopLoop() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  renderAt(time) {
    const sceneData = getSceneAt(time);
    this.renderer.render(time, sceneData);
  }

  highlightActiveScene(time) {
    if (!this.sceneList) return;
    const sceneData = getSceneAt(time);
    const pills = this.sceneList.querySelectorAll('.scene-pill');
    pills.forEach((p, idx) => {
      if (idx === sceneData.sceneIndex) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
  }

  updatePlayBtnIcon() {
    this.playBtn.innerHTML = this.isPlaying
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
  }

  updateMuteBtnIcon() {
    if (this.audio.muted || this.audio.volume === 0) {
      this.muteBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`;
    } else {
      this.muteBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;
    }
  }

  updateTimeDisplay(seconds) {
    const curMin = Math.floor(seconds / 60);
    const curSec = Math.floor(seconds % 60);
    const durMin = Math.floor(this.duration / 60);
    const durSec = Math.floor(this.duration % 60);

    const pad = (n) => String(n).padStart(2, '0');
    this.timeDisplay.textContent = `${pad(curMin)}:${pad(curSec)} / ${pad(durMin)}:${pad(durSec)}`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new BumblebeeApp();
});
