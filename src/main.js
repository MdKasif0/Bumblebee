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

    const activateSound = async () => {
      const notice = document.getElementById('sound-notice');
      if (notice) {
        notice.style.opacity = '0';
        setTimeout(() => notice.remove(), 300);
      }

      if (this.audioClock.audio) {
        this.audioClock.audio.muted = false;
        this.audioClock.audio.volume = 1.0;
        try {
          await this.audioClock.audio.play();
        } catch (e) {
          console.warn('Playback error on user gesture:', e);
        }
      }
    };

    // Listen on whole window for first interaction
    ['pointerdown', 'keydown', 'touchstart', 'click'].forEach(evt => {
      window.addEventListener(evt, activateSound, { passive: true });
    });

    // Attempt autoplay immediately
    this.audioClock.play().then((unmuted) => {
      if (!unmuted) {
        this._showSoundPrompt(activateSound);
      }
    }).catch(() => {
      this._showSoundPrompt(activateSound);
    });
  }

  _showSoundPrompt(activateSound) {
    if (document.getElementById('sound-notice')) return;
    const banner = document.createElement('div');
    banner.id = 'sound-notice';
    banner.className = 'sound-notice';
    banner.textContent = '🔊 Click anywhere for sound';
    banner.addEventListener('click', (e) => {
      e.stopPropagation();
      activateSound();
    });
    document.body.appendChild(banner);
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

