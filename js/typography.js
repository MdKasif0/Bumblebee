/**
 * typography.js
 * Hand-drawn pixel typography engine with wobbly baselines, deformed glyphs,
 * and irregular stroke thickness matching the reference LCD display.
 */

// Crude 5x7 / 6x8 bitmap font glyph definitions for uppercase characters
// 1 = dark navy pixel, 0 = background
const GLYPHS = {
  ' ': [
    [0,0,0]
  ],
  'A': [
    [0,1,1,0],
    [1,0,0,1],
    [1,1,1,1],
    [1,0,0,1],
    [1,0,0,1]
  ],
  'B': [
    [1,1,1,0],
    [1,0,0,1],
    [1,1,1,0],
    [1,0,0,1],
    [1,1,1,1]
  ],
  'C': [
    [0,1,1,1],
    [1,0,0,0],
    [1,0,0,0],
    [1,0,0,0],
    [0,1,1,1]
  ],
  'D': [
    [1,1,1,0],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,1,1,0]
  ],
  'E': [
    [1,1,1,1],
    [1,0,0,0],
    [1,1,1,0],
    [1,0,0,0],
    [1,1,1,1]
  ],
  'F': [
    [1,1,1,1],
    [1,0,0,0],
    [1,1,1,0],
    [1,0,0,0],
    [1,0,0,0]
  ],
  'G': [
    [0,1,1,1],
    [1,0,0,0],
    [1,0,1,1],
    [1,0,0,1],
    [0,1,1,1]
  ],
  'H': [
    [1,0,0,1],
    [1,0,0,1],
    [1,1,1,1],
    [1,0,0,1],
    [1,0,0,1]
  ],
  'I': [
    [1,1,1],
    [0,1,0],
    [0,1,0],
    [0,1,0],
    [1,1,1]
  ],
  'J': [
    [0,0,1,1],
    [0,0,0,1],
    [0,0,0,1],
    [1,0,0,1],
    [0,1,1,0]
  ],
  'K': [
    [1,0,0,1],
    [1,0,1,0],
    [1,1,0,0],
    [1,0,1,0],
    [1,0,0,1]
  ],
  'L': [
    [1,0,0,0],
    [1,0,0,0],
    [1,0,0,0],
    [1,0,0,0],
    [1,1,1,1]
  ],
  'M': [
    [1,0,0,0,1],
    [1,1,0,1,1],
    [1,0,1,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1]
  ],
  'N': [
    [1,0,0,1],
    [1,1,0,1],
    [1,0,1,1],
    [1,0,0,1],
    [1,0,0,1]
  ],
  'O': [
    [0,1,1,0],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [0,1,1,0]
  ],
  'P': [
    [1,1,1,0],
    [1,0,0,1],
    [1,1,1,0],
    [1,0,0,0],
    [1,0,0,0]
  ],
  'Q': [
    [0,1,1,0],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,1,0],
    [0,1,0,1]
  ],
  'R': [
    [1,1,1,0],
    [1,0,0,1],
    [1,1,1,0],
    [1,0,1,0],
    [1,0,0,1]
  ],
  'S': [
    [0,1,1,1],
    [1,0,0,0],
    [0,1,1,0],
    [0,0,0,1],
    [1,1,1,0]
  ],
  'T': [
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0]
  ],
  'U': [
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [0,1,1,0]
  ],
  'V': [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,1,0,1,0],
    [0,0,1,0,0]
  ],
  'W': [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,1,0,1,1],
    [1,0,0,0,1]
  ],
  'X': [
    [1,0,0,1],
    [0,1,1,0],
    [0,1,1,0],
    [0,1,1,0],
    [1,0,0,1]
  ],
  'Y': [
    [1,0,0,1],
    [1,0,0,1],
    [0,1,1,0],
    [0,0,1,0],
    [0,0,1,0]
  ],
  'Z': [
    [1,1,1,1],
    [0,0,1,0],
    [0,1,0,0],
    [1,0,0,0],
    [1,1,1,1]
  ],
  "'": [
    [1],
    [1],
    [0]
  ],
  ',': [
    [0],
    [0],
    [0],
    [0],
    [1],
    [1]
  ],
  '!': [
    [1],
    [1],
    [1],
    [0],
    [1]
  ],
  '?': [
    [1,1,0],
    [0,0,1],
    [0,1,0],
    [0,0,0],
    [0,1,0]
  ]
};

export class PixelTypography {
  constructor() {
    this.color = '#141a2e';
  }

  /**
   * Draw hand-drawn wobbly pixel text
   */
  drawText(ctx, text, startX, startY, options = {}) {
    const scale = options.scale || 2;
    const color = options.color || this.color;
    const letterSpacing = options.letterSpacing || 2 * scale;
    const wobble = options.wobble !== undefined ? options.wobble : true;

    ctx.fillStyle = color;
    let cursorX = startX;

    const str = text.toUpperCase();

    // Calculate total width if centered
    if (options.centered) {
      let totalW = 0;
      for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        const g = GLYPHS[ch] || GLYPHS[' '];
        totalW += (g[0].length * scale) + letterSpacing;
      }
      cursorX = startX - Math.floor(totalW / 2);
    }

    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      const glyph = GLYPHS[ch] || GLYPHS[' '];

      // Subtle pseudo-random baseline jitter per character (deterministic by index)
      const baselineJitter = wobble ? ((i * 13) % 3) - 1 : 0;
      const charY = startY + baselineJitter;

      const rows = glyph.length;
      const cols = glyph[0].length;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (glyph[r][c] === 1) {
            ctx.fillRect(cursorX + c * scale, charY + r * scale, scale, scale);
          }
        }
      }

      cursorX += cols * scale + letterSpacing;
    }
  }
}
