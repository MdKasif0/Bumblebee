/**
 * characters.js - Procedural Character Artwork Renderer.
 * Draws all character archetypes, poses, and animation cycles programmatically
 * onto the logical 128x64 canvas. Zero raster images or screenshots.
 */

export class CharacterRenderer {
  constructor() {
    this.defaultInk = '#0e1422';
  }

  /**
   * Main entry point to render the active character for a scene.
   */
  render(ctx, scene, time, inkColor = this.defaultInk) {
    if (!scene || !scene.characterType) return;

    ctx.save();
    ctx.strokeStyle = inkColor;
    ctx.fillStyle = inkColor;
    ctx.lineWidth = 1;
    ctx.lineCap = 'square';
    ctx.lineJoin = 'miter';

    // Stepped time quantizer for authentic 12-15 fps mechanical OLED feel
    const steppedTick = Math.floor(time * 15);
    const sceneTime = time - scene.startTime;
    const progress = Math.max(0, Math.min(1, sceneTime / (scene.endTime - scene.startTime)));

    const { x, y } = scene.characterPosition;
    const scale = scene.characterScale || 1.0;

    switch (scene.characterType) {
      case 'hooded_figure':
        this.drawHoodedFigure(ctx, x, y, scale, steppedTick);
        break;
      case 'cute_cat':
        this.drawCuteCat(ctx, x, y, scale, scene.characterPose, scene.movement, steppedTick, progress);
        break;
      case 'walking_cat':
        this.drawWalkingCat(ctx, x, y, scale, steppedTick, progress);
        break;
      case 'spiky_creature':
        this.drawSpikyCreature(ctx, x, y, scale, scene.characterPose, steppedTick);
        break;
      case 'round_eyed_nerd':
        this.drawRoundEyedNerd(ctx, x, y, scale, scene.characterPose, steppedTick);
        break;
      case 'cat_and_flower':
        this.drawCatAndFlower(ctx, x, y, scale, steppedTick);
        break;
      case 'bouncing_duo':
        this.drawBouncingDuo(ctx, x, y, scale, steppedTick);
        break;
      case 'tomato_cat_duo':
        this.drawTomatoCatDuo(ctx, x, y, scale, scene.characterPose, steppedTick);
        break;
      case 'knife_cat':
        this.drawKnifeCat(ctx, x, y, scale, steppedTick, progress);
        break;
      default:
        this.drawCuteCat(ctx, x, y, scale, 'peek_glossy', 'bounce_2frame', steppedTick, progress);
        break;
    }

    ctx.restore();
  }

  // --- 1. Scene 1: Hooded Pointed Bee Figure ---
  drawHoodedFigure(ctx, cx, cy, scale, tick) {
    const bob = (tick % 4 < 2) ? 0 : 1;
    const y = cy + bob;

    ctx.save();
    ctx.translate(cx, y);
    ctx.scale(scale, scale);

    // Pointed hood cone
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.lineTo(12, 10);
    ctx.lineTo(-12, 10);
    ctx.closePath();
    ctx.stroke();

    // Head inner face outline
    ctx.beginPath();
    ctx.ellipse(0, -3, 8, 8, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Cross/sparkle eyes
    ctx.fillRect(-4, -4, 2, 2);
    ctx.fillRect(2, -4, 2, 2);
    ctx.fillRect(-5, -3, 4, 1);
    ctx.fillRect(1, -3, 4, 1);

    // Body cloak
    ctx.beginPath();
    ctx.moveTo(-10, 10);
    ctx.lineTo(-14, 24);
    ctx.lineTo(14, 24);
    ctx.lineTo(10, 10);
    ctx.stroke();

    // Chest star emblem
    this.drawStar(ctx, 0, 16, 3, 1.5);
    ctx.fill();

    ctx.restore();
  }

  // --- 2. Cute Peeking Cat with Multiple Expressions ---
  drawCuteCat(ctx, cx, cy, scale, pose, movement, tick, progress) {
    let offsetY = 0;
    let offsetX = 0;

    if (movement === 'bounce_2frame') {
      offsetY = (tick % 4 < 2) ? 0 : 2;
    } else if (movement === 'shake_jolt') {
      offsetX = (tick % 2 === 0) ? -1 : 1;
      offsetY = (tick % 4 < 2) ? -1 : 0;
    } else if (movement === 'snap_left') {
      offsetX = -2;
    } else if (movement === 'snap_right') {
      offsetX = 2;
    } else if (movement === 'paw_wave') {
      offsetY = (tick % 4 < 2) ? 0 : 1;
    }

    const x = cx + offsetX;
    const y = cy + offsetY;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    // Cat Head Outline
    ctx.beginPath();
    // Left ear
    ctx.moveTo(-16, 12);
    ctx.lineTo(-18, -4);
    ctx.lineTo(-7, 2);
    // Forehead
    ctx.quadraticCurveTo(0, 3, 7, 2);
    // Right ear
    ctx.lineTo(18, -4);
    ctx.lineTo(16, 12);
    ctx.stroke();

    // Cheeks & Whiskers
    // Left whiskers
    ctx.beginPath();
    ctx.moveTo(-18, 5);
    ctx.lineTo(-24, 3);
    ctx.moveTo(-18, 9);
    ctx.lineTo(-25, 10);
    // Right whiskers
    ctx.moveTo(18, 5);
    ctx.lineTo(24, 3);
    ctx.moveTo(18, 9);
    ctx.lineTo(25, 10);
    ctx.stroke();

    // Specific Eye & Mouth Expressions
    switch (pose) {
      case 'peek_glossy':
        // Large round shiny anime eyes
        this.drawGlossyEye(ctx, -7, 6, 4);
        this.drawGlossyEye(ctx, 7, 6, 4);
        // Cute cat mouth :3
        ctx.beginPath();
        ctx.moveTo(-3, 11);
        ctx.quadraticCurveTo(-1.5, 13, 0, 11);
        ctx.quadraticCurveTo(1.5, 13, 3, 11);
        ctx.stroke();
        break;

      case 'peek_small':
        // Small dot eyes
        ctx.fillRect(-7, 6, 2, 2);
        ctx.fillRect(7, 6, 2, 2);
        // Small flat mouth
        ctx.fillRect(-2, 10, 4, 1);
        break;

      case 'peek_look_left':
        // Pupils shifted left
        ctx.strokeRect(-9, 4, 5, 5);
        ctx.fillRect(-9, 5, 3, 3);
        ctx.strokeRect(5, 4, 5, 5);
        ctx.fillRect(5, 5, 3, 3);
        break;

      case 'peek_look_right':
        // Pupils shifted right
        ctx.strokeRect(-9, 4, 5, 5);
        ctx.fillRect(-7, 5, 3, 3);
        ctx.strokeRect(5, 4, 5, 5);
        ctx.fillRect(7, 5, 3, 3);
        break;

      case 'peek_shock':
        // Huge alert circles with tiny dot in center
        ctx.beginPath();
        ctx.arc(-7, 6, 5, 0, Math.PI * 2);
        ctx.arc(7, 6, 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillRect(-8, 5, 2, 2);
        ctx.fillRect(6, 5, 2, 2);
        break;

      case 'cat_wink':
        // Left eye winking ^, right eye glossy ●
        ctx.beginPath();
        ctx.moveTo(-10, 7);
        ctx.lineTo(-7, 4);
        ctx.lineTo(-4, 7);
        ctx.stroke();
        this.drawGlossyEye(ctx, 7, 6, 4);
        // Smug grin
        ctx.beginPath();
        ctx.moveTo(-2, 11);
        ctx.quadraticCurveTo(1, 14, 4, 11);
        ctx.stroke();
        break;

      case 'cat_smug':
        // Slanted horizontal smug eyes
        ctx.fillRect(-10, 5, 6, 2);
        ctx.fillRect(4, 5, 6, 2);
        // Smirk mouth
        ctx.beginPath();
        ctx.moveTo(-2, 10);
        ctx.lineTo(2, 12);
        ctx.lineTo(5, 10);
        ctx.stroke();
        break;

      case 'cat_confused_sweat':
        // Tired flat eyes
        ctx.fillRect(-8, 6, 5, 2);
        ctx.fillRect(3, 6, 5, 2);
        ctx.fillRect(-2, 10, 4, 1);
        // Animated sweat bead above forehead
        const sweatDropY = -8 + (tick % 6 < 3 ? 0 : 1);
        ctx.beginPath();
        ctx.arc(0, sweatDropY, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;

      case 'cat_hypnotized':
        // Concentric spiral / dazed circles
        this.drawSpiralEye(ctx, -7, 6, 5);
        this.drawSpiralEye(ctx, 7, 6, 5);
        // Flat dazed mouth
        ctx.fillRect(-3, 11, 6, 1);
        break;

      case 'cat_crying':
        // Closed diagonal crying eyes > <
        ctx.beginPath();
        // Left eye >
        ctx.moveTo(-10, 4);
        ctx.lineTo(-6, 7);
        ctx.lineTo(-10, 10);
        // Right eye <
        ctx.moveTo(10, 4);
        ctx.lineTo(6, 7);
        ctx.lineTo(10, 10);
        ctx.stroke();
        // Open crying mouth
        ctx.strokeRect(-3, 9, 6, 5);
        // Tear drops
        const tearY = 9 + ((tick * 2) % 6);
        ctx.fillRect(-12, tearY, 2, 3);
        ctx.fillRect(10, tearY, 2, 3);
        break;

      case 'cat_sparkle_close':
      case 'cat_smile_close':
      case 'cat_wave_close':
        // Close-up cute head
        this.drawGlossyEye(ctx, -7, 6, 5);
        this.drawGlossyEye(ctx, 7, 6, 5);
        // Heart nose / mouth
        ctx.fillRect(-1, 9, 2, 2);
        ctx.beginPath();
        ctx.moveTo(-3, 11);
        ctx.quadraticCurveTo(0, 13, 3, 11);
        ctx.stroke();

        // Waving paw for Scene 26
        if (pose === 'cat_wave_close') {
          const pawAngle = (tick % 4 < 2) ? -0.2 : 0.2;
          ctx.save();
          ctx.translate(16, 10);
          ctx.rotate(pawAngle);
          ctx.beginPath();
          ctx.ellipse(0, 0, 4, 3, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
        break;

      default:
        this.drawGlossyEye(ctx, -7, 6, 4);
        this.drawGlossyEye(ctx, 7, 6, 4);
        ctx.fillRect(-2, 10, 4, 1);
        break;
    }

    ctx.restore();
  }

  // --- 3. Scene 3: Walking Cat Angled ---
  drawWalkingCat(ctx, cx, cy, scale, tick, progress) {
    const walkPhase = tick % 4;
    const x = cx + Math.sin(progress * Math.PI * 4) * 3;
    const y = cy + (walkPhase % 2 === 0 ? 0 : 1);

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    // Body angled upwards
    ctx.beginPath();
    ctx.moveTo(-14, 18);
    ctx.quadraticCurveTo(-6, 2, 4, -4);
    // Head angled gazing up-left
    ctx.lineTo(8, -12);
    ctx.lineTo(0, -18);
    ctx.lineTo(-4, -10);
    ctx.stroke();

    // Pointed ears
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(4, -24);
    ctx.lineTo(7, -16);
    ctx.stroke();

    // Dark snout/nose gazing up
    ctx.fillRect(-2, -14, 3, 3);
    // Eye gazing up
    ctx.fillRect(2, -10, 3, 3);

    // Front & Back Legs in Stepped Walk Cycle
    ctx.beginPath();
    if (walkPhase < 2) {
      // Step A
      ctx.moveTo(-10, 16);
      ctx.lineTo(-12, 22);
      ctx.moveTo(-4, 14);
      ctx.lineTo(-1, 22);
      ctx.moveTo(6, 6);
      ctx.lineTo(3, 16);
    } else {
      // Step B
      ctx.moveTo(-10, 16);
      ctx.lineTo(-7, 22);
      ctx.moveTo(-4, 14);
      ctx.lineTo(-6, 22);
      ctx.moveTo(6, 6);
      ctx.lineTo(9, 16);
    }
    ctx.stroke();

    ctx.restore();
  }

  // --- 4. Scenes 8-11: Spiky Hair / Fur Creature (YOU GO / ZOOM) ---
  drawSpikyCreature(ctx, cx, cy, scale, pose, tick) {
    let offsetX = 0;
    if (pose === 'spiky_look_left') offsetX = -2;
    if (pose === 'spiky_look_right') offsetX = 2;

    const bob = (tick % 4 < 2) ? 0 : 1;
    const x = cx + offsetX;
    const y = cy + bob;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    // Spiky flame/hair crown
    ctx.beginPath();
    ctx.moveTo(-22, 14);
    ctx.lineTo(-18, 0);
    ctx.lineTo(-14, 6);
    ctx.lineTo(-8, -12);
    ctx.lineTo(-3, 0);
    ctx.lineTo(2, -16);
    ctx.lineTo(7, -2);
    ctx.lineTo(13, -10);
    ctx.lineTo(16, 2);
    ctx.lineTo(22, 14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Round alert eyes peeking under the spikes
    ctx.fillStyle = '#a2c9e2'; // screen background color for eye cutout
    ctx.beginPath();
    ctx.arc(-7, 6, 4, 0, Math.PI * 2);
    ctx.arc(7, 6, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = this.defaultInk;
    ctx.stroke();

    // Pupils direction
    let pupilOff = 0;
    if (pose === 'spiky_look_left') pupilOff = -1;
    if (pose === 'spiky_look_right') pupilOff = 1;

    ctx.fillRect(-8 + pupilOff, 5, 3, 3);
    ctx.fillRect(6 + pupilOff, 5, 3, 3);

    ctx.restore();
  }

  // --- 5. Scenes 12-13: Round Eyed Nerd Character ---
  drawRoundEyedNerd(ctx, cx, cy, scale, pose, tick) {
    const bob = (tick % 4 < 2) ? 0 : 1;
    const y = cy + bob;

    ctx.save();
    ctx.translate(cx, y);
    ctx.scale(scale, scale);

    // Big round spectacle eyes
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(-10, -2, 9, 0, Math.PI * 2);
    ctx.arc(10, -2, 9, 0, Math.PI * 2);
    // Bridge connecting eyes
    ctx.moveTo(-1, -2);
    ctx.lineTo(1, -2);
    ctx.stroke();

    // Centered pupils
    ctx.fillRect(-11, -3, 3, 3);
    ctx.fillRect(9, -3, 3, 3);

    // Mouth / snout below
    ctx.beginPath();
    ctx.arc(0, 9, 3, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  // --- 6. Scene 14: Cat Beside Blooming 5-Petal Flower ---
  drawCatAndFlower(ctx, cx, cy, scale, tick) {
    const sway = (tick % 4 < 2) ? -1 : 1;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // Cat on Left
    ctx.save();
    ctx.translate(-14, 2);
    // Cat ears & head
    ctx.beginPath();
    ctx.moveTo(-10, 10);
    ctx.lineTo(-12, -2);
    ctx.lineTo(-4, 2);
    ctx.lineTo(4, 2);
    ctx.lineTo(12, -2);
    ctx.lineTo(10, 10);
    ctx.stroke();
    // Eyes
    ctx.fillRect(-5, 5, 2, 2);
    ctx.fillRect(3, 5, 2, 2);
    // Whiskers
    ctx.beginPath();
    ctx.moveTo(-10, 6); ctx.lineTo(-14, 6);
    ctx.moveTo(10, 6); ctx.lineTo(14, 6);
    ctx.stroke();
    ctx.restore();

    // 5-Petal Flower on Right
    ctx.save();
    ctx.translate(14 + sway, -6);
    // Stem
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.quadraticCurveTo(-2, 14, 0, 20);
    ctx.stroke();

    // 5 Rounded Petals
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const px = Math.cos(angle) * 7;
      const py = Math.sin(angle) * 7;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Flower Center
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  // --- 7. Scene 15: Two Cats Bouncing Side-by-Side ---
  drawBouncingDuo(ctx, cx, cy, scale, tick) {
    const bob1 = (tick % 4 < 2) ? 0 : 2;
    const bob2 = (tick % 4 >= 2) ? 0 : 2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // Left Cat
    ctx.save();
    ctx.translate(-24, bob1);
    this.drawMiniCatHead(ctx, 0, 0);
    ctx.restore();

    // Right Cat
    ctx.save();
    ctx.translate(24, bob2);
    this.drawMiniCatHead(ctx, 0, 0);
    ctx.restore();

    ctx.restore();
  }

  // --- 8. Scenes 16-17: Tomato Creature & Singing Cat Duo ---
  drawTomatoCatDuo(ctx, cx, cy, scale, pose, tick) {
    const bob = (tick % 4 < 2) ? 0 : 1;

    ctx.save();
    ctx.translate(cx, cy + bob);
    ctx.scale(scale, scale);

    // Left Creature: Strawberry / Tomato-topped
    ctx.save();
    ctx.translate(-20, 0);
    // Head circle
    ctx.beginPath();
    ctx.arc(0, 2, 10, 0, Math.PI * 2);
    ctx.stroke();
    // Leaf crown / stem
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(0, -15);
    ctx.lineTo(3, -14);
    ctx.moveTo(-6, -8); ctx.lineTo(-9, -12); ctx.lineTo(-3, -8);
    ctx.moveTo(6, -8); ctx.lineTo(9, -12); ctx.lineTo(3, -8);
    ctx.stroke();
    // Cheerful face
    ctx.fillRect(-4, 1, 2, 2);
    ctx.fillRect(2, 1, 2, 2);
    ctx.beginPath();
    ctx.arc(0, 4, 2.5, 0, Math.PI);
    ctx.stroke();
    ctx.restore();

    // Right Creature: Singing Cat with raised paw
    ctx.save();
    ctx.translate(20, 0);
    this.drawMiniCatHead(ctx, 0, 0);
    // Singing mouth (open O or V)
    ctx.beginPath();
    ctx.moveTo(-2, 5);
    ctx.lineTo(0, 8);
    ctx.lineTo(2, 5);
    ctx.closePath();
    ctx.stroke();
    // Raised paw
    const pawWave = (tick % 4 < 2) ? 0 : -2;
    ctx.beginPath();
    ctx.moveTo(10, 4);
    ctx.lineTo(15, 0 + pawWave);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  // --- 9. Scene 20: Cat Holding Knife / Dagger ---
  drawKnifeCat(ctx, cx, cy, scale, tick, progress) {
    const sway = Math.sin(progress * Math.PI * 4) * 1.5;

    ctx.save();
    ctx.translate(cx + sway, cy);
    ctx.scale(scale, scale);

    // Cat head
    ctx.beginPath();
    ctx.moveTo(-16, 12);
    ctx.lineTo(-18, -4);
    ctx.lineTo(-7, 2);
    ctx.quadraticCurveTo(0, 3, 7, 2);
    ctx.lineTo(18, -4);
    ctx.lineTo(16, 12);
    ctx.stroke();

    // Innocent smiling face
    ctx.fillRect(-6, 5, 3, 3);
    ctx.fillRect(3, 5, 3, 3);
    ctx.beginPath();
    ctx.moveTo(-2, 10);
    ctx.quadraticCurveTo(0, 12, 2, 10);
    ctx.stroke();

    // Raised Paw holding Dagger
    const knifeBob = (tick % 4 < 2) ? 0 : -1;
    ctx.save();
    ctx.translate(-16, knifeBob);

    // Paw
    ctx.beginPath();
    ctx.arc(-2, 2, 3, 0, Math.PI * 2);
    ctx.stroke();

    // Curved Dagger Blade
    ctx.beginPath();
    ctx.moveTo(-2, 0);
    ctx.lineTo(-6, -20);
    ctx.quadraticCurveTo(-1, -12, 2, -2);
    ctx.closePath();
    ctx.stroke();

    // Dagger Handle / Hilt
    ctx.fillRect(-5, 0, 6, 2);
    ctx.fillRect(-3, 2, 2, 4);
    ctx.restore();

    ctx.restore();
  }

  // --- Helper Primitives ---
  drawMiniCatHead(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x - 12, y + 8);
    ctx.lineTo(x - 14, y - 2);
    ctx.lineTo(x - 5, y + 2);
    ctx.lineTo(x + 5, y + 2);
    ctx.lineTo(x + 14, y - 2);
    ctx.lineTo(x + 12, y + 8);
    ctx.stroke();

    // Whiskers
    ctx.beginPath();
    ctx.moveTo(x - 12, y + 4); ctx.lineTo(x - 16, y + 4);
    ctx.moveTo(x + 12, y + 4); ctx.lineTo(x + 16, y + 4);
    ctx.stroke();

    // Cute face
    ctx.fillRect(x - 5, y + 3, 2, 2);
    ctx.fillRect(x + 3, y + 3, 2, 2);
    ctx.fillRect(x - 1, y + 6, 2, 1);
  }

  drawGlossyEye(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // White gloss highlight dot
    ctx.fillStyle = '#a2c9e2';
    ctx.fillRect(x - r + 1.5, y - r + 1.5, 1.5, 1.5);
    ctx.fillStyle = this.defaultInk;
  }

  drawSpiralEye(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.arc(x, y, r * 0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillRect(x - 1, y - 1, 2, 2);
  }

  drawStar(ctx, cx, cy, rOuter, rInner) {
    const points = 5;
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const r = (i % 2 === 0) ? rOuter : rInner;
      const a = (i * Math.PI) / points - Math.PI / 2;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }
}
