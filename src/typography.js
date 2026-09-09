/**
 * typography.js - Hand-Crafted Procedural Bitmap Glyph Engine.
 * Reconstructs authentic crude LCD typography from scratch with proportional widths,
 * intentional baseline jitter, irregular letter geometry, and oversized block words.
 * Zero external fonts or image assets.
 */

// Hand-crafted LCD Bitmap Font (Proportional widths, 7 pixels high)
// '1' = dark ink pixel, '0' = background pixel
export const LCD_GLYPHS = {
  'A': [
    '01110',
    '10001',
    '10001',
    '11111',
    '10001',
    '10001',
    '10001'
  ],
  'B': [
    '11110',
    '10001',
    '10001',
    '11110',
    '10001',
    '10001',
    '11110'
  ],
  'C': [
    '01111',
    '10000',
    '10000',
    '10000',
    '10000',
    '10000',
    '01111'
  ],
  'D': [
    '11110',
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '11110'
  ],
  'E': [
    '11111',
    '10000',
    '10000',
    '11110',
    '10000',
    '10000',
    '11111'
  ],
  'F': [
    '11111',
    '10000',
    '10000',
    '11110',
    '10000',
    '10000',
    '10000'
  ],
  'G': [
    '01111',
    '10000',
    '10000',
    '10111',
    '10001',
    '10001',
    '01111'
  ],
  'H': [
    '10001',
    '10001',
    '10001',
    '11111',
    '10001',
    '10001',
    '10001'
  ],
  'I': [
    '111',
    '010',
    '010',
    '010',
    '010',
    '010',
    '111'
  ],
  'J': [
    '00011',
    '00001',
    '00001',
    '00001',
    '10001',
    '10001',
    '01110'
  ],
  'K': [
    '10001',
    '10010',
    '10100',
    '11100',
    '10110',
    '10010',
    '10001'
  ],
  'L': [
    '10000',
    '10000',
    '10000',
    '10000',
    '10000',
    '10000',
    '11111'
  ],
  'M': [
    '100001',
    '110011',
    '101101',
    '100001',
    '100001',
    '100001',
    '100001'
  ],
  'N': [
    '10001',
    '11001',
    '10101',
    '10011',
    '10001',
    '10001',
    '10001'
  ],
  'O': [
    '01110',
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '01110'
  ],
  'P': [
    '11110',
    '10001',
    '10001',
    '11110',
    '10000',
    '10000',
    '10000'
  ],
  'Q': [
    '01110',
    '10001',
    '10001',
    '10001',
    '10101',
    '10011',
    '01111'
  ],
  'R': [
    '11110',
    '10001',
    '10001',
    '11110',
    '10100',
    '10010',
    '10001'
  ],
  'S': [
    '01111',
    '10000',
    '10000',
    '01110',
    '00001',
    '00001',
    '11110'
  ],
  'T': [
    '11111',
    '00100',
    '00100',
    '00100',
    '00100',
    '00100',
    '00100'
  ],
  'U': [
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '01110'
  ],
  'V': [
    '10001',
    '10001',
    '10001',
    '10001',
    '10001',
    '01010',
    '00100'
  ],
  'W': [
    '100001',
    '100001',
    '100001',
    '101101',
    '101101',
    '110011',
    '100001'
  ],
  'X': [
    '10001',
    '10001',
    '01010',
    '00100',
    '01010',
    '10001',
    '10001'
  ],
  'Y': [
    '10001',
    '10001',
    '01010',
    '00100',
    '00100',
    '00100',
    '00100'
  ],
  'Z': [
    '11111',
    '00001',
    '00010',
    '00100',
    '01000',
    '10000',
    '11111'
  ],
  '\'': [
    '11',
    '11',
    '10',
    '00',
    '00',
    '00',
    '00'
  ],
  ',': [
    '00',
    '00',
    '00',
    '00',
    '00',
    '11',
    '01',
    '10'
  ],
  '?': [
    '01110',
    '10001',
    '00001',
    '00010',
    '00100',
    '00000',
    '00100'
  ],
  '!': [
    '11',
    '11',
    '11',
    '11',
    '00',
    '11',
    '11'
  ],
  '.': [
    '00',
    '00',
    '00',
    '00',
    '00',
    '11',
    '11'
  ],
  '-': [
    '0000',
    '0000',
    '0000',
    '1111',
    '0000',
    '0000',
    '0000'
  ],
  ' ': [
    '00',
    '00',
    '00',
    '00',
    '00',
    '00',
    '00'
  ]
};

// Oversized Heavy Block Bitmap Font for "BOOM", "ZOOM", "I GO", "YOU GO"
// 10 pixels high, bold chunky contours with cutouts
export const GLYPHS_HEAVY_BLOCK = {
  'B': [
    '11111100',
    '11111110',
    '11000011',
    '11000011',
    '11111110',
    '11111110',
    '11000011',
    '11000011',
    '11111110',
    '11111100'
  ],
  'O': [
    '00111100',
    '01111110',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '01111110',
    '00111100'
  ],
  'M': [
    '1100000011',
    '1110000111',
    '1111001111',
    '1101111011',
    '1100110011',
    '1100000011',
    '1100000011',
    '1100000011',
    '1100000011',
    '1100000011'
  ],
  'Z': [
    '1111111111',
    '1111111111',
    '0000001110',
    '0000011100',
    '0000111000',
    '0001110000',
    '0011100000',
    '0111000000',
    '1111111111',
    '1111111111'
  ],
  'I': [
    '111111',
    '111111',
    '001100',
    '001100',
    '001100',
    '001100',
    '001100',
    '001100',
    '111111',
    '111111'
  ],
  'G': [
    '00111111',
    '01111111',
    '11000000',
    '11000000',
    '11001111',
    '11000011',
    '11000011',
    '11000011',
    '01111111',
    '00111110'
  ],
  'Y': [
    '11000011',
    '11000011',
    '01100110',
    '00111100',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000',
    '00011000'
  ],
  'U': [
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '11000011',
    '01111110',
    '00111100'
  ],
  ' ': [
    '0000',
    '0000',
    '0000',
    '0000',
    '0000',
    '0000',
    '0000',
    '0000',
    '0000',
    '0000'
  ]
};

export class PixelTypography {
  constructor() {
    this.charSpacing = 1;
    this.lineSpacing = 2;
  }

  /**
   * Measures text width & height considering proportional character widths.
   */
  measureText(text, scale = 1, isHeavy = false) {
    if (!text) return { width: 0, height: 0 };
    const lines = text.toUpperCase().split('\n');
    let maxWidth = 0;
    const font = isHeavy ? GLYPHS_HEAVY_BLOCK : LCD_GLYPHS;
    const defaultGlyph = isHeavy ? GLYPHS_HEAVY_BLOCK[' '] : LCD_GLYPHS[' '];
    const defaultHeight = isHeavy ? 10 : 7;

    for (const line of lines) {
      let lineWidth = 0;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const glyph = font[char] || LCD_GLYPHS[char] || defaultGlyph;
        const charWidth = glyph[0].length;
        lineWidth += (charWidth + this.charSpacing) * scale;
      }
      if (line.length > 0) {
        lineWidth -= this.charSpacing * scale;
      }
      if (lineWidth > maxWidth) {
        maxWidth = lineWidth;
      }
    }

    const totalHeight = (lines.length * defaultHeight * scale) +
      (Math.max(0, lines.length - 1) * this.lineSpacing * scale);

    return { width: Math.round(maxWidth), height: Math.round(totalHeight) };
  }

  /**
   * Renders hand-drawn crude LCD bitmap text onto the canvas context.
   * Includes authentic per-character baseline irregularities and stepped vibration.
   */
  drawText(ctx, text, x, y, options = {}) {
    if (!text || text.trim() === '') return;

    const scale = options.scale || 1.0;
    const align = options.align || 'center';
    const color = options.color || '#0e1524';
    const isHeavy = Boolean(options.isHeavy);
    const applyJitter = options.applyJitter !== false;

    const lines = text.toUpperCase().split('\n');
    ctx.fillStyle = color;

    const font = isHeavy ? GLYPHS_HEAVY_BLOCK : LCD_GLYPHS;
    const defaultGlyph = isHeavy ? GLYPHS_HEAVY_BLOCK[' '] : LCD_GLYPHS[' '];
    const defaultHeight = isHeavy ? 10 : 7;

    let curY = Math.round(y);

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const lineMeasure = this.measureText(line, scale, isHeavy);
      let curX = Math.round(x);

      if (align === 'center') {
        curX = Math.round(x - lineMeasure.width / 2);
      } else if (align === 'right') {
        curX = Math.round(x - lineMeasure.width);
      }

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const glyph = font[char] || LCD_GLYPHS[char] || defaultGlyph;
        const glyphWidth = glyph[0].length;
        const glyphHeight = glyph.length;

        // Controlled subtle baseline irregularity (0 or 1 pixel jitter per character)
        let charJitterY = 0;
        if (applyJitter && !isHeavy) {
          const pseudoHash = (char.charCodeAt(0) * 17 + i * 31 + lineIndex * 13) % 5;
          if (pseudoHash === 1) charJitterY = 1;
          else if (pseudoHash === 3) charJitterY = -1;
        }

        const renderY = curY + Math.round(charJitterY * (scale > 1.2 ? 0.5 : 1));

        for (let r = 0; r < glyphHeight; r++) {
          const rowStr = glyph[r];
          for (let c = 0; c < glyphWidth; c++) {
            if (rowStr[c] === '1') {
              ctx.fillRect(
                curX + Math.round(c * scale),
                renderY + Math.round(r * scale),
                Math.ceil(scale),
                Math.ceil(scale)
              );
            }
          }
        }

        curX += Math.round((glyphWidth + this.charSpacing) * scale);
      }

      curY += Math.round((defaultHeight + this.lineSpacing) * scale);
    }
  }
}
