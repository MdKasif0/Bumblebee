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

    // Attempt unmuted audio autoplay immediately on load
    this.audioClock.play().catch(() => {});

    // Technical fallback for browser autoplay restrictions:
    // If unmuted autoplay is deferred by browser security policy, seamlessly start audio
    // on the very first user interaction anywhere on the window without displaying any UI.
    const unlockAudio = () => {
      if (this.audioClock.audio && this.audioClock.audio.paused) {
        this.audioClock.seek(this.audioClock.currentTime);
        this.audioClock.play().catch(() => {});
      }
    };

    window.addEventListener('pointerdown', unlockAudio, { once: true, passive: true });
    window.addEventListener('keydown', unlockAudio, { once: true, passive: true });
    window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
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

// Instantiate AnimationController when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.animationController = new AnimationController();
});
