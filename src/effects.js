/**
 * effects.js - LCD Screen Environment & Subtle Monochrome Pixel Effects.
 * 
 * Recreates a clean pale blue LCD display with restrained contrast,
 * subtle dot-matrix pixel character, and dark navy/black linework.
 * Strictly avoids modern gradients or glossy treatments.
 */

export class EffectsRenderer {
  constructor() {
    this.palettes = {
      'oled-blue': {
        name: 'Pale Blue LCD (Reference)',
        bg: '#a6cce6',
        ink: '#0e1524',
        gridDot: 'rgba(140, 178, 206, 0.22)'
      },
      'oled-white': {
        name: 'Crisp White LCD',
        bg: '#dce5ed',
        ink: '#0e1622',
        gridDot: 'rgba(180, 195, 210, 0.25)'
      },
      'amber-phosphor': {
        name: 'Amber Phosphor',
        bg: '#f8b438',
        ink: '#261200',
        gridDot: 'rgba(215, 145, 20, 0.25)'
      },
      'matrix-green': {
        name: 'Matrix Green',
        bg: '#62f476',
        ink: '#042208',
        gridDot: 'rgba(50, 180, 70, 0.22)'
      },
      'inverted': {
        name: 'Dark Inverted',
        bg: '#0e1524',
        ink: '#a6cce6',
        gridDot: 'rgba(25, 38, 58, 0.5)'
      }
    };

    this.currentPalette = 'oled-blue';
  }

  setPalette(name) {
    if (this.palettes[name]) {
      this.currentPalette = name;
      document.body.setAttribute('data-palette', name);
    }
  }

  getColors() {
    return this.palettes[this.currentPalette] || this.palettes['oled-blue'];
  }

  /**
   * Clears the logical canvas with a clean, flat pale blue LCD background.
   * Restrained contrast, zero artificial modern gradients.
   */
  drawBackground(ctx, width = 128, height = 64) {
    const { bg } = this.getColors();
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
  }

  /**
   * Subtle LCD character: minimal subpixel grid dot texture.
   */
  drawScreenOverlay(ctx, width = 128, height = 64) {
    // Subtle outer frame border matching authentic LCD panel active boundaries
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, width - 1, height - 1);
  }
}
