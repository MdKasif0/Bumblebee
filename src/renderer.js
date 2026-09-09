/**
 * renderer.js - Scene Renderer with Logical 128x64 Coordinate System.
 * Renders all artwork and typography at 128x64 logical units and scales
 * cleanly to any responsive viewport size while maintaining the 2:1 aspect ratio.
 */

export class SceneRenderer {
  constructor(displayCanvasId = 'display-canvas') {
    this.canvas = document.getElementById(displayCanvasId);
    this.ctx = this.canvas.getContext('2d');

    // Logical Coordinate System (SSD1306 OLED standard)
    this.LOGICAL_WIDTH = 128;
    this.LOGICAL_HEIGHT = 64;

    // Offscreen logical buffer
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCanvas.width = this.LOGICAL_WIDTH;
    this.offscreenCanvas.height = this.LOGICAL_HEIGHT;
    this.offscreenCtx = this.offscreenCanvas.getContext('2d');

    // Disable antialiasing for crisp pixel art
    this.ctx.imageSmoothingEnabled = false;
    this.offscreenCtx.imageSmoothingEnabled = false;

    this._setupResizeObserver();
  }

  _setupResizeObserver() {
    // Maintain crisp high-DPI integer scaling
    const resize = () => {
      const rect = this.canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const targetWidth = Math.max(256, Math.floor(rect.width * dpr));
      const targetHeight = Math.max(128, Math.floor(rect.height * dpr));

      if (this.canvas.width !== targetWidth || this.canvas.height !== targetHeight) {
        this.canvas.width = targetWidth;
        this.canvas.height = targetHeight;
        this.ctx.imageSmoothingEnabled = false;
      }
    };

    window.addEventListener('resize', resize);
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(resize);
      ro.observe(this.canvas);
    }
    // Initial size
    setTimeout(resize, 50);
  }

  /**
   * Main render pass called by AnimationController on each frame.
   */
  render(scene, time, characters, typography, effects) {
    const octx = this.offscreenCtx;
    const { ink, bg } = effects.getColors();

    // 1. Layer: Background
    effects.drawBackground(octx, this.LOGICAL_WIDTH, this.LOGICAL_HEIGHT);

    // 2. Layer: Character Procedural Artwork
    if (characters && scene) {
      characters.render(octx, scene, time, ink, bg);
    }

    // 3. Layer: Bitmap Typography
    if (typography && scene && scene.lyric) {
      const isHeavy = (scene.textSize === 'giant' || scene.textSize === 'large');
      typography.drawText(
        octx,
        scene.lyric,
        scene.textPosition.x,
        scene.textPosition.y,
        {
          scale: scene.textScale || 1.0,
          align: scene.textPosition.align || 'center',
          color: ink,
          isHeavy,
          time,
          tick: Math.floor(time * 12)
        }
      );
    }

    // 4. Layer: Screen Overlay Effects
    effects.drawScreenOverlay(octx, this.LOGICAL_WIDTH, this.LOGICAL_HEIGHT);

    // 5. Transfer Logical 128x64 Buffer to Presentation Canvas
    this.ctx.drawImage(
      this.offscreenCanvas,
      0, 0, this.LOGICAL_WIDTH, this.LOGICAL_HEIGHT,
      0, 0, this.canvas.width, this.canvas.height
    );
  }
}
