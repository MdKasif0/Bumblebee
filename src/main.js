/**
 * main.js - Central AnimationController.
 * Coordinates AudioClock, Timeline, SceneRenderer, PixelTypography,
 * CharacterRenderer, and EffectsRenderer with autoplay and infinite looping.
 * All UI controls, headers, timelines, and debug elements have been removed.
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

    // Configure autoplay & loop
    this._initAutoplay();
    this._startLoop();
  }

  _initAutoplay() {
    this.audioClock.setLoop(true);

    // Attempt unmuted or muted autoplay immediately on page load
    this.audioClock.play().catch(() => {});

    // Technical fallback for browser autoplay policy:
    // If audio started in muted mode, seamlessly restore sound on the very first
    // touch, click, or keypress anywhere on the window.
    const unlockAudio = async () => {
      if (this.audioClock.audio) {
        if (this.audioClock.audio.muted) {
          this.audioClock.audio.muted = false;
        }
        if (this.audioClock.audio.paused) {
          this.audioClock.audio.currentTime = this.audioClock.currentTime;
          await this.audioClock.audio.play().catch(() => {});
        }
      }
    };

    ['pointerdown', 'keydown', 'touchstart', 'click'].forEach(evt => {
      window.addEventListener(evt, unlockAudio, { once: true, passive: true });
    });
  }

  _startLoop() {
    const loop = () => {
      // Master audio clock time
      let time = this.audioClock.currentTime;

      // Infinite loop: when animation reaches exact end of timeline (or audio ends), restart from 0
      if (time >= this.timelineDuration || (this.audioClock.audio && this.audioClock.audio.ended)) {
        this.audioClock.seek(0);
        this.audioClock.play().catch(() => {});
        time = 0;
      }

      const scene = getSceneAtTime(time);

      // Render frame
      this.renderer.render(
        scene,
        time,
        this.characters,
        this.typography,
        this.effects
      );

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

