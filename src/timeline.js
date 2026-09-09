/**
 * timeline.js - Comprehensive 26-scene timeline dataset.
 * Built from frame-by-frame analysis of reference video (30 FPS, 31.87s).
 * Logical canvas coordinates: 128 wide × 64 high.
 */

export const timeline = [
  {
    "id": 1,
    "start": 0,
    "end": 0.667,
    "startTime": 0,
    "endTime": 0.667,
    "startFrame": 0,
    "endFrame": 20,
    "scene": "Intro Hooded Figure",
    "name": "Intro Hooded Figure",
    "lyric": "",
    "characterType": "hooded_figure",
    "characterPose": "intro_idle",
    "characterPosition": {
      "x": 64,
      "y": 38
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 14,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "subtle_breathe",
    "movement": "subtle_breathe",
    "transition": "cut"
  },
  {
    "id": 2,
    "start": 0.667,
    "end": 2,
    "startTime": 0.667,
    "endTime": 2,
    "startFrame": 20,
    "endFrame": 60,
    "scene": "My Heart Skips A Beat",
    "name": "My Heart Skips A Beat",
    "lyric": "MY HEART SKIPS\nA BEAT",
    "characterType": "cute_cat",
    "characterPose": "peek_glossy",
    "characterPosition": {
      "x": 64,
      "y": 48
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 12,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "bounce_2frame",
    "movement": "bounce_2frame",
    "transition": "cut"
  },
  {
    "id": 3,
    "start": 2,
    "end": 3.7,
    "startTime": 2,
    "endTime": 3.7,
    "startFrame": 60,
    "endFrame": 111,
    "scene": "When You Walk In The Room",
    "name": "When You Walk In The Room",
    "lyric": "WHEN YOU WALK IN THE\nROOM",
    "characterType": "walking_cat",
    "characterPose": "walk_angled",
    "characterPosition": {
      "x": 58,
      "y": 42
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 7,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "walk_cycle",
    "movement": "walk_cycle",
    "transition": "cut"
  },
  {
    "id": 4,
    "start": 3.7,
    "end": 4.3,
    "startTime": 3.7,
    "endTime": 4.3,
    "startFrame": 111,
    "endFrame": 129,
    "scene": "I Go",
    "name": "I Go",
    "lyric": "I GO",
    "characterType": "cute_cat",
    "characterPose": "peek_small",
    "characterPosition": {
      "x": 64,
      "y": 50
    },
    "characterScale": 0.9,
    "textPosition": {
      "x": 64,
      "y": 15,
      "align": "center"
    },
    "textSize": "large",
    "textScale": 1.8,
    "motion": "rise_slight",
    "movement": "rise_slight",
    "transition": "cut"
  },
  {
    "id": 5,
    "start": 4.3,
    "end": 4.567,
    "startTime": 4.3,
    "endTime": 4.567,
    "startFrame": 129,
    "endFrame": 137,
    "scene": "Boom (Left)",
    "name": "Boom (Left)",
    "lyric": "BOOM",
    "characterType": "cute_cat",
    "characterPose": "peek_look_left",
    "characterPosition": {
      "x": 64,
      "y": 50
    },
    "characterScale": 0.9,
    "textPosition": {
      "x": 10,
      "y": 8,
      "align": "left"
    },
    "textSize": "giant",
    "textScale": 1.6,
    "motion": "snap_left",
    "movement": "snap_left",
    "transition": "cut"
  },
  {
    "id": 6,
    "start": 4.567,
    "end": 5,
    "startTime": 4.567,
    "endTime": 5,
    "startFrame": 137,
    "endFrame": 150,
    "scene": "Boom (Right)",
    "name": "Boom (Right)",
    "lyric": "BOOM",
    "characterType": "cute_cat",
    "characterPose": "peek_look_right",
    "characterPosition": {
      "x": 64,
      "y": 50
    },
    "characterScale": 0.9,
    "textPosition": {
      "x": 118,
      "y": 8,
      "align": "right"
    },
    "textSize": "giant",
    "textScale": 1.6,
    "motion": "snap_right",
    "movement": "snap_right",
    "transition": "cut"
  },
  {
    "id": 7,
    "start": 5,
    "end": 5.6,
    "startTime": 5,
    "endTime": 5.6,
    "startFrame": 150,
    "endFrame": 168,
    "scene": "Boom (Giant Center)",
    "name": "Boom (Giant Center)",
    "lyric": "BOOM",
    "characterType": "cute_cat",
    "characterPose": "peek_shock",
    "characterPosition": {
      "x": 64,
      "y": 50
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 6,
      "align": "center"
    },
    "textSize": "giant",
    "textScale": 2.2,
    "motion": "shake_jolt",
    "movement": "shake_jolt",
    "transition": "cut"
  },
  {
    "id": 8,
    "start": 5.6,
    "end": 5.967,
    "startTime": 5.6,
    "endTime": 5.967,
    "startFrame": 168,
    "endFrame": 179,
    "scene": "You Go",
    "name": "You Go",
    "lyric": "YOU GO",
    "characterType": "spiky_creature",
    "characterPose": "spiky_idle",
    "characterPosition": {
      "x": 64,
      "y": 52
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 8,
      "align": "center"
    },
    "textSize": "large",
    "textScale": 1.6,
    "motion": "rise_jolt",
    "movement": "rise_jolt",
    "transition": "cut"
  },
  {
    "id": 9,
    "start": 5.967,
    "end": 6.5,
    "startTime": 5.967,
    "endTime": 6.5,
    "startFrame": 179,
    "endFrame": 195,
    "scene": "Zoom (Left)",
    "name": "Zoom (Left)",
    "lyric": "ZOOM",
    "characterType": "spiky_creature",
    "characterPose": "spiky_look_left",
    "characterPosition": {
      "x": 64,
      "y": 52
    },
    "characterScale": 1,
    "textPosition": {
      "x": 10,
      "y": 8,
      "align": "left"
    },
    "textSize": "giant",
    "textScale": 1.6,
    "motion": "pop_left",
    "movement": "pop_left",
    "transition": "cut"
  },
  {
    "id": 10,
    "start": 6.5,
    "end": 7.067,
    "startTime": 6.5,
    "endTime": 7.067,
    "startFrame": 195,
    "endFrame": 212,
    "scene": "Zoom (Right)",
    "name": "Zoom (Right)",
    "lyric": "ZOOM",
    "characterType": "spiky_creature",
    "characterPose": "spiky_look_right",
    "characterPosition": {
      "x": 64,
      "y": 52
    },
    "characterScale": 1,
    "textPosition": {
      "x": 118,
      "y": 8,
      "align": "right"
    },
    "textSize": "giant",
    "textScale": 1.6,
    "motion": "pop_right",
    "movement": "pop_right",
    "transition": "cut"
  },
  {
    "id": 11,
    "start": 7.067,
    "end": 7.533,
    "startTime": 7.067,
    "endTime": 7.533,
    "startFrame": 212,
    "endFrame": 226,
    "scene": "Zoom (Giant Center)",
    "name": "Zoom (Giant Center)",
    "lyric": "ZOOM",
    "characterType": "spiky_creature",
    "characterPose": "spiky_idle",
    "characterPosition": {
      "x": 64,
      "y": 52
    },
    "characterScale": 1.05,
    "textPosition": {
      "x": 64,
      "y": 6,
      "align": "center"
    },
    "textSize": "giant",
    "textScale": 2.2,
    "motion": "tremor_shake",
    "movement": "tremor_shake",
    "transition": "cut"
  },
  {
    "id": 12,
    "start": 7.533,
    "end": 7.9,
    "startTime": 7.533,
    "endTime": 7.9,
    "startFrame": 226,
    "endFrame": 237,
    "scene": "You're My",
    "name": "You're My",
    "lyric": "YOU'RE MY",
    "characterType": "round_eyed_nerd",
    "characterPose": "nerd_curious",
    "characterPosition": {
      "x": 64,
      "y": 48
    },
    "characterScale": 1,
    "textPosition": {
      "x": 38,
      "y": 13,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "eye_twitch",
    "movement": "eye_twitch",
    "transition": "cut"
  },
  {
    "id": 13,
    "start": 7.9,
    "end": 8.467,
    "startTime": 7.9,
    "endTime": 8.467,
    "startFrame": 237,
    "endFrame": 254,
    "scene": "You're My Playboy",
    "name": "You're My Playboy",
    "lyric": "YOU'RE MY\nPLAYBOY",
    "characterType": "round_eyed_nerd",
    "characterPose": "nerd_surprised",
    "characterPosition": {
      "x": 64,
      "y": 48
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 13,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "pop_bounce",
    "movement": "pop_bounce",
    "transition": "cut"
  },
  {
    "id": 14,
    "start": 8.467,
    "end": 9.333,
    "startTime": 8.467,
    "endTime": 9.333,
    "startFrame": 254,
    "endFrame": 280,
    "scene": "Playtoy",
    "name": "Playtoy",
    "lyric": "PLAYTOY",
    "characterType": "cat_and_flower",
    "characterPose": "flower_peek",
    "characterPosition": {
      "x": 64,
      "y": 46
    },
    "characterScale": 1,
    "textPosition": {
      "x": 32,
      "y": 13,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "flower_sway",
    "movement": "flower_sway",
    "transition": "cut"
  },
  {
    "id": 15,
    "start": 9.333,
    "end": 10.8,
    "startTime": 9.333,
    "endTime": 10.8,
    "startFrame": 280,
    "endFrame": 324,
    "scene": "Lover, My Friend (Cat Duo)",
    "name": "Lover, My Friend (Cat Duo)",
    "lyric": "",
    "characterType": "bouncing_duo",
    "characterPose": "duo_dance",
    "characterPosition": {
      "x": 64,
      "y": 50
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 14,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "alternate_bounce",
    "movement": "alternate_bounce",
    "transition": "cut"
  },
  {
    "id": 16,
    "start": 10.8,
    "end": 12.4,
    "startTime": 10.8,
    "endTime": 12.4,
    "startFrame": 324,
    "endFrame": 372,
    "scene": "I Wanna Be With You",
    "name": "I Wanna Be With You",
    "lyric": "I WANNA BE WITH\nYOU",
    "characterType": "tomato_cat_duo",
    "characterPose": "singing_duo",
    "characterPosition": {
      "x": 64,
      "y": 48
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 12,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "vocal_bobbing",
    "movement": "vocal_bobbing",
    "transition": "cut"
  },
  {
    "id": 17,
    "start": 12.4,
    "end": 14.733,
    "startTime": 12.4,
    "endTime": 14.733,
    "startFrame": 372,
    "endFrame": 442,
    "scene": "Until The End",
    "name": "Until The End",
    "lyric": "UNTIL THE END",
    "characterType": "tomato_cat_duo",
    "characterPose": "singing_duo_wave",
    "characterPosition": {
      "x": 64,
      "y": 48
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 14,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "harmonic_groove",
    "movement": "harmonic_groove",
    "transition": "cut"
  },
  {
    "id": 18,
    "start": 14.733,
    "end": 15.9,
    "startTime": 14.733,
    "endTime": 15.9,
    "startFrame": 442,
    "endFrame": 477,
    "scene": "I Give My Heart",
    "name": "I Give My Heart",
    "lyric": "I GIVE MY HEART",
    "characterType": "cute_cat",
    "characterPose": "cat_wink",
    "characterPosition": {
      "x": 64,
      "y": 48
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 14,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "wink_pulse",
    "movement": "wink_pulse",
    "transition": "cut"
  },
  {
    "id": 19,
    "start": 15.9,
    "end": 17.933,
    "startTime": 15.9,
    "endTime": 17.933,
    "startFrame": 477,
    "endFrame": 538,
    "scene": "And My Soul To You",
    "name": "And My Soul To You",
    "lyric": "AND MY SOUL TO YOU",
    "characterType": "cute_cat",
    "characterPose": "cat_smug",
    "characterPosition": {
      "x": 64,
      "y": 48
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 14,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "smug_sway",
    "movement": "smug_sway",
    "transition": "cut"
  },
  {
    "id": 20,
    "start": 17.933,
    "end": 21.433,
    "startTime": 17.933,
    "endTime": 21.433,
    "startFrame": 538,
    "endFrame": 643,
    "scene": "To Make You See It's True",
    "name": "To Make You See It's True",
    "lyric": "TO MAKE YOU SEE IT'S\nTRUE",
    "characterType": "knife_cat",
    "characterPose": "cat_knife_up",
    "characterPosition": {
      "x": 64,
      "y": 48
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 12,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "hypnotic_knife_sway",
    "movement": "hypnotic_knife_sway",
    "transition": "cut"
  },
  {
    "id": 21,
    "start": 21.433,
    "end": 22.767,
    "startTime": 21.433,
    "endTime": 22.767,
    "startFrame": 643,
    "endFrame": 683,
    "scene": "I'm So Confused,",
    "name": "I'm So Confused,",
    "lyric": "I'M SO CONFUSED,",
    "characterType": "cute_cat",
    "characterPose": "cat_confused_sweat",
    "characterPosition": {
      "x": 64,
      "y": 48
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 14,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "sweat_flicker",
    "movement": "sweat_flicker",
    "transition": "cut"
  },
  {
    "id": 22,
    "start": 22.767,
    "end": 24.833,
    "startTime": 22.767,
    "endTime": 24.833,
    "startFrame": 683,
    "endFrame": 745,
    "scene": "Baby Can't You See?",
    "name": "Baby Can't You See?",
    "lyric": "BABY CAN'T YOU SEE?",
    "characterType": "cute_cat",
    "characterPose": "cat_hypnotized",
    "characterPosition": {
      "x": 64,
      "y": 48
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 14,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "spiral_eye_tick",
    "movement": "spiral_eye_tick",
    "transition": "cut"
  },
  {
    "id": 23,
    "start": 24.833,
    "end": 28.533,
    "startTime": 24.833,
    "endTime": 28.533,
    "startFrame": 745,
    "endFrame": 856,
    "scene": "Please Come Rescue Me",
    "name": "Please Come Rescue Me",
    "lyric": "PLEASE COME RESCUE\nME",
    "characterType": "cute_cat",
    "characterPose": "cat_crying",
    "characterPosition": {
      "x": 64,
      "y": 48
    },
    "characterScale": 1,
    "textPosition": {
      "x": 64,
      "y": 12,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "tear_drop_pulse",
    "movement": "tear_drop_pulse",
    "transition": "cut"
  },
  {
    "id": 24,
    "start": 28.533,
    "end": 30.167,
    "startTime": 28.533,
    "endTime": 30.167,
    "startFrame": 856,
    "endFrame": 905,
    "scene": "Sweet Little",
    "name": "Sweet Little",
    "lyric": "SWEET LITTLE",
    "characterType": "cute_cat",
    "characterPose": "cat_sparkle_close",
    "characterPosition": {
      "x": 64,
      "y": 46
    },
    "characterScale": 1.25,
    "textPosition": {
      "x": 44,
      "y": 14,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "sparkle_pupil_pulse",
    "movement": "sparkle_pupil_pulse",
    "transition": "cut"
  },
  {
    "id": 25,
    "start": 30.167,
    "end": 30.933,
    "startTime": 30.167,
    "endTime": 30.933,
    "startFrame": 905,
    "endFrame": 928,
    "scene": "I Know What You",
    "name": "I Know What You",
    "lyric": "I KNOW WHAT YOU",
    "characterType": "cute_cat",
    "characterPose": "cat_smile_close",
    "characterPosition": {
      "x": 64,
      "y": 46
    },
    "characterScale": 1.25,
    "textPosition": {
      "x": 64,
      "y": 14,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "cheerful_bounce",
    "movement": "cheerful_bounce",
    "transition": "cut"
  },
  {
    "id": 26,
    "start": 30.933,
    "end": 31.867,
    "startTime": 30.933,
    "endTime": 31.867,
    "startFrame": 928,
    "endFrame": 956,
    "scene": "Want From Me",
    "name": "Want From Me",
    "lyric": "WANT FROM ME",
    "characterType": "cute_cat",
    "characterPose": "cat_wave_close",
    "characterPosition": {
      "x": 64,
      "y": 46
    },
    "characterScale": 1.25,
    "textPosition": {
      "x": 64,
      "y": 14,
      "align": "center"
    },
    "textSize": "normal",
    "textScale": 1,
    "motion": "paw_wave",
    "movement": "paw_wave",
    "transition": "cut"
  }
];

export const TIMELINE = timeline;

/**
 * Returns the active scene object for the specified time in seconds.
 */
export function getSceneAtTime(time) {
  const t = Math.max(0, Math.min(31.867, time));
  for (let i = 0; i < TIMELINE.length; i++) {
    const scene = TIMELINE[i];
    if (t >= scene.start && t < scene.end) {
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
    if (t >= scene.start && t < scene.end) {
      return i;
    }
  }
  return TIMELINE.length - 1;
}
