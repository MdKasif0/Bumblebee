/**
 * main.js - Central AnimationController.
 * Coordinates AudioClock, Timeline, SceneRenderer, PixelTypography,
 * CharacterRenderer, and EffectsRenderer with user-initiated startup and infinite looping.
 */

import { AudioClock } from './audio.js';
import { TIMELINE, getSceneAtTime } from './timeline.js';
import { SceneRenderer } from './renderer.js';
import { PixelTypography } from './typography.js';
import { CharacterRenderer } from './characters.js';
import { EffectsRenderer } from './effects.js';

export class AnimationController {
  constructor() {
    // Core Subsystems
    this.audioClock = new AudioClock('audio-master');
    this.timeline = TIMELINE;
    this.timelineDuration = 31.867;
    this.renderer = new SceneRenderer('display-canvas');
    this.typography = new PixelTypography();
    this.characters = new CharacterRenderer();
    this.effects = new EffectsRenderer();

    this.isStarted = false;

    // Render Scene 01 at time 0 so LCD display is visible behind translucent overlay
    this._renderAtTime(0);

    // Re-render preview on window resize if not yet started
    window.addEventListener('resize', () => {
      if (!this.isStarted) {
        this._renderAtTime(0);
      }
    });

    this._setupStartInteraction();
  }

  _renderAtTime(time) {
    const scene = getSceneAtTime(time);
    this.renderer.render(
      scene,
      time,
      this.characters,
      this.typography,
      this.effects
    );
  }

  _setupStartInteraction() {
    this.audioClock.setLoop(true);

    const startExperience = async () => {
      if (this.isStarted) return;
      this.isStarted = true;

      // Smoothly dismiss translucent overlay
      const overlay = document.getElementById('start-overlay');
      if (overlay) {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 400);
      }

      // Initialize audio unmuted at time 0
      if (this.audioClock.audio) {
        this.audioClock.audio.muted = false;
        this.audioClock.audio.volume = 1.0;
        this.audioClock.audio.currentTime = 0;
      }
      this.audioClock.seek(0);
      try {
        await this.audioClock.play();
      } catch (err) {
        console.warn('Audio play error:', err);
      }

      // Launch continuous animation loop
      this._startLoop();
    };

    const overlay = document.getElementById('start-overlay');
    if (overlay) {
      overlay.addEventListener('click', startExperience);
      overlay.addEventListener('touchstart', startExperience, { passive: true });
    }

    const githubBtn = document.querySelector('.github-corner-btn');
    if (githubBtn) {
      githubBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
      githubBtn.addEventListener('click', (e) => e.stopPropagation());
    }

    // Also start if user taps or presses any key anywhere
    window.addEventListener('pointerdown', startExperience, { once: true, passive: true });
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'Tab') {
        e.preventDefault();
      }
      startExperience();
    }, { once: true });
  }

  _startLoop() {
    const loop = () => {
      if (!this.isStarted) return;

      // Master audio clock time
      let time = this.audioClock.currentTime;

      // Infinite loop: when animation reaches exact end of timeline (or audio ends), restart from 0
      if (time >= this.timelineDuration || (this.audioClock.audio && this.audioClock.audio.ended)) {
        this.audioClock.seek(0);
        this.audioClock.play().catch(() => {});
        time = 0;
      }

      this._renderAtTime(time);

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}

// Start immediately or when DOM is ready
function start() {
  if (!window.animationController) {
    window.animationController = new AnimationController();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
