/**
 * effects.js - Screen shader effects and OLED dot matrix emulation.
 * Renders authentic display background, pixel grid, subtle bloom, and stepped motion.
 */

export class EffectsRenderer {
  constructor() {
    this.palettes = {
      'oled-blue': {
        bg: '#a2c9e2',
        ink: '#0e1422',
        grid: 'rgba(144, 182, 208, 0.25)',
        bloom: 'rgba(162, 201, 226, 0.15)'
      },
      'oled-white': {
        bg: '#e2e8f0',
        ink: '#0f172a',
        grid: 'rgba(203, 213, 225, 0.3)',
        bloom: 'rgba(226, 232, 240, 0.2)'
      },
      'amber-phosphor': {
        bg: '#ffb833',
        ink: '#2b1600',
        grid: 'rgba(220, 150, 20, 0.3)',
        bloom: 'rgba(255, 184, 51, 0.25)'
      },
      'matrix-green': {
        bg: '#5bf870',
        ink: '#062409',
        grid: 'rgba(60, 190, 80, 0.25)',
        bloom: 'rgba(91, 248, 112, 0.22)'
      },
      'inverted': {
        bg: '#0d121d',
        ink: '#8fd2ff',
        grid: 'rgba(20, 30, 48, 0.6)',
        bloom: 'rgba(143, 210, 255, 0.3)'
      }
    };

    this.currentPalette = 'oled-blue';
    this.enablePixelGrid = true;
    this.enableScanlines = false;
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
   * Clears the logical canvas with the authentic active screen background.
   */
  drawBackground(ctx, width = 128, height = 64) {
    const { bg } = this.getColors();
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // Subtle OLED vertical luminance gradient
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.0)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.04)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }

  /**
   * Draws subpixel dot matrix lines on the logical canvas if desired.
   */
  drawScreenOverlay(ctx, width = 128, height = 64) {
    // Keep logical drawing clean so pixelated CSS scaling renders sharp pixels
    // Edge vignette on OLED panel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    ctx.strokeRect(0.5, 0.5, width - 1, height - 1);
  }
}
