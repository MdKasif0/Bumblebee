/**
 * typography.js - Pure JavaScript bitmap/pixel font engine.
 * Renders 100% procedural pixel fonts onto the 128x64 coordinate canvas.
 * Zero external font dependencies required on the canvas.
 */

// 5x7 Standard Monospace Matrix Glyphs
const FONT_5X7 = {
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
    '11111',
    '00100',
    '00100',
    '00100',
    '00100',
    '00100',
    '11111'
  ],
  'J': [
    '00001',
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
    '11000',
    '10100',
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
    '10001',
    '11011',
    '10101',
    '10101',
    '10001',
    '10001',
    '10001'
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
    '10001',
    '10001',
    '10001',
    '10101',
    '10101',
    '11011',
    '10001'
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
  ' ': [
    '00000',
    '00000',
    '00000',
    '00000',
    '00000',
    '00000',
    '00000'
  ],
  "'": [
    '00100',
    '00100',
    '01000',
    '00000',
    '00000',
    '00000',
    '00000'
  ],
  ',': [
    '00000',
    '00000',
    '00000',
    '00000',
    '00110',
    '00100',
    '01000'
  ],
  '.': [
    '00000',
    '00000',
    '00000',
    '00000',
    '00000',
    '01100',
    '01100'
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
    '00100',
    '00100',
    '00100',
    '00100',
    '00100',
    '00000',
    '00100'
  ],
  '-': [
    '00000',
    '00000',
    '00000',
    '01110',
    '00000',
    '00000',
    '00000'
  ]
};

// Custom Heavy Block Glyphs (for BOOM, ZOOM, and prominent vocal hits)
const FONT_HEAVY_BLOCK = {
  'B': [
    '111110',
    '110011',
    '110011',
    '111110',
    '110011',
    '110011',
    '111110'
  ],
  'O': [
    '011110',
    '110011',
    '110011',
    '110011',
    '110011',
    '110011',
    '011110'
  ],
  'M': [
    '1100011',
    '1110111',
    '1111111',
    '1101011',
    '1100011',
    '1100011',
    '1100011'
  ],
  'Z': [
    '111111',
    '000011',
    '000110',
    '001100',
    '011000',
    '110000',
    '111111'
  ],
  'I': [
    '1111',
    '0110',
    '0110',
    '0110',
    '0110',
    '0110',
    '1111'
  ],
  'G': [
    '011111',
    '110000',
    '110000',
    '110111',
    '110011',
    '110011',
    '011110'
  ],
  'Y': [
    '110011',
    '110011',
    '011110',
    '001100',
    '001100',
    '001100',
    '001100'
  ],
  'U': [
    '110011',
    '110011',
    '110011',
    '110011',
    '110011',
    '110011',
    '011110'
  ]
};

export class PixelTypography {
  constructor() {
    this.charSpacing = 1;
    this.lineSpacing = 2;
  }

  /**
   * Measures the bounding box of text at a given scale.
   */
  measureText(text, scale = 1, isHeavy = false) {
    const lines = text.toUpperCase().split('\n');
    let maxWidth = 0;
    const font = isHeavy ? FONT_HEAVY_BLOCK : FONT_5X7;

    for (const line of lines) {
      let lineWidth = 0;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const glyph = (isHeavy && FONT_HEAVY_BLOCK[char]) || FONT_5X7[char] || FONT_5X7[' '];
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

    const totalHeight = (lines.length * 7 * scale) + (Math.max(0, lines.length - 1) * this.lineSpacing * scale);
    return { width: maxWidth, height: totalHeight };
  }

  /**
   * Renders bitmap text directly onto the given Canvas 2D context.
   */
  drawText(ctx, text, x, y, options = {}) {
    if (!text || text.trim() === '') return;

    const scale = options.scale || 1;
    const align = options.align || 'left';
    const color = options.color || '#0f1422';
    const isHeavy = Boolean(options.isHeavy);

    const lines = text.toUpperCase().split('\n');
    ctx.fillStyle = color;

    let curY = Math.round(y);

    for (const line of lines) {
      const lineMeasure = this.measureText(line, scale, isHeavy);
      let curX = Math.round(x);

      if (align === 'center') {
        curX = Math.round(x - lineMeasure.width / 2);
      } else if (align === 'right') {
        curX = Math.round(x - lineMeasure.width);
      }

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const glyph = (isHeavy && FONT_HEAVY_BLOCK[char]) || FONT_5X7[char] || FONT_5X7[' '];
        const glyphWidth = glyph[0].length;
        const glyphHeight = glyph.length;

        for (let r = 0; r < glyphHeight; r++) {
          const rowStr = glyph[r];
          for (let c = 0; c < glyphWidth; c++) {
            if (rowStr[c] === '1') {
              ctx.fillRect(
                curX + Math.round(c * scale),
                curY + Math.round(r * scale),
                Math.ceil(scale),
                Math.ceil(scale)
              );
            }
          }
        }

        curX += Math.round((glyphWidth + this.charSpacing) * scale);
      }

      curY += Math.round((7 + this.lineSpacing) * scale);
    }
  }
}
