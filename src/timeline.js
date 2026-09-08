/**
 * timeline.js - Comprehensive 26-scene timeline dataset.
 * Built from frame-by-frame analysis of reference video (30 FPS, 31.87s).
 * Logical canvas coordinates: 128 wide × 64 high.
 */

export const TIMELINE = [
  {
    id: 1,
    name: 'Intro Hooded Figure',
    startFrame: 0,
    endFrame: 20,
    startTime: 0.000,
    endTime: 0.667,
    lyric: '',
    textPosition: { x: 64, y: 14, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'hooded_figure',
    characterPose: 'intro_idle',
    characterPosition: { x: 64, y: 38 },
    characterScale: 1.0,
    movement: 'subtle_breathe',
    transition: 'cut'
  },
  {
    id: 2,
    name: 'My Heart Skips A Beat',
    startFrame: 20,
    endFrame: 60,
    startTime: 0.667,
    endTime: 2.000,
    lyric: 'MY HEART SKIPS\nA BEAT',
    textPosition: { x: 64, y: 12, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'cute_cat',
    characterPose: 'peek_glossy',
    characterPosition: { x: 64, y: 48 },
    characterScale: 1.0,
    movement: 'bounce_2frame',
    transition: 'cut'
  },
  {
    id: 3,
    name: 'When You Walk In The Room',
    startFrame: 60,
    endFrame: 111,
    startTime: 2.000,
    endTime: 3.700,
    lyric: 'WHEN YOU WALK IN THE\nROOM',
    textPosition: { x: 64, y: 11, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'walking_cat',
    characterPose: 'walk_angled',
    characterPosition: { x: 58, y: 42 },
    characterScale: 1.0,
    movement: 'walk_cycle',
    transition: 'cut'
  },
  {
    id: 4,
    name: 'I Go',
    startFrame: 111,
    endFrame: 129,
    startTime: 3.700,
    endTime: 4.300,
    lyric: 'I GO',
    textPosition: { x: 64, y: 15, align: 'center' },
    textSize: 'large',
    textScale: 1.8,
    characterType: 'cute_cat',
    characterPose: 'peek_small',
    characterPosition: { x: 64, y: 50 },
    characterScale: 0.9,
    movement: 'rise_slight',
    transition: 'cut'
  },
  {
    id: 5,
    name: 'Boom (Left)',
    startFrame: 129,
    endFrame: 137,
    startTime: 4.300,
    endTime: 4.567,
    lyric: 'BOOM',
    textPosition: { x: 30, y: 18, align: 'center' },
    textSize: 'giant',
    textScale: 2.4,
    characterType: 'cute_cat',
    characterPose: 'peek_look_left',
    characterPosition: { x: 64, y: 50 },
    characterScale: 0.9,
    movement: 'snap_left',
    transition: 'cut'
  },
  {
    id: 6,
    name: 'Boom (Right)',
    startFrame: 137,
    endFrame: 150,
    startTime: 4.567,
    endTime: 5.000,
    lyric: 'BOOM',
    textPosition: { x: 98, y: 18, align: 'center' },
    textSize: 'giant',
    textScale: 2.4,
    characterType: 'cute_cat',
    characterPose: 'peek_look_right',
    characterPosition: { x: 64, y: 50 },
    characterScale: 0.9,
    movement: 'snap_right',
    transition: 'cut'
  },
  {
    id: 7,
    name: 'Boom (Giant Center)',
    startFrame: 150,
    endFrame: 168,
    startTime: 5.000,
    endTime: 5.600,
    lyric: 'BOOM',
    textPosition: { x: 64, y: 18, align: 'center' },
    textSize: 'giant',
    textScale: 2.8,
    characterType: 'cute_cat',
    characterPose: 'peek_shock',
    characterPosition: { x: 64, y: 50 },
    characterScale: 1.0,
    movement: 'shake_jolt',
    transition: 'cut'
  },
  {
    id: 8,
    name: 'You Go',
    startFrame: 168,
    endFrame: 179,
    startTime: 5.600,
    endTime: 5.967,
    lyric: 'YOU GO',
    textPosition: { x: 64, y: 14, align: 'center' },
    textSize: 'large',
    textScale: 1.8,
    characterType: 'spiky_creature',
    characterPose: 'spiky_idle',
    characterPosition: { x: 64, y: 52 },
    characterScale: 1.0,
    movement: 'rise_jolt',
    transition: 'cut'
  },
  {
    id: 9,
    name: 'Zoom (Left)',
    startFrame: 179,
    endFrame: 195,
    startTime: 5.967,
    endTime: 6.500,
    lyric: 'ZOOM',
    textPosition: { x: 30, y: 18, align: 'center' },
    textSize: 'giant',
    textScale: 2.4,
    characterType: 'spiky_creature',
    characterPose: 'spiky_look_left',
    characterPosition: { x: 64, y: 52 },
    characterScale: 1.0,
    movement: 'pop_left',
    transition: 'cut'
  },
  {
    id: 10,
    name: 'Zoom (Right)',
    startFrame: 195,
    endFrame: 212,
    startTime: 6.500,
    endTime: 7.067,
    lyric: 'ZOOM',
    textPosition: { x: 98, y: 18, align: 'center' },
    textSize: 'giant',
    textScale: 2.4,
    characterType: 'spiky_creature',
    characterPose: 'spiky_look_right',
    characterPosition: { x: 64, y: 52 },
    characterScale: 1.0,
    movement: 'pop_right',
    transition: 'cut'
  },
  {
    id: 11,
    name: 'Zoom (Giant Center)',
    startFrame: 212,
    endFrame: 226,
    startTime: 7.067,
    endTime: 7.533,
    lyric: 'ZOOM',
    textPosition: { x: 64, y: 18, align: 'center' },
    textSize: 'giant',
    textScale: 2.8,
    characterType: 'spiky_creature',
    characterPose: 'spiky_idle',
    characterPosition: { x: 64, y: 52 },
    characterScale: 1.05,
    movement: 'tremor_shake',
    transition: 'cut'
  },
  {
    id: 12,
    name: "You're My",
    startFrame: 226,
    endFrame: 237,
    startTime: 7.533,
    endTime: 7.900,
    lyric: "YOU'RE MY",
    textPosition: { x: 38, y: 13, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'round_eyed_nerd',
    characterPose: 'nerd_curious',
    characterPosition: { x: 64, y: 48 },
    characterScale: 1.0,
    movement: 'eye_twitch',
    transition: 'cut'
  },
  {
    id: 13,
    name: "You're My Playboy",
    startFrame: 237,
    endFrame: 254,
    startTime: 7.900,
    endTime: 8.467,
    lyric: "YOU'RE MY\nPLAYBOY",
    textPosition: { x: 64, y: 13, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'round_eyed_nerd',
    characterPose: 'nerd_surprised',
    characterPosition: { x: 64, y: 48 },
    characterScale: 1.0,
    movement: 'pop_bounce',
    transition: 'cut'
  },
  {
    id: 14,
    name: 'Playtoy',
    startFrame: 254,
    endFrame: 280,
    startTime: 8.467,
    endTime: 9.333,
    lyric: 'PLAYTOY',
    textPosition: { x: 32, y: 13, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'cat_and_flower',
    characterPose: 'flower_peek',
    characterPosition: { x: 64, y: 46 },
    characterScale: 1.0,
    movement: 'flower_sway',
    transition: 'cut'
  },
  {
    id: 15,
    name: 'Lover, My Friend (Cat Duo)',
    startFrame: 280,
    endFrame: 324,
    startTime: 9.333,
    endTime: 10.800,
    lyric: '',
    textPosition: { x: 64, y: 14, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'bouncing_duo',
    characterPose: 'duo_dance',
    characterPosition: { x: 64, y: 50 },
    characterScale: 1.0,
    movement: 'alternate_bounce',
    transition: 'cut'
  },
  {
    id: 16,
    name: 'I Wanna Be With You',
    startFrame: 324,
    endFrame: 372,
    startTime: 10.800,
    endTime: 12.400,
    lyric: 'I WANNA BE WITH\nYOU',
    textPosition: { x: 64, y: 12, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'tomato_cat_duo',
    characterPose: 'singing_duo',
    characterPosition: { x: 64, y: 48 },
    characterScale: 1.0,
    movement: 'vocal_bobbing',
    transition: 'cut'
  },
  {
    id: 17,
    name: 'Until The End',
    startFrame: 372,
    endFrame: 442,
    startTime: 12.400,
    endTime: 14.733,
    lyric: 'UNTIL THE END',
    textPosition: { x: 64, y: 14, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'tomato_cat_duo',
    characterPose: 'singing_duo_wave',
    characterPosition: { x: 64, y: 48 },
    characterScale: 1.0,
    movement: 'harmonic_groove',
    transition: 'cut'
  },
  {
    id: 18,
    name: 'I Give My Heart',
    startFrame: 442,
    endFrame: 477,
    startTime: 14.733,
    endTime: 15.900,
    lyric: 'I GIVE MY HEART',
    textPosition: { x: 64, y: 14, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'cute_cat',
    characterPose: 'cat_wink',
    characterPosition: { x: 64, y: 48 },
    characterScale: 1.0,
    movement: 'wink_pulse',
    transition: 'cut'
  },
  {
    id: 19,
    name: 'And My Soul To You',
    startFrame: 477,
    endFrame: 538,
    startTime: 15.900,
    endTime: 17.933,
    lyric: 'AND MY SOUL TO YOU',
    textPosition: { x: 64, y: 14, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'cute_cat',
    characterPose: 'cat_smug',
    characterPosition: { x: 64, y: 48 },
    characterScale: 1.0,
    movement: 'smug_sway',
    transition: 'cut'
  },
  {
    id: 20,
    name: "To Make You See It's True",
    startFrame: 538,
    endFrame: 643,
    startTime: 17.933,
    endTime: 21.433,
    lyric: "TO MAKE YOU SEE IT'S\nTRUE",
    textPosition: { x: 64, y: 12, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'knife_cat',
    characterPose: 'cat_knife_up',
    characterPosition: { x: 64, y: 48 },
    characterScale: 1.0,
    movement: 'hypnotic_knife_sway',
    transition: 'cut'
  },
  {
    id: 21,
    name: "I'm So Confused,",
    startFrame: 643,
    endFrame: 683,
    startTime: 21.433,
    endTime: 22.767,
    lyric: "I'M SO CONFUSED,",
    textPosition: { x: 64, y: 14, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'cute_cat',
    characterPose: 'cat_confused_sweat',
    characterPosition: { x: 64, y: 48 },
    characterScale: 1.0,
    movement: 'sweat_flicker',
    transition: 'cut'
  },
  {
    id: 22,
    name: "Baby Can't You See?",
    startFrame: 683,
    endFrame: 745,
    startTime: 22.767,
    endTime: 24.833,
    lyric: "BABY CAN'T YOU SEE?",
    textPosition: { x: 64, y: 14, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'cute_cat',
    characterPose: 'cat_hypnotized',
    characterPosition: { x: 64, y: 48 },
    characterScale: 1.0,
    movement: 'spiral_eye_tick',
    transition: 'cut'
  },
  {
    id: 23,
    name: 'Please Come Rescue Me',
    startFrame: 745,
    endFrame: 856,
    startTime: 24.833,
    endTime: 28.533,
    lyric: 'PLEASE COME RESCUE\nME',
    textPosition: { x: 64, y: 12, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'cute_cat',
    characterPose: 'cat_crying',
    characterPosition: { x: 64, y: 48 },
    characterScale: 1.0,
    movement: 'tear_drop_pulse',
    transition: 'cut'
  },
  {
    id: 24,
    name: 'Sweet Little',
    startFrame: 856,
    endFrame: 905,
    startTime: 28.533,
    endTime: 30.167,
    lyric: 'SWEET LITTLE',
    textPosition: { x: 44, y: 14, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'cute_cat',
    characterPose: 'cat_sparkle_close',
    characterPosition: { x: 64, y: 46 },
    characterScale: 1.25,
    movement: 'sparkle_pupil_pulse',
    transition: 'cut'
  },
  {
    id: 25,
    name: 'I Know What You',
    startFrame: 905,
    endFrame: 928,
    startTime: 30.167,
    endTime: 30.933,
    lyric: 'I KNOW WHAT YOU',
    textPosition: { x: 64, y: 14, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'cute_cat',
    characterPose: 'cat_smile_close',
    characterPosition: { x: 64, y: 46 },
    characterScale: 1.25,
    movement: 'cheerful_bounce',
    transition: 'cut'
  },
  {
    id: 26,
    name: 'Want From Me',
    startFrame: 928,
    endFrame: 956,
    startTime: 30.933,
    endTime: 31.867,
    lyric: 'WANT FROM ME',
    textPosition: { x: 64, y: 14, align: 'center' },
    textSize: 'normal',
    textScale: 1.0,
    characterType: 'cute_cat',
    characterPose: 'cat_wave_close',
    characterPosition: { x: 64, y: 46 },
    characterScale: 1.25,
    movement: 'paw_wave',
    transition: 'cut'
  }
];

/**
 * Returns the active scene object for the specified time in seconds.
 */
export function getSceneAtTime(time) {
  const t = Math.max(0, Math.min(31.867, time));
  for (let i = 0; i < TIMELINE.length; i++) {
    const scene = TIMELINE[i];
    if (t >= scene.startTime && t < scene.endTime) {
      return scene;
    }
  }
  return TIMELINE[TIMELINE.length - 1];
}

/**
 * Returns the 0-indexed index of the active scene.
 */
export function getSceneIndexAtTime(time) {
  const t = Math.max(0, Math.min(31.867, time));
  for (let i = 0; i < TIMELINE.length; i++) {
    const scene = TIMELINE[i];
    if (t >= scene.startTime && t < scene.endTime) {
      return i;
    }
  }
  return TIMELINE.length - 1;
}

/**
 * Returns normalized progress [0, 1] within the current scene.
 */
export function getSceneProgress(time) {
  const scene = getSceneAtTime(time);
  const dur = scene.endTime - scene.startTime;
  if (dur <= 0) return 0;
  return Math.max(0, Math.min(1, (time - scene.startTime) / dur));
}

/**
 * Returns all scenes for UI markers.
 */
export function getAllScenes() {
  return TIMELINE;
}
