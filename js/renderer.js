/**
 * renderer.js
 * High-fidelity 256x128 logical LCD animation renderer.
 * Handles sprite compositing, beat-synced physical dynamics, screen recoil shake,
 * and authentic retro LCD color styling.
 */

import { PixelTypography } from './typography.js';
import { BPM, SECONDS_PER_BEAT } from './timeline.js';

export class LCDRenderer {
  constructor(canvas, spriteManager) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.sprites = spriteManager;
    this.typography = new PixelTypography();

    // Logical dimensions
    this.width = 256;
    this.height = 128;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Palette
    this.bgColor = '#c8d8ea';      // Pale cool blue LCD backlight
    this.lineColor = '#141a2e';    // Dark navy LCD linework

    // Shake & physics state
    this.shakeIntensity = 0;
    this.shakeDecay = 0.90;

    // Display options
    this.showPixelGrid = false;
    this.showHardwareFrame = false;
  }

  setOptions({ showPixelGrid, showHardwareFrame }) {
    if (showPixelGrid !== undefined) this.showPixelGrid = showPixelGrid;
    if (showHardwareFrame !== undefined) this.showHardwareFrame = showHardwareFrame;
  }

  triggerShake(amount) {
    this.shakeIntensity = Math.max(this.shakeIntensity, amount);
  }

  /**
   * Main render loop called on every animation frame
   */
  render(time, sceneData) {
    const { scene, progress } = sceneData;
    const ctx = this.ctx;

    // 1. Calculate screen shake
    let offsetX = 0;
    let offsetY = 0;
    if (this.shakeIntensity > 0.2) {
      offsetX = (Math.random() - 0.5) * this.shakeIntensity;
      offsetY = (Math.random() - 0.5) * this.shakeIntensity;
      this.shakeIntensity *= this.shakeDecay;
    } else {
      this.shakeIntensity = 0;
    }

    ctx.save();

    // 2. Clear background with pale cool blue LCD field
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, this.width, this.height);

    // Apply shake offset
    ctx.translate(Math.round(offsetX), Math.round(offsetY));

    // 3. Render current scene components
    this.renderScene(time, scene, progress);

    // 4. Subtle LCD pixel grid overlay (if enabled)
    if (this.showPixelGrid) {
      this.renderPixelGrid(ctx);
    }

    ctx.restore();
  }

  renderScene(time, scene, progress) {
    const ctx = this.ctx;
    const beat = (time * (BPM / 60.0));
    const beatFract = beat % 1.0;
    const beatStep = Math.floor(beat) % 2;

    switch (scene.id) {
      case 'intro': {
        // Cone hoodie character peeking
        const isBlink = (time > 0.45);
        const charKey = isBlink ? 'char_intro_2' : 'char_intro_1';
        const img = this.sprites.get(charKey);
        if (img) {
          ctx.drawImage(img, scene.charPos.x, scene.charPos.y);
        }
        break;
      }

      case 'my_heart': {
        // Text: 'MY HEART SKIPS A BEAT'
        const textImg = this.sprites.get('text_heart');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        }

        // Cat head emerging & pulsing
        // Beat pulse jump
        const pulse = Math.sin(beatFract * Math.PI) * 4;
        const charKey = beatStep === 1 ? 'char_heart_2' : 'char_heart_1';
        const charImg = this.sprites.get(charKey);
        if (charImg) {
          ctx.drawImage(charImg, 0, 65 - Math.round(pulse));
        }
        break;
      }

      case 'walk_in_room': {
        // Text: 'WHEN YOU WALK IN THE ROOM'
        const textImg = this.sprites.get('text_walk');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        }

        // Walking cat swaying left/right
        const swayStep = Math.floor(beat) % 2;
        const charKey = swayStep === 1 ? 'char_walk_2' : 'char_walk_1';
        const charImg = this.sprites.get(charKey);
        const swayX = Math.round(Math.sin(beat * Math.PI) * 5);
        const bounceY = Math.round(Math.abs(Math.sin(beat * Math.PI)) * 3);

        if (charImg) {
          ctx.drawImage(charImg, swayX, 55 - bounceY);
        }
        break;
      }

      case 'i_go': {
        // Very large emphasized lyric "I GO"
        const igoImg = this.sprites.get('special_igo');
        if (igoImg) {
          ctx.drawImage(igoImg, 10, 8);
        }

        // Cat peeking partially beneath it near bottom
        const charImg = this.sprites.get('char_boom_1');
        if (charImg) {
          ctx.drawImage(charImg, 0, 68);
        }
        break;
      }

      case 'boom': {
        // Massive BOOM hits with recoil shake
        let boomKey = 'special_boom_1';
        let posX = -30;
        let posY = 8;
        let recoilY = 6;

        if (time < 4.97) {
          boomKey = 'special_boom_1';
          posX = -30;
          recoilY = 6;
          if (time - 4.30 < 0.08) this.triggerShake(7);
        } else if (time >= 4.97 && time < 5.55) {
          boomKey = 'special_boom_2';
          posX = 0;
          recoilY = 8;
          if (time - 4.97 < 0.08) this.triggerShake(9);
        } else {
          boomKey = 'special_boom_3';
          posX = 30;
          recoilY = 12;
          if (time - 5.55 < 0.08) this.triggerShake(12);
        }

        const boomImg = this.sprites.get(boomKey);
        if (boomImg) {
          ctx.drawImage(boomImg, posX, posY);
        }

        const charImg = this.sprites.get('char_boom_1');
        if (charImg) {
          const vibrate = (Math.random() - 0.5) * 3;
          ctx.drawImage(charImg, Math.round(vibrate), 68 + recoilY);
        }
        break;
      }

      case 'you_go': {
        // Short emphasized lyric transition: "YOU GO"
        const youGoImg = this.sprites.get('special_you_go');
        if (youGoImg) {
          ctx.drawImage(youGoImg, 0, 6);
        }

        // Emerging flame silhouette
        const flameStep = Math.floor(time * 12) % 2;
        const flameKey = flameStep === 0 ? 'special_zoom_flame_1' : 'special_zoom_flame_2';
        const flameImg = this.sprites.get(flameKey);
        if (flameImg) {
          ctx.drawImage(flameImg, 0, 58);
        }
        break;
      }

      case 'zoom': {
        // ZOOM text moving across top
        const zoomStep = Math.floor((time - 5.93) / 0.40) % 3;
        const zoomImg = this.sprites.get(zoomStep % 2 === 0 ? 'special_zoom_text_1' : 'special_zoom_text_2');
        const zoomX = (zoomStep === 0) ? -40 : (zoomStep === 1 ? 0 : 40);

        if (zoomImg) {
          ctx.drawImage(zoomImg, zoomX, 4);
        }

        // Jagged spiky flame / explosion shape flickering rapidly (8-12 Hz)
        const flameStep = Math.floor(time * 12) % 2;
        const flameKey = flameStep === 0 ? 'special_zoom_flame_1' : 'special_zoom_flame_2';
        const flameImg = this.sprites.get(flameKey);
        const flameBounce = Math.round(Math.sin(time * 24) * 2);

        if (flameImg) {
          ctx.drawImage(flameImg, 0, 45 + flameBounce);
        }
        break;
      }

      case 'playboy': {
        // Text: "YOU'RE MY PLAYBOY"
        const textImg = this.sprites.get('text_playboy');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        }

        // Round-eared character
        const tiltStep = Math.floor(beat) % 2;
        const charKey = tiltStep === 0 ? 'char_playboy_1' : 'char_playboy_2';
        const charImg = this.sprites.get(charKey);
        const bobY = Math.round(Math.abs(Math.sin(beat * Math.PI)) * 3);

        if (charImg) {
          ctx.drawImage(charImg, 0, 42 - bobY);
        }
        break;
      }

      case 'playtoy': {
        // Text: 'PLAYTOY'
        const textImg = this.sprites.get('text_flower');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        }

        // Cat sitting + spinning flower
        const flowerStep = Math.floor(time * 6) % 2;
        const charKey = flowerStep === 0 ? 'char_flower_1' : 'char_flower_2';
        const charImg = this.sprites.get(charKey);
        const bob = Math.round(Math.sin(beat * Math.PI) * 2);

        if (charImg) {
          ctx.drawImage(charImg, 0, 36 + bob);
        }
        break;
      }

      case 'transitional_blank': {
        // Transitional blank/near-blank period
        // Keep pale LCD background visible with only tiny remnants near bottom
        const charImg = this.sprites.get('char_twocats_1');
        if (charImg) {
          ctx.drawImage(charImg, 0, 68);
        }
        break;
      }

      case 'wanna_be': {
        // Text: 'I WANNA BE WITH YOU'
        const textImg = this.sprites.get('text_wanna');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        }

        // Two characters dancing
        const step = Math.floor(beat) % 2;
        const charKey = step === 0 ? 'char_wanna_1' : 'char_wanna_2';
        const charImg = this.sprites.get(charKey);
        const bounce = Math.round(Math.abs(Math.sin(beat * Math.PI)) * 3);

        if (charImg) {
          ctx.drawImage(charImg, 0, 42 - bounce);
        }
        break;
      }

      case 'until_end': {
        // Text: 'UNTIL THE END'
        const textImg = this.sprites.get('text_until');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        }

        // Two cats continuing choreography
        const step = Math.floor(beat) % 2;
        const charKey = step === 0 ? 'char_until_1' : 'char_until_2';
        const charImg = this.sprites.get(charKey);
        const bounce = Math.round(Math.abs(Math.sin(beat * Math.PI)) * 3);

        if (charImg) {
          ctx.drawImage(charImg, 0, 42 - bounce);
        }
        break;
      }

      case 'give_heart': {
        // Text: 'I GIVE MY HEART'
        const textImg = this.sprites.get('text_give');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        }

        // Cat heart pose
        const step = Math.floor(beat) % 2;
        const charKey = step === 0 ? 'char_give_1' : 'char_give_2';
        const charImg = this.sprites.get(charKey);
        const bounce = Math.round(Math.sin(beat * Math.PI) * 2);

        if (charImg) {
          ctx.drawImage(charImg, 0, 42 + bounce);
        }
        break;
      }

      case 'soul_to_you': {
        // Text: 'AND MY SOUL TO YOU'
        const textImg = this.sprites.get('text_soul');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        }

        // Cat tongue out winking
        const step = Math.floor(beat) % 2;
        const charKey = step === 0 ? 'char_soul_1' : 'char_soul_2';
        const charImg = this.sprites.get(charKey);
        const sway = Math.round(Math.sin(beat * Math.PI) * 3);

        if (charImg) {
          ctx.drawImage(charImg, sway, 42);
        }
        break;
      }

      case 'knife_true': {
        // Text: "TO MAKE YOU SEE IT'S TRUE"
        const textImg = this.sprites.get('text_knife');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        }

        // Cat with knife swaying smoothly left and right
        const swayStep = Math.floor(beat) % 2;
        const charKey = swayStep === 0 ? 'char_knife_1' : 'char_knife_2';
        const charImg = this.sprites.get(charKey);
        const swayX = Math.round(Math.sin(beat * Math.PI) * 4);
        const bounceY = Math.round(Math.abs(Math.sin(beat * Math.PI)) * 2);

        if (charImg) {
          ctx.drawImage(charImg, swayX, 45 - bounceY);
        }
        break;
      }

      case 'confused': {
        // Text: "I'M SO CONFUSED,"
        const textImg = this.sprites.get('text_confused');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        }

        // Cat looking down, steam/sweat lines
        const step = Math.floor(time * 4) % 2;
        const charKey = step === 0 ? 'char_confused_1' : 'char_confused_2';
        const charImg = this.sprites.get(charKey);

        if (charImg) {
          ctx.drawImage(charImg, 0, 42);
        }
        break;
      }

      case 'cant_you_see': {
        // Text: "BABY CAN'T YOU SEE?"
        const textImg = this.sprites.get('text_deadpan');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        }

        // Deadpan face blinking
        const isBlink = Math.floor(time * 3) % 4 === 0;
        const charKey = isBlink ? 'char_deadpan_2' : 'char_deadpan_1';
        const charImg = this.sprites.get(charKey);

        if (charImg) {
          ctx.drawImage(charImg, 0, 42);
        }
        break;
      }

      case 'rescue_me': {
        // Text: 'PLEASE COME RESCUE ME'
        const textImg = this.sprites.get('text_rescue');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        }

        // Paws over ledge, pleading crying face, shivering
        const shiverX = (Math.random() - 0.5) * 1.5;
        const shiverY = Math.sin(time * 16) * 1.5;
        const tearStep = Math.floor(time * 6) % 2;
        const charKey = tearStep === 0 ? 'char_rescue_1' : 'char_rescue_2';
        const charImg = this.sprites.get(charKey);

        if (charImg) {
          ctx.drawImage(charImg, Math.round(shiverX), 60 + Math.round(shiverY));
        }
        break;
      }

      case 'sweet_little': {
        // Text: "SWEET LITTLE BUMBLEBEE"
        const textImg = this.sprites.get('text_sweet');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        }

        // Giant cat close-up singing chorus
        const mouthOpen = Math.floor(beat * 2) % 2 === 0;
        const charKey = mouthOpen ? 'char_sweet_2' : 'char_sweet_1';
        const charImg = this.sprites.get(charKey);
        const headBob = Math.round(Math.abs(Math.sin(beat * Math.PI)) * 2);

        if (charImg) {
          ctx.drawImage(charImg, 0, 38 - headBob);
        }
        break;
      }

      case 'know_what': {
        // Text: "I KNOW WHAT YOU"
        const textImg = this.sprites.get('text_know_what');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        } else {
          this.typography.drawText(ctx, 'I KNOW WHAT YOU', 128, 18, { scale: 2, centered: true });
        }

        // Giant cat close-up singing
        const mouthOpen = Math.floor(beat * 2) % 2 === 0;
        const charKey = mouthOpen ? 'char_sweet_2' : 'char_sweet_1';
        const charImg = this.sprites.get(charKey);
        const headBob = Math.round(Math.abs(Math.sin(beat * Math.PI)) * 2);

        if (charImg) {
          ctx.drawImage(charImg, 0, 38 - headBob);
        }
        break;
      }

      case 'want_from_me': {
        // Text: "WANT FROM ME"
        const textImg = this.sprites.get('text_want_from_me');
        if (textImg) {
          ctx.drawImage(textImg, 0, 6);
        } else {
          this.typography.drawText(ctx, 'WANT FROM ME', 128, 18, { scale: 2, centered: true });
        }

        // Final held ending posture
        const charImg = this.sprites.get('char_singing_cat_21') || this.sprites.get('char_sweet_1');
        if (charImg) {
          ctx.drawImage(charImg, 0, 38);
        }
        break;
      }

      default:
        break;
    }
  }

  renderPixelGrid(ctx) {
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 20, 60, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 2) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 2) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(this.width, y + 0.5);
      ctx.stroke();
    }
    ctx.restore();
  }
}
