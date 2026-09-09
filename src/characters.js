/**
 * characters.js - Component-Based Procedural Cartoon Art Reconstruction.
 * 
 * Recreates all characters, poses, and special graphics from scratch
 * using Canvas 2D procedural paths. Zero video frames or screenshots.
 * 
 * Features:
 * - Independent components: head, ears, eyes (dual-glint chibi & expressions),
 *   nose, mouth, whiskers, body, legs, tail, and special props.
 * - Controlled irregularities: asymmetric eyes, hand-drawn uneven curves,
 *   crude primitive shapes.
 * - 6 distinct constructed poses: POSE_A, POSE_B, POSE_C, POSE_D, POSE_E, POSE_F.
 * - Special graphics: jagged explosion shape, 5-petal flower, kitchen knife,
 *   crying tears, sweat marks, spiral eyes, starry glints, waving paw,
 *   round-eyed nerd, and tomato friend.
 * - Stepped 2-3 frame boil variants for authentic hand-drawn vibration.
 */

export class CharacterRenderer {
  constructor() {
    this.defaultInk = '#0e1524';
  }

  /**
   * Main render dispatch for the current active scene.
   */
  render(ctx, scene, time, inkColor = this.defaultInk, bgColor = '#a6cce6') {
    if (!scene || !scene.characterType) return;
    this.activeBg = bgColor;

    ctx.save();
    ctx.strokeStyle = inkColor;
    ctx.fillStyle = inkColor;
    ctx.lineWidth = 1;
    ctx.lineCap = 'square';
    ctx.lineJoin = 'miter';

    // Stepped frame tick (12-15 fps typical of vintage microcontroller I2C displays)
    const steppedTick = Math.floor(time * 12);
    const boilVariant = steppedTick % 3; // 3-frame hand-drawn boil cycle
    const sceneTime = Math.max(0, time - scene.startTime);
    const duration = scene.endTime - scene.startTime;
    const progress = duration > 0 ? Math.min(1, sceneTime / duration) : 0;

    const { x, y } = scene.characterPosition;
    const scale = scene.characterScale || 1.0;

    switch (scene.characterType) {
      case 'hooded_figure':
        // POSE_A: Pointed hood / wizard bee costume figure
        this.drawPoseA_HoodedFigure(ctx, x, y, scale, boilVariant, steppedTick);
        break;

      case 'cute_cat':
        // Dispatches to POSE_B, POSE_E, or POSE_F based on scene.characterPose
        this.renderCatPose(ctx, x, y, scale, scene.characterPose, scene.movement, boilVariant, steppedTick, progress);
        break;

      case 'walking_cat':
        // POSE_C: Sideways walking cat with body, legs, and tail
        this.drawPoseC_WalkingCat(ctx, x, y, scale, boilVariant, steppedTick, progress);
        break;

      case 'spiky_creature':
        // Exaggerated jagged / explosion energy creature
        this.drawSpikyCreature(ctx, x, y, scale, scene.characterPose, boilVariant, steppedTick);
        break;

      case 'round_eyed_nerd':
        // Giant round-eyed spectacle character
        this.drawRoundEyedNerd(ctx, x, y, scale, scene.characterPose, boilVariant, steppedTick);
        break;

      case 'cat_and_flower':
        // Daisy flower + peeking cat
        this.drawCatAndFlower(ctx, x, y, scale, boilVariant, steppedTick);
        break;

      case 'bouncing_duo':
        // Two cats bouncing side-by-side
        this.drawBouncingDuo(ctx, x, y, scale, boilVariant, steppedTick);
        break;

      case 'tomato_cat_duo':
        // Eggplant/tomato companion + singing cat
        this.drawTomatoCatDuo(ctx, x, y, scale, scene.characterPose, boilVariant, steppedTick);
        break;

      case 'knife_cat':
        // POSE_F: Cat raising kitchen knife
        this.drawPoseF_KnifeCat(ctx, x, y, scale, boilVariant, steppedTick, progress);
        break;

      default:
        // Default to POSE_B Peeking Cat
        this.drawPoseB_PeekingCat(ctx, x, y, scale, 'glossy', boilVariant, steppedTick);
        break;
    }

    ctx.restore();
  }

  // =========================================================================
  // 1. POSE_A: INITIAL / STATIC POSE (Hooded Ghost / Wizard Figure)
  // =========================================================================
  drawPoseA_HoodedFigure(ctx, cx, cy, scale, variant, tick) {
    const bob = (tick % 4 < 2) ? 0 : 1;
    const x = cx;
    const y = cy + bob;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const bg = this.activeBg || '#a6cce6';

    // 1. Top ornament (bell / hat ornament with notch)
    const tipJitter = (variant === 2) ? -0.5 : 0;
    ctx.fillRect(-3, -31 + tipJitter, 6, 5);
    ctx.fillStyle = bg;
    ctx.fillRect(-1, -30 + tipJitter, 2, 2);
    ctx.fillStyle = ctx.strokeStyle;

    // Small connector neck
    ctx.beginPath();
    ctx.moveTo(0, -26 + tipJitter);
    ctx.lineTo(0, -24);
    ctx.stroke();

    // 2. Outer hood / cloak silhouette (organic convex curves flaring to shoulders)
    ctx.beginPath();
    // Left side: from apex, curving out around face, flaring over shoulder, dropping to bottom bezel
    ctx.moveTo(0, -24);
    ctx.quadraticCurveTo(-4, -14, -11, -2);
    ctx.quadraticCurveTo(-17, 7, -22, 16);
    ctx.lineTo(-22, 26);

    // Right side: from apex, curving out around face, flaring over shoulder, dropping to bottom bezel
    ctx.moveTo(0, -24);
    ctx.quadraticCurveTo(4, -14, 11, -2);
    ctx.quadraticCurveTo(17, 7, 22, 16);
    ctx.lineTo(22, 26);
    ctx.stroke();

    // Inner vertical cloak fold lines rising from bottom bezel
    ctx.beginPath();
    ctx.moveTo(-14, 26);
    ctx.lineTo(-14, 14);
    ctx.moveTo(14, 26);
    ctx.lineTo(14, 14);
    ctx.stroke();

    // 3. Rounded Hood Opening (Face cutout framing the eyes)
    ctx.beginPath();
    ctx.moveTo(-8, -9);
    ctx.quadraticCurveTo(0, -10.5, 8, -9);
    ctx.quadraticCurveTo(11, -3, 9, 4);
    ctx.quadraticCurveTo(0, 7.5, -9, 4);
    ctx.quadraticCurveTo(-11, -3, -8, -9);
    ctx.stroke();

    // Collar V-neck lines from chin to star
    ctx.beginPath();
    ctx.moveTo(-3, 6);
    ctx.lineTo(-1, 14);
    ctx.moveTo(3, 6);
    ctx.lineTo(1, 14);
    ctx.stroke();

    // 4. Eyes: large cute expressive ovals with specular glints
    // Left eye
    ctx.beginPath();
    ctx.ellipse(-5.5, -2, 3.5, 3.8, 0, 0, Math.PI * 2);
    ctx.fill();
    // Left eye glint
    ctx.fillStyle = bg;
    ctx.fillRect(-7.5, -3.5, 2, 2);
    ctx.fillStyle = ctx.strokeStyle;

    // Right eye
    ctx.beginPath();
    ctx.ellipse(5.5, -2, 3.5, 3.8, 0, 0, Math.PI * 2);
    ctx.fill();
    // Right eye glint
    ctx.fillStyle = bg;
    ctx.fillRect(3.5, -3.5, 2, 2);
    ctx.fillStyle = ctx.strokeStyle;

    // Subtle mouth tick
    ctx.fillRect(-1.5, 2.5, 3, 1);

    // 5. Chest Star Emblem (bold 5-pointed star)
    this.drawStar(ctx, 0, 18, 4.5, 2.0);
    ctx.fill();

    ctx.restore();
  }

  // =========================================================================
  // 2. POSE_B: CHARACTER APPEARING / RISING FROM BOTTOM (Peeking Cat)
  // =========================================================================
  drawPoseB_PeekingCat(ctx, cx, cy, scale, eyeStyle = 'glossy', variant = 0, tick = 0) {
    const bob = (tick % 4 < 2) ? 0 : 1;
    const x = cx;
    const y = cy + bob;

    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    // 1. Head & Ears Component
    this.drawCatHeadContour(ctx, variant);

    // 2. Eyes Component (Dual-glint anime chibi eyes)
    if (eyeStyle === 'glossy') {
      this.drawGlossyEyes(ctx, -8, 8, 0, variant);
    } else if (eyeStyle === 'wink') {
      this.drawExpressionEyes(ctx, 'wink', variant);
    } else if (eyeStyle === 'smug') {
      this.drawExpressionEyes(ctx, 'smug', variant);
    }

    // 3. Whiskers Component
    this.drawCatWhiskers(ctx, variant);

    // 4. Paws on Bottom Bezel
    this.drawBezelPaws(ctx, -10, 10, 14, variant);

    ctx.restore();
  }

  // =========================================================================
  // 3. POSE_C: SIDEWAYS / LEANING / WALKING POSE (Walking Cat)
  // =========================================================================
  drawPoseC_WalkingCat(ctx, cx, cy, scale, variant, tick, progress) {
    // Discrete stepped walk progression: advances across discrete integer positions
    const walkDistance = 90;
    const startX = 18;
    const stepCount = 14;
    const discreteStep = Math.floor(progress * stepCount);
    const curX = Math.round(startX + (discreteStep / stepCount) * walkDistance);
    const stepFrame = Math.floor(tick / 2) % 4; // 4-frame stepped walk cycle
    const bob = (stepFrame % 2 === 0) ? 0 : 1;
    const y = cy + bob;

    ctx.save();
    ctx.translate(curX, y);
    ctx.scale(scale, scale);

    // Head tilted up & left toward text
    ctx.save();
    ctx.translate(-8, -10);

    // Head contour with elongated snout pointing up-left
    ctx.beginPath();
    ctx.moveTo(0, 4);
    // Dark snout tip
    ctx.lineTo(-6, -4);
    ctx.lineTo(-4, -7);
    // Forehead to ear
    ctx.lineTo(0, -4);
    // Right ear
    ctx.lineTo(4, -10);
    ctx.lineTo(6, -3);
    // Back of head
    ctx.quadraticCurveTo(8, 2, 6, 6);
    ctx.stroke();

    // Fill in dark snout tip
    ctx.beginPath();
    ctx.moveTo(-6, -4);
    ctx.lineTo(-4, -7);
    ctx.lineTo(-3, -4);
    ctx.closePath();
    ctx.fill();

    // Eye: small alert oval with glint
    ctx.beginPath();
    ctx.ellipse(0, -3, 2, 2.5, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = this.activeBg || '#a6cce6';
    ctx.fillRect(-0.5, -4, 1, 1); // white glint cutout
    ctx.fillStyle = ctx.strokeStyle;

    ctx.restore();

    // Cat Body / Torso
    ctx.beginPath();
    ctx.moveTo(-7, -4);
    // Arched back
    ctx.quadraticCurveTo(3, -9, 14, -2);
    // Rump / hindquarters
    ctx.quadraticCurveTo(18, 4, 14, 8);
    // Underbelly
    ctx.lineTo(-2, 7);
    // Chest
    ctx.quadraticCurveTo(-6, 4, -7, -4);
    ctx.stroke();

    // Perked tail curling upward
    ctx.beginPath();
    ctx.moveTo(14, -1);
    ctx.quadraticCurveTo(20, -6, 19, -12);
    ctx.quadraticCurveTo(17, -13, 16, -9);
    ctx.stroke();

    // Stepped Walking Legs (Alternating 4 frames)
    this.drawWalkingLegs(ctx, stepFrame, variant);

    ctx.restore();
  }

  // Stepped walking legs cycle
  drawWalkingLegs(ctx, stepFrame, variant) {
    const legOffset = (variant === 1) ? 0.5 : 0;

    // Front Left Leg & Front Right Leg
    if (stepFrame === 0) {
      // Front leg forward, back leg trailing
      ctx.beginPath();
      ctx.moveTo(-5, 6);
      ctx.lineTo(-8, 14);
      ctx.lineTo(-5, 14);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-2, 6);
      ctx.lineTo(0, 13);
      ctx.stroke();

      // Hind legs
      ctx.beginPath();
      ctx.moveTo(11, 7);
      ctx.lineTo(8, 14);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(14, 7);
      ctx.lineTo(16, 13);
      ctx.stroke();
    } else if (stepFrame === 1) {
      // Passing position
      ctx.beginPath();
      ctx.moveTo(-5, 6);
      ctx.lineTo(-5, 14);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-2, 6);
      ctx.lineTo(-3, 12);
      ctx.stroke();

      // Hind legs
      ctx.beginPath();
      ctx.moveTo(11, 7);
      ctx.lineTo(11, 14);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(14, 7);
      ctx.lineTo(13, 13);
      ctx.stroke();
    } else if (stepFrame === 2) {
      // Opposite stride
      ctx.beginPath();
      ctx.moveTo(-5, 6);
      ctx.lineTo(-2, 14);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-2, 6);
      ctx.lineTo(-6, 13);
      ctx.stroke();

      // Hind legs
      ctx.beginPath();
      ctx.moveTo(11, 7);
      ctx.lineTo(14, 14);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(14, 7);
      ctx.lineTo(9, 13);
      ctx.stroke();
    } else {
      // Return passing position
      ctx.beginPath();
      ctx.moveTo(-4, 6);
      ctx.lineTo(-4, 14);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-1, 6);
      ctx.lineTo(1, 12);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(11, 7);
      ctx.lineTo(11, 14);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(13, 7);
      ctx.lineTo(15, 12);
      ctx.stroke();
    }
  }

  // =========================================================================
  // 4. POSE_D: RESTING / SLEEPING / CROUCHING POSE
  // =========================================================================
  drawPoseD_RestingCat(ctx, cx, cy, scale, variant, tick) {
    const breathe = (tick % 6 < 3) ? 0 : 1;
    ctx.save();
    ctx.translate(cx, cy + breathe);
    ctx.scale(scale, scale);

    // Curled body
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 9, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Tucked head at left
    ctx.beginPath();
    ctx.ellipse(-10, -2, 7, 6, 0.2, 0, Math.PI * 2);
    ctx.stroke();

    // Cat ear
    ctx.beginPath();
    ctx.moveTo(-14, -6);
    ctx.lineTo(-12, -12);
    ctx.lineTo(-7, -7);
    ctx.stroke();

    // Sleeping eye arc `⌒`
    ctx.beginPath();
    ctx.arc(-11, -1, 3, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();

    // Tail curled around body
    ctx.beginPath();
    ctx.arc(8, 4, 8, -Math.PI * 0.4, Math.PI * 0.8);
    ctx.stroke();

    ctx.restore();
  }

  // =========================================================================
  // 5. POSE_E: UNDERNEATH LARGE LYRIC TYPOGRAPHY (BOOM / ZOOM Cat)
  // =========================================================================
  drawPoseE_UnderText(ctx, cx, cy, scale, lookDir = 'center', variant = 0, tick = 0) {
    let joltX = 0;
    let joltY = 0;

    if (lookDir === 'left') {
      joltX = -3;
    } else if (lookDir === 'right') {
      joltX = 3;
    } else if (lookDir === 'shake') {
      joltX = (tick % 2 === 0) ? -1 : 1;
      joltY = (tick % 4 < 2) ? -1 : 0;
    }

    ctx.save();
    ctx.translate(cx + joltX, cy + joltY);
    ctx.scale(scale, scale);

    // Cat is squashed lower down underneath giant text
    this.drawSquashedCatHead(ctx, variant);

    // Wide alert eyes looking left, right, or straight up
    if (lookDir === 'left') {
      this.drawAlertEyes(ctx, -3, variant);
    } else if (lookDir === 'right') {
      this.drawAlertEyes(ctx, 3, variant);
    } else {
      this.drawAlertEyes(ctx, 0, variant);
    }

    // Cheeks & Whiskers
    this.drawCatWhiskers(ctx, variant);

    ctx.restore();
  }

  // =========================================================================
  // 6. POSE_F: EMOTIVE LOWER-SCREEN COMPOSITIONS
  // =========================================================================

  // Scene 20: Knife Cat ("TO MAKE YOU SEE IT'S TRUE")
  drawPoseF_KnifeCat(ctx, cx, cy, scale, variant, tick, progress) {
    // Stepped discrete sway states (-1px, 0px, +1px)
    const swayCycle = Math.floor(tick / 2) % 4;
    const sway = (swayCycle === 0) ? -1 : (swayCycle === 2 ? 1 : 0);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // Head contour
    this.drawCatHeadContour(ctx, variant);

    // Happy closed slit eyes `- -`
    ctx.beginPath();
    ctx.moveTo(-10, 6);
    ctx.lineTo(-6, 6);
    ctx.moveTo(6, 6);
    ctx.lineTo(10, 6);
    ctx.stroke();

    // Cute open/happy 'w' mouth
    ctx.beginPath();
    ctx.moveTo(-4, 9);
    ctx.quadraticCurveTo(-2, 11, 0, 9);
    ctx.quadraticCurveTo(2, 11, 4, 9);
    ctx.stroke();

    // Whiskers
    this.drawCatWhiskers(ctx, variant);

    // Raised kitchen knife held in right paw (viewer's left)
    ctx.save();
    ctx.translate(-14, 8);
    ctx.rotate(-0.2 + (sway * 0.04));

    // Knife handle
    ctx.fillRect(-2, 0, 4, 9);

    // Knife crossguard
    ctx.fillRect(-3.5, 0, 7, 1.5);

    // Large kitchen knife blade (pointed upward and slightly curved)
    ctx.beginPath();
    ctx.moveTo(-2, 0);
    ctx.lineTo(-3, -20);
    // Curved blade spine
    ctx.quadraticCurveTo(-1, -26, 3, -26);
    // Cutting edge curving down
    ctx.quadraticCurveTo(4, -10, 2, 0);
    ctx.closePath();
    ctx.stroke();

    // Shiny glint reflection on blade (3 stepped sparkle variants)
    const glintY = -12 + (variant * 4);
    ctx.beginPath();
    ctx.moveTo(0, glintY - 3);
    ctx.lineTo(0, glintY + 3);
    ctx.moveTo(-2, glintY);
    ctx.lineTo(2, glintY);
    ctx.stroke();

    ctx.restore();

    // Paw holding knife
    ctx.beginPath();
    ctx.ellipse(-14, 8, 3.5, 3, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  // Scene 21: Confused Cat ("I'M SO CONFUSED,")
  drawPoseF_ConfusedCat(ctx, cx, cy, scale, variant, tick) {
    const jitterX = (tick % 2 === 0) ? -0.5 : 0.5;
    ctx.save();
    ctx.translate(cx + jitterX, cy);
    ctx.scale(scale, scale);

    // Squashed / low crouching head
    this.drawSquashedCatHead(ctx, variant);

    // Horizontal slit dashes for eyes
    ctx.beginPath();
    ctx.moveTo(-9, 7);
    ctx.lineTo(-5, 7);
    ctx.moveTo(5, 7);
    ctx.lineTo(9, 7);
    ctx.stroke();

    // Small flat mouth `_`
    ctx.fillRect(-1.5, 10, 3, 1);

    // Stress marks / radiating sweat ticks above head (`\ | /`)
    const sweatTick = (variant === 0) ? -0.5 : (variant === 1 ? 0.5 : 0);
    ctx.beginPath();
    // Left sweat tick
    ctx.moveTo(-4 + sweatTick, -9);
    ctx.lineTo(-6 + sweatTick, -13);
    // Center sweat drop
    ctx.moveTo(0, -11 + sweatTick);
    ctx.lineTo(0, -15 + sweatTick);
    // Right sweat tick
    ctx.moveTo(4 - sweatTick, -9);
    ctx.lineTo(6 - sweatTick, -13);
    ctx.stroke();

    // Whiskers
    this.drawCatWhiskers(ctx, variant);

    ctx.restore();
  }

  // Scene 22: Hypnotic Spiral Eyes Cat ("BABY CAN'T YOU SEE?")
  drawPoseF_HypnoCat(ctx, cx, cy, scale, variant, tick) {
    // Stepped discrete wobble (0px or 1px jump)
    const wobble = (tick % 4 < 2) ? 0 : 1;
    ctx.save();
    ctx.translate(cx, cy + wobble);
    ctx.scale(scale, scale);

    // Head contour
    this.drawCatHeadContour(ctx, variant);

    // Hypnotic concentric rings / spiral eyes in both eyes
    this.drawSpiralEye(ctx, -8, 7, variant, tick);
    this.drawSpiralEye(ctx, 8, 7, variant, tick);

    // Tiny flat mouth `_`
    ctx.fillRect(-2, 11, 4, 1);

    // Whiskers
    this.drawCatWhiskers(ctx, variant);

    // Paws on bezel
    this.drawBezelPaws(ctx, -10, 10, 14, variant);

    ctx.restore();
  }

  // Draw concentric rings / spiral eye with stepped rotation
  drawSpiralEye(ctx, ex, ey, variant, tick) {
    const rot = (tick % 4) * (Math.PI / 2);
    ctx.save();
    ctx.translate(ex, ey);
    ctx.rotate(rot);

    // Outer ring
    ctx.beginPath();
    ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
    ctx.stroke();

    // Inner ring
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.stroke();

    // Center pupil dot
    ctx.fillRect(-0.8, -0.8, 1.6, 1.6);

    ctx.restore();
  }

  // Scene 23: Crying Cat ("PLEASE COME RESCUE ME")
  drawPoseF_CryingCat(ctx, cx, cy, scale, variant, tick) {
    const sobbingJolt = (tick % 4 < 2) ? 0 : 1.5;
    ctx.save();
    ctx.translate(cx, cy + sobbingJolt);
    ctx.scale(scale, scale);

    // Head contour
    this.drawCatHeadContour(ctx, variant);

    // Tightly squeezed crying eyes `> <`
    ctx.beginPath();
    // Left eye `>`
    ctx.moveTo(-10, 4);
    ctx.lineTo(-7, 6.5);
    ctx.lineTo(-10, 9);
    // Right eye `<`
    ctx.moveTo(10, 4);
    ctx.lineTo(7, 6.5);
    ctx.lineTo(10, 9);
    ctx.stroke();

    // Wide open wailing crying mouth (rounded rectangle wail)
    ctx.beginPath();
    ctx.rect(-3.5, 8.5, 7, 7);
    ctx.stroke();

    // Streaming teardrop cascades (3 animated droplet variants)
    const tearCycle = tick % 3;
    ctx.beginPath();
    // Left stream
    ctx.moveTo(-7, 7);
    ctx.lineTo(-8, 15);
    // Right stream
    ctx.moveTo(7, 7);
    ctx.lineTo(8, 15);
    ctx.stroke();

    // Tear splashing droplets falling
    if (tearCycle === 0) {
      ctx.fillRect(-9, 13, 2, 2);
      ctx.fillRect(8, 11, 2, 2);
    } else if (tearCycle === 1) {
      ctx.fillRect(-10, 16, 2, 2);
      ctx.fillRect(9, 14, 2, 2);
    } else {
      ctx.fillRect(-8, 11, 2, 2);
      ctx.fillRect(8, 16, 2, 2);
    }

    // Whiskers
    this.drawCatWhiskers(ctx, variant);

    // Paws resting on bezel
    this.drawBezelPaws(ctx, -9, 9, 14, variant);

    ctx.restore();
  }

  // Scene 24: Close-Up Starry Eyes Cat ("SWEET LITTLE")
  drawPoseF_StarryCloseUpCat(ctx, cx, cy, scale, variant, tick) {
    const breathe = (tick % 4 < 2) ? 0 : 1;
    ctx.save();
    ctx.translate(cx, cy + breathe);
    ctx.scale(scale * 1.15, scale * 1.15); // Close-up magnification

    // Wide close-up head contour
    this.drawCatHeadContour(ctx, variant);

    // Forehead tufts between ears
    ctx.beginPath();
    ctx.moveTo(-4, 0);
    ctx.lineTo(-2, -2);
    ctx.lineTo(0, 1);
    ctx.lineTo(2, -2);
    ctx.lineTo(4, 0);
    ctx.stroke();

    // Cute curved eyebrows above huge eyes
    ctx.beginPath();
    ctx.arc(-8, 1, 5, Math.PI * 1.1, Math.PI * 1.8);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(8, 1, 5, Math.PI * 1.2, Math.PI * 1.9);
    ctx.stroke();

    // Giant starry eyes
    this.drawStarryEyes(ctx, -8, 7, 8, 7, variant);

    // Cute rounded triangle nose
    ctx.beginPath();
    ctx.moveTo(-2, 9);
    ctx.lineTo(2, 9);
    ctx.lineTo(0, 11.5);
    ctx.closePath();
    ctx.stroke();
    ctx.fillRect(-1, 9.5, 2, 1);

    // Whiskers (3 whiskers per cheek in close-up)
    this.drawCatWhiskers(ctx, variant, 3);

    // Paws on bezel
    this.drawBezelPaws(ctx, -10, 10, 14, variant);

    ctx.restore();
  }

  // Scene 25: Joyful Beaming Cat ("I KNOW WHAT YOU")
  drawPoseF_JoyfulCat(ctx, cx, cy, scale, variant, tick) {
    const bounce = (tick % 4 < 2) ? 0 : 2;
    ctx.save();
    ctx.translate(cx, cy + bounce);
    ctx.scale(scale * 1.1, scale * 1.1);

    // Head contour
    this.drawCatHeadContour(ctx, variant);

    // Forehead tufts between ears
    ctx.beginPath();
    ctx.moveTo(-4, 0);
    ctx.lineTo(-2, -2);
    ctx.lineTo(0, 1);
    ctx.lineTo(2, -2);
    ctx.lineTo(4, 0);
    ctx.stroke();

    // Tabby cheek stripes
    ctx.fillRect(-16, 3, 3, 1);
    ctx.fillRect(-17, 6, 4, 1);
    ctx.fillRect(13, 3, 3, 1);
    ctx.fillRect(13, 6, 4, 1);

    // Eyebrows
    ctx.beginPath();
    ctx.arc(-8, 1, 5, Math.PI * 1.1, Math.PI * 1.8);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(8, 1, 5, Math.PI * 1.2, Math.PI * 1.9);
    ctx.stroke();

    // Glossy eyes
    this.drawGlossyEyes(ctx, -8, 8, 0, variant);

    // Cute nose & open happy mouth
    ctx.beginPath();
    ctx.moveTo(-2, 9);
    ctx.lineTo(2, 9);
    ctx.lineTo(0, 11);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 12, 3, 0, Math.PI);
    ctx.stroke();

    // Whiskers
    this.drawCatWhiskers(ctx, variant, 3);

    // Paws on bezel
    this.drawBezelPaws(ctx, -10, 10, 14, variant);

    ctx.restore();
  }

  // Scene 26: Waving Paw Cat ("WANT FROM ME")
  drawPoseF_WavingPawCat(ctx, cx, cy, scale, variant, tick) {
    const bob = (tick % 4 < 2) ? 0 : 1;
    ctx.save();
    ctx.translate(cx, cy + bob);
    ctx.scale(scale * 1.1, scale * 1.1);

    // Head contour
    this.drawCatHeadContour(ctx, variant);

    // Forehead tufts between ears
    ctx.beginPath();
    ctx.moveTo(-4, 0);
    ctx.lineTo(-2, -2);
    ctx.lineTo(0, 1);
    ctx.lineTo(2, -2);
    ctx.lineTo(4, 0);
    ctx.stroke();

    // Tabby cheek stripes
    ctx.fillRect(-16, 3, 3, 1);
    ctx.fillRect(-17, 6, 4, 1);
    ctx.fillRect(13, 3, 3, 1);
    ctx.fillRect(13, 6, 4, 1);

    // Eyebrows
    ctx.beginPath();
    ctx.arc(-8, 1, 5, Math.PI * 1.1, Math.PI * 1.8);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(8, 1, 5, Math.PI * 1.2, Math.PI * 1.9);
    ctx.stroke();

    // Glossy eyes
    this.drawGlossyEyes(ctx, -8, 8, 0, variant);

    // Nose
    ctx.beginPath();
    ctx.moveTo(-2, 9);
    ctx.lineTo(2, 9);
    ctx.lineTo(0, 11);
    ctx.closePath();
    ctx.stroke();

    // Small mouth line
    ctx.beginPath();
    ctx.moveTo(0, 11);
    ctx.lineTo(0, 13);
    ctx.stroke();

    // Left Whiskers
    ctx.beginPath();
    ctx.moveTo(-16, 5); ctx.lineTo(-22, 3);
    ctx.moveTo(-16, 8); ctx.lineTo(-23, 8);
    ctx.moveTo(-16, 11); ctx.lineTo(-21, 13);
    ctx.stroke();

    // Left paw on bezel
    ctx.beginPath();
    ctx.ellipse(-10, 14, 3, 2, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Right Waving Paw beside right cheek (3 stepped wave angles)
    const waveFrame = Math.floor(tick / 2) % 3;
    const waveAngle = (waveFrame === 0) ? -0.15 : (waveFrame === 1 ? 0.05 : 0.25);

    ctx.save();
    ctx.translate(19, 13);
    ctx.rotate(waveAngle);

    // Paw arm stem rising up
    ctx.beginPath();
    ctx.moveTo(-2, 2);
    ctx.lineTo(-2, -6);
    ctx.lineTo(2, -6);
    ctx.lineTo(2, 2);
    ctx.stroke();

    // Paw pad with 3 horizontal claw ticks pointing right
    ctx.beginPath();
    ctx.arc(0, -7, 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillRect(2, -9, 3, 1);
    ctx.fillRect(2, -7, 4, 1);
    ctx.fillRect(2, -5, 3, 1);

    // Motion lines outside waving paw
    ctx.fillRect(7, -8, 3, 1);
    ctx.fillRect(7, -5, 3, 1);
    ctx.restore();

    ctx.restore();
  }

  // =========================================================================
  // 7. SPECIAL GRAPHIC: EXAGGERATED JAGGED / EXPLOSION SHAPE (Scenes 8-11)
  // =========================================================================
  drawSpikyCreature(ctx, cx, cy, scale, pose, variant, tick) {
    let joltX = 0;
    const isLeft = (pose === 'look_left' || pose === 'spiky_look_left');
    const isRight = (pose === 'look_right' || pose === 'spiky_look_right');
    if (isLeft) joltX = -3;
    else if (isRight) joltX = 3;
    else joltX = (tick % 2 === 0) ? -1 : 1;

    ctx.save();
    ctx.translate(cx + joltX, cy);
    ctx.scale(scale, scale);

    // 3 stepped variants of the jagged burst outline
    this.drawJaggedBurstOutline(ctx, variant);

    // Eyes peeking out from underneath the spiky energy burst
    if (isLeft) {
      this.drawAlertEyes(ctx, -2, variant);
    } else if (isRight) {
      this.drawAlertEyes(ctx, 2, variant);
    } else {
      this.drawAlertEyes(ctx, 0, variant);
    }

    ctx.restore();
  }

  // Recreates the exaggerated jagged explosion energy shape observed in scene 8
  drawJaggedBurstOutline(ctx, variant) {
    const varOffset = (variant === 1) ? 1 : (variant === 2 ? -1 : 0);

    // Outer jagged silhouette (solid dark ink fill at outer boundary)
    ctx.beginPath();
    ctx.moveTo(-24, 14);
    ctx.lineTo(-22, 5);
    ctx.lineTo(-18, 8 + varOffset);
    ctx.lineTo(-14, -2 - varOffset);
    ctx.lineTo(-10, 4);
    ctx.lineTo(-5, -12 + varOffset); // High central spike
    ctx.lineTo(0, 0);
    ctx.lineTo(4, -8 - varOffset);
    ctx.lineTo(9, 2);
    ctx.lineTo(14, -14 + varOffset); // Right high spike
    ctx.lineTo(17, 3);
    ctx.lineTo(21, -3 + varOffset);
    ctx.lineTo(24, 14);
    ctx.closePath();
    ctx.stroke();

    // Inner lighter layer / flame folds
    ctx.beginPath();
    ctx.moveTo(-18, 14);
    ctx.lineTo(-14, 7);
    ctx.lineTo(-10, 11 + varOffset);
    ctx.lineTo(-4, 0 - varOffset);
    ctx.lineTo(0, 7);
    ctx.lineTo(6, -2 + varOffset);
    ctx.lineTo(11, 9);
    ctx.lineTo(16, 5 - varOffset);
    ctx.lineTo(18, 14);
    ctx.stroke();
  }

  // =========================================================================
  // 8. SPECIAL GRAPHIC: DAISY FLOWER & PEEKING CAT (Scene 14 "PLAYTOY")
  // =========================================================================
  // Scene 14 "PLAYTOY": Daisy Flower & Peeking Cat
  drawCatAndFlower(ctx, cx, cy, scale, variant, tick) {
    // Stepped discrete sway states (-1px, 0px, +1px)
    const swayCycle = Math.floor(tick / 2) % 4;
    const sway = (swayCycle === 0) ? -1 : (swayCycle === 2 ? 1 : 0);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // 1. Peeking cat behind flower (left side)
    ctx.save();
    ctx.translate(-14, 2);
    this.drawSquashedCatHead(ctx, variant);
    this.drawAlertEyes(ctx, 1, variant);
    this.drawCatWhiskers(ctx, variant);
    ctx.restore();

    // 2. Daisy Flower Drawing (right side)
    ctx.save();
    ctx.translate(10, 0);

    // Flower stem
    ctx.beginPath();
    ctx.moveTo(0, 4);
    ctx.quadraticCurveTo(sway * 0.8, 10, 2, 18);
    ctx.stroke();

    // Stem leaf bud
    ctx.beginPath();
    ctx.moveTo(1, 11);
    ctx.quadraticCurveTo(6, 9, 7, 13);
    ctx.quadraticCurveTo(3, 14, 1, 12);
    ctx.stroke();

    // Flower Head: 5 irregular rounded daisy petals radiating from central pistil
    ctx.save();
    ctx.translate(sway, 0);

    // Central circular pistil
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.stroke();

    // 5 petals radiating outward
    for (let p = 0; p < 5; p++) {
      const angle = (p * (Math.PI * 2 / 5)) - (Math.PI / 2);
      const petalDist = 8;
      const px = Math.cos(angle) * petalDist;
      const py = Math.sin(angle) * petalDist;
      const petalRadius = 4 + ((p + variant) % 2 * 0.6);

      ctx.beginPath();
      ctx.arc(px, py, petalRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
    ctx.restore();

    ctx.restore();
  }

  // =========================================================================
  // 9. SPECIAL CHARACTERS: ROUND-EYED NERD / FROG (Scenes 12-13)
  // =========================================================================
  drawRoundEyedNerd(ctx, cx, cy, scale, pose, variant, tick) {
    const pop = (pose === 'playboy_hit') ? ((tick % 2 === 0) ? -2 : 0) : 0;
    ctx.save();
    ctx.translate(cx, cy + pop);
    ctx.scale(scale, scale);

    // Two huge round spectacle / eyes connected by center bridge
    // Left eye ring
    ctx.beginPath();
    ctx.arc(-8, -1, 7.5, 0, Math.PI * 2);
    ctx.stroke();

    // Right eye ring
    ctx.beginPath();
    ctx.arc(8, -1, 7.5, 0, Math.PI * 2);
    ctx.stroke();

    // Connecting nose bridge
    ctx.fillRect(-1.5, -2, 3, 1.5);

    // Small centered pupil dots
    ctx.fillRect(-9, -2, 2, 2);
    ctx.fillRect(7, -2, 2, 2);

    // Pointed chin / snout underneath
    ctx.beginPath();
    ctx.moveTo(-8, 5);
    ctx.lineTo(0, 11);
    ctx.lineTo(8, 5);
    ctx.stroke();

    // Small 'o' mouth
    ctx.beginPath();
    ctx.arc(0, 7, 1.5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  // =========================================================================
  // 10. SPECIAL CHARACTERS: BOUNCING CAT DUO (Scene 15)
  // =========================================================================
  drawBouncingDuo(ctx, cx, cy, scale, variant, tick) {
    // Stepped alternating bounce
    const hopFrame = Math.floor(tick / 2) % 4;
    const cat1Bounce = (hopFrame === 0 || hopFrame === 1) ? -3 : 0;
    const cat2Bounce = (hopFrame === 2 || hopFrame === 3) ? -3 : 0;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // Left Cat
    ctx.save();
    ctx.translate(-22, cat1Bounce);
    this.drawSquashedCatHead(ctx, variant);
    this.drawAlertEyes(ctx, 0, variant);
    this.drawCatWhiskers(ctx, variant);
    ctx.beginPath();
    ctx.arc(0, 8, 2, 0, Math.PI);
    ctx.stroke();
    ctx.restore();

    // Right Cat (hands together in front of chest)
    ctx.save();
    ctx.translate(22, cat2Bounce);
    this.drawSquashedCatHead(ctx, variant);
    this.drawAlertEyes(ctx, 0, variant);
    this.drawCatWhiskers(ctx, variant);
    // Hands together
    ctx.beginPath();
    ctx.arc(-2, 10, 2.5, 0, Math.PI * 2);
    ctx.arc(2, 10, 2.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  // =========================================================================
  // 11. SPECIAL CHARACTERS: TOMATO FRIEND & SINGING CAT DUO (Scenes 16-17)
  // =========================================================================
  drawTomatoCatDuo(ctx, cx, cy, scale, pose, variant, tick) {
    const rhythm = (tick % 4 < 2) ? 0 : 1;
    ctx.save();
    ctx.translate(cx, cy + rhythm);
    ctx.scale(scale, scale);

    // Left Character: Eggplant / Tomato creature with stem & leaf crown
    ctx.save();
    ctx.translate(-20, 2);

    // Rounded head
    ctx.beginPath();
    ctx.arc(0, 2, 11, 0, Math.PI * 2);
    ctx.stroke();

    // Calyx / leaf crown on top of head
    ctx.beginPath();
    ctx.moveTo(-8, -6);
    ctx.lineTo(-4, -9);
    ctx.lineTo(0, -6);
    ctx.lineTo(4, -9);
    ctx.lineTo(8, -6);
    ctx.stroke();

    // Stem curling upward
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.quadraticCurveTo(4, -14, 1, -17);
    ctx.stroke();

    // Cute smiling face dots & mouth
    ctx.fillRect(-4, 0, 2, 2);
    ctx.fillRect(2, 0, 2, 2);
    ctx.beginPath();
    ctx.arc(0, 4, 2.5, 0, Math.PI);
    ctx.stroke();

    // Tiny hands on floor
    ctx.beginPath();
    ctx.arc(-8, 9, 2, 0, Math.PI * 2);
    ctx.arc(8, 9, 2, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    // Right Character: Feather-furred / singing cat with open mouth
    ctx.save();
    ctx.translate(20, 2);

    // Feather-furred head contour
    ctx.beginPath();
    ctx.moveTo(-12, 10);
    ctx.lineTo(-14, 2);
    ctx.lineTo(-10, 4);
    ctx.lineTo(-12, -4); // Left ear
    ctx.lineTo(-4, 1);
    ctx.lineTo(4, 1);
    ctx.lineTo(10, -4); // Right ear
    ctx.lineTo(8, 4);
    ctx.lineTo(12, 2);
    ctx.lineTo(10, 10);
    ctx.stroke();

    // Singing eyes (slanted alert slits)
    ctx.fillRect(-5, 0, 2, 2);
    ctx.fillRect(4, 0, 2, 2);

    // Wide open singing mouth (`v` or `o`)
    ctx.beginPath();
    ctx.moveTo(-3, 3);
    ctx.lineTo(0, 7);
    ctx.lineTo(3, 3);
    ctx.closePath();
    ctx.stroke();

    // Whiskers
    ctx.beginPath();
    ctx.moveTo(-10, 3);
    ctx.lineTo(-16, 2);
    ctx.moveTo(10, 3);
    ctx.lineTo(16, 2);
    ctx.stroke();

    ctx.restore();

    ctx.restore();
  }

  // =========================================================================
  // CAT POSE DISPATCHER HELPER
  // =========================================================================
  renderCatPose(ctx, cx, cy, scale, pose, movement, variant, tick, progress) {
    if (pose === 'peek_glossy' || pose === 'peek_small') {
      this.drawPoseB_PeekingCat(ctx, cx, cy, scale, 'glossy', variant, tick);
    } else if (pose === 'look_left' || pose === 'peek_look_left') {
      this.drawPoseE_UnderText(ctx, cx, cy, scale, 'left', variant, tick);
    } else if (pose === 'look_right' || pose === 'peek_look_right') {
      this.drawPoseE_UnderText(ctx, cx, cy, scale, 'right', variant, tick);
    } else if (pose === 'alert_shake' || pose === 'peek_shock') {
      this.drawPoseE_UnderText(ctx, cx, cy, scale, 'shake', variant, tick);
    } else if (pose === 'wink' || pose === 'cat_wink') {
      this.drawPoseB_PeekingCat(ctx, cx, cy, scale, 'wink', variant, tick);
    } else if (pose === 'smug' || pose === 'cat_smug') {
      this.drawPoseB_PeekingCat(ctx, cx, cy, scale, 'smug', variant, tick);
    } else if (pose === 'confused_sweat' || pose === 'cat_confused_sweat') {
      this.drawPoseF_ConfusedCat(ctx, cx, cy, scale, variant, tick);
    } else if (pose === 'hypno_spiral' || pose === 'cat_hypnotized') {
      this.drawPoseF_HypnoCat(ctx, cx, cy, scale, variant, tick);
    } else if (pose === 'crying_plead' || pose === 'cat_crying') {
      this.drawPoseF_CryingCat(ctx, cx, cy, scale, variant, tick);
    } else if (pose === 'starry_eyes' || pose === 'cat_sparkle_close') {
      this.drawPoseF_StarryCloseUpCat(ctx, cx, cy, scale, variant, tick);
    } else if (pose === 'joyful_beam' || pose === 'cat_close_up' || pose === 'cat_smile_close') {
      this.drawPoseF_JoyfulCat(ctx, cx, cy, scale, variant, tick);
    } else if (pose === 'paw_wave' || pose === 'cat_paw_wave' || pose === 'cat_wave_close') {
      this.drawPoseF_WavingPawCat(ctx, cx, cy, scale, variant, tick);
    } else {
      this.drawPoseB_PeekingCat(ctx, cx, cy, scale, 'glossy', variant, tick);
    }
  }

  // =========================================================================
  // SHARED COMPONENT PRIMITIVES
  // =========================================================================

  // Cat Head & Ears Contour (Hand-drawn, intentionally imperfect lines)
  drawCatHeadContour(ctx, variant) {
    const varOffset = (variant === 1) ? 0.5 : (variant === 2 ? -0.5 : 0);

    ctx.beginPath();
    // Left ear base
    ctx.moveTo(-16, 14);
    // Left cheek contour
    ctx.quadraticCurveTo(-17 + varOffset, 5, -16, 0);
    // Left ear outer edge
    ctx.lineTo(-18 + varOffset, -10);
    // Left ear rounded tip to inner base
    ctx.quadraticCurveTo(-14, -10, -7, 0);
    // Forehead gentle dip
    ctx.quadraticCurveTo(0, 1 + varOffset, 7, 0);
    // Right ear inner edge to tip
    ctx.lineTo(18 - varOffset, -10);
    // Right ear outer edge
    ctx.quadraticCurveTo(17, 5, 16, 14);
    ctx.stroke();
  }

  // Squashed lower cat head (underneath giant typography)
  drawSquashedCatHead(ctx, variant) {
    const varOffset = (variant === 1) ? 0.5 : 0;
    ctx.beginPath();
    ctx.moveTo(-16, 14);
    ctx.quadraticCurveTo(-17, 9, -15, 4);
    // Left ear
    ctx.lineTo(-16, -2);
    ctx.lineTo(-7, 3);
    // Forehead dip
    ctx.quadraticCurveTo(0, 4 + varOffset, 7, 3);
    // Right ear
    ctx.lineTo(16, -2);
    ctx.lineTo(15, 4);
    ctx.quadraticCurveTo(17, 9, 16, 14);
    ctx.stroke();
  }

  // Iconic Anime Chibi Glossy Eyes (Solid dark fill with TWO white glints!)
  drawGlossyEyes(ctx, leftX, rightX, lookDirX = 0, variant = 0) {
    const y = 8;
    const radius = 4.5;
    const bgPixel = this.activeBg || '#a6cce6'; // Cutout color to make specular highlights

    // Left Eye
    ctx.beginPath();
    ctx.arc(leftX + lookDirX, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Right Eye
    ctx.beginPath();
    ctx.arc(rightX + lookDirX, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Cutout Dual Glints:
    // Glint 1: Larger primary specular glint in upper-left
    // Glint 2: Smaller secondary glint in lower-right
    ctx.fillStyle = bgPixel;

    // Left Eye Glints
    ctx.fillRect(leftX + lookDirX - 2.5, y - 2.5, 2, 2);
    ctx.fillRect(leftX + lookDirX + 1, y + 1, 1, 1);

    // Right Eye Glints
    ctx.fillRect(rightX + lookDirX - 2.5, y - 2.5, 2, 2);
    ctx.fillRect(rightX + lookDirX + 1, y + 1, 1, 1);

    ctx.fillStyle = ctx.strokeStyle;
  }

  // Giant Starry Eyes (Scene 24)
  drawStarryEyes(ctx, leftX, rightX, eyeY = 8, radius = 5, variant = 0) {
    const bgPixel = this.activeBg || '#a6cce6';

    // Left eye filled
    ctx.beginPath();
    ctx.arc(leftX, eyeY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Right eye filled
    ctx.beginPath();
    ctx.arc(rightX, eyeY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Star-shaped glint inside each eye
    ctx.fillStyle = bgPixel;

    this.drawStar(ctx, leftX - 1, eyeY - 1, 2.5, 1.2);
    ctx.fill();
    ctx.fillRect(leftX + 1.5, eyeY + 1.5, 1, 1);

    this.drawStar(ctx, rightX - 1, eyeY - 1, 2.5, 1.2);
    ctx.fill();
    ctx.fillRect(rightX + 1.5, eyeY + 1.5, 1, 1);

    ctx.fillStyle = ctx.strokeStyle;
  }

  // Alert Eyes (Under text / spiky creature)
  drawAlertEyes(ctx, lookDirX = 0, variant = 0) {
    ctx.fillRect(-9 + lookDirX, 5, 2.5, 2.5);
    ctx.fillRect(7 + lookDirX, 5, 2.5, 2.5);
  }

  // Expression Eyes (Wink, Smug)
  drawExpressionEyes(ctx, expression, variant) {
    if (expression === 'wink') {
      // Left eye winking `>`
      ctx.beginPath();
      ctx.moveTo(-10, 6);
      ctx.lineTo(-7, 8.5);
      ctx.lineTo(-10, 11);
      ctx.stroke();

      // Right eye confident slanted
      ctx.beginPath();
      ctx.moveTo(6, 7);
      ctx.lineTo(10, 8.5);
      ctx.lineTo(6, 10);
      ctx.stroke();

      // Cute open tongue smile `:P`
      ctx.beginPath();
      ctx.moveTo(-2, 10);
      ctx.quadraticCurveTo(0, 13, 2, 10);
      ctx.stroke();
      ctx.fillRect(-1, 10, 2, 2.5);
    } else if (expression === 'smug') {
      // Both eyes squinting smugly
      ctx.beginPath();
      ctx.moveTo(-10, 7.5);
      ctx.lineTo(-6, 7.5);
      ctx.moveTo(6, 7.5);
      ctx.lineTo(10, 7.5);
      ctx.stroke();

      // Smug cat smile `:3`
      ctx.beginPath();
      ctx.moveTo(-4, 10);
      ctx.quadraticCurveTo(-2, 12, 0, 10);
      ctx.quadraticCurveTo(2, 12, 4, 10);
      ctx.stroke();
    }
  }

  // Cat Whiskers
  drawCatWhiskers(ctx, variant = 0, count = 2) {
    const varOffset = (variant === 1) ? 0.5 : 0;
    ctx.beginPath();
    // Left side
    ctx.moveTo(-16, 7 + varOffset);
    ctx.lineTo(-24, 5);
    ctx.moveTo(-16, 10 - varOffset);
    ctx.lineTo(-24, 11);
    if (count > 2) {
      ctx.moveTo(-15, 4);
      ctx.lineTo(-22, 1);
    }

    // Right side
    ctx.moveTo(16, 7 + varOffset);
    ctx.lineTo(24, 5);
    ctx.moveTo(16, 10 - varOffset);
    ctx.lineTo(24, 11);
    if (count > 2) {
      ctx.moveTo(15, 4);
      ctx.lineTo(22, 1);
    }
    ctx.stroke();
  }

  // Paws Resting on Bottom Bezel
  drawBezelPaws(ctx, leftX, rightX, pawY = 14, variant = 0) {
    ctx.beginPath();
    ctx.ellipse(leftX, pawY, 3.5, 2.5, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(rightX, pawY, 3.5, 2.5, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 5-Pointed Star Drawing Helper
  drawStar(ctx, cx, cy, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / 5;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < 5; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }
}
