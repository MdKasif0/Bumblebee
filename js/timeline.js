/**
 * timeline.js
 * High-precision animation timeline and audio-sync event manager
 */

export const BPM = 135.0;
export const SECONDS_PER_BEAT = 60.0 / BPM; // ~0.444s

export const SCENES = [
  {
    id: 'intro',
    start: 0.0,
    end: 0.70,
    title: 'Intro Peeking',
    charSprite1: 'char_intro_1',
    charSprite2: 'char_intro_2',
    charPos: { x: 30, y: 15 },
    textSprite: null,
    textPos: { x: 0, y: 0 },
    animType: 'blink_slow',
  },
  {
    id: 'my_heart',
    start: 0.70,
    end: 2.00,
    title: 'My Heart Skips A Beat',
    charSprite1: 'char_heart_1',
    charSprite2: 'char_heart_2',
    charPos: { x: 0, y: 65 },
    textSprite: 'text_heart',
    textPos: { x: 0, y: 6 },
    animType: 'heart_skip',
  },
  {
    id: 'walk_in_room',
    start: 2.00,
    end: 4.20,
    title: 'When You Walk In The Room',
    charSprite1: 'char_walk_1',
    charSprite2: 'char_walk_2',
    charPos: { x: 0, y: 55 },
    textSprite: 'text_walk',
    textPos: { x: 0, y: 6 },
    animType: 'walk_sway',
  },
  {
    id: 'i_go_boom',
    start: 4.20,
    end: 6.00,
    title: 'I Go BOOM BOOM BOOM BOOM',
    charSprite1: 'char_boom_1',
    charSprite2: 'char_boom_2',
    charPos: { x: 0, y: 68 },
    textSprite: null, // Custom sub-stepped text handled in renderer
    textPos: { x: 0, y: 6 },
    animType: 'boom_hits',
    hits: [
      { time: 4.20, type: 'igo' },
      { time: 4.55, type: 'boom1', shake: 5 },
      { time: 4.97, type: 'boom2', shake: 7 },
      { time: 5.55, type: 'boom3', shake: 9 },
      { time: 5.90, type: 'boom4', shake: 12 },
    ]
  },
  {
    id: 'zoom',
    start: 6.00,
    end: 7.70,
    title: 'ZOOM ZOOM ZOOM ZOOM',
    charSprite1: 'special_zoom_flame_1',
    charSprite2: 'special_zoom_flame_2',
    charPos: { x: 0, y: 45 },
    textSprite: null,
    textPos: { x: 0, y: 4 },
    animType: 'zoom_flame',
    subBeats: [6.00, 6.50, 7.03, 7.50]
  },
  {
    id: 'playboy',
    start: 7.70,
    end: 8.70,
    title: "You're My Playboy",
    charSprite1: 'char_playboy_1',
    charSprite2: 'char_playboy_2',
    charPos: { x: 0, y: 42 },
    textSprite: 'text_playboy',
    textPos: { x: 0, y: 6 },
    animType: 'tilt_bob',
  },
  {
    id: 'playtoy_flower',
    start: 8.70,
    end: 9.60,
    title: 'Playtoy Flower',
    charSprite1: 'char_flower_1',
    charSprite2: 'char_flower_2',
    charPos: { x: 0, y: 36 },
    textSprite: 'text_flower',
    textPos: { x: 0, y: 6 },
    animType: 'flower_spin',
  },
  {
    id: 'two_cats_intro',
    start: 9.60,
    end: 10.80,
    title: 'Two Cats Dancing',
    charSprite1: 'char_twocats_1',
    charSprite2: 'char_twocats_2',
    charPos: { x: 0, y: 40 },
    textSprite: null,
    textPos: { x: 0, y: 0 },
    animType: 'duo_bounce',
  },
  {
    id: 'wanna_be',
    start: 10.80,
    end: 12.37,
    title: 'I Wanna Be With You',
    charSprite1: 'char_wanna_1',
    charSprite2: 'char_wanna_2',
    charPos: { x: 0, y: 42 },
    textSprite: 'text_wanna',
    textPos: { x: 0, y: 6 },
    animType: 'duo_dance_props',
  },
  {
    id: 'until_the_end',
    start: 12.37,
    end: 14.73,
    title: 'Until The End',
    charSprite1: 'char_until_1',
    charSprite2: 'char_until_2',
    charPos: { x: 0, y: 42 },
    textSprite: 'text_until',
    textPos: { x: 0, y: 6 },
    animType: 'duo_groove',
  },
  {
    id: 'give_my_heart',
    start: 14.73,
    end: 15.90,
    title: 'I Give My Heart',
    charSprite1: 'char_give_1',
    charSprite2: 'char_give_2',
    charPos: { x: 0, y: 42 },
    textSprite: 'text_give',
    textPos: { x: 0, y: 6 },
    animType: 'heart_pose',
  },
  {
    id: 'soul_to_you',
    start: 15.90,
    end: 17.90,
    title: 'And My Soul To You',
    charSprite1: 'char_soul_1',
    charSprite2: 'char_soul_2',
    charPos: { x: 0, y: 42 },
    textSprite: 'text_soul',
    textPos: { x: 0, y: 6 },
    animType: 'tongue_wink',
  },
  {
    id: 'knife_true',
    start: 17.90,
    end: 21.43,
    title: "To Make You See It's True",
    charSprite1: 'char_knife_1',
    charSprite2: 'char_knife_2',
    charPos: { x: 0, y: 45 },
    textSprite: 'text_knife',
    textPos: { x: 0, y: 6 },
    animType: 'knife_sway',
  },
  {
    id: 'confused',
    start: 21.43,
    end: 22.77,
    title: "I'm So Confused,",
    charSprite1: 'char_confused_1',
    charSprite2: 'char_confused_2',
    charPos: { x: 0, y: 42 },
    textSprite: 'text_confused',
    textPos: { x: 0, y: 6 },
    animType: 'confused_sweat',
  },
  {
    id: 'cant_you_see',
    start: 22.77,
    end: 24.83,
    title: "Baby Can't You See?",
    charSprite1: 'char_deadpan_1',
    charSprite2: 'char_deadpan_2',
    charPos: { x: 0, y: 42 },
    textSprite: 'text_deadpan',
    textPos: { x: 0, y: 6 },
    animType: 'deadpan_blink',
  },
  {
    id: 'rescue_me',
    start: 24.83,
    end: 28.53,
    title: 'Please Come Rescue Me',
    charSprite1: 'char_rescue_1',
    charSprite2: 'char_rescue_2',
    charPos: { x: 0, y: 60 },
    textSprite: 'text_rescue',
    textPos: { x: 0, y: 6 },
    animType: 'rescue_crying',
  },
  {
    id: 'sweet_little',
    start: 28.53,
    end: 31.88,
    title: 'Sweet Little Bumblebee (Finale)',
    charSprite1: 'char_sweet_1',
    charSprite2: 'char_sweet_2',
    charPos: { x: 0, y: 38 },
    textSprite: 'text_sweet',
    textPos: { x: 0, y: 6 },
    animType: 'finale_sing',
    subLyrics: [
      { time: 28.53, textKey: 'text_sweet' },
      { time: 30.17, text: 'I KNOW WHAT YOU' },
      { time: 30.93, text: 'WANT FROM ME' }
    ]
  }
];

export function getSceneAt(time) {
  const t = Math.max(0, time);
  for (let i = 0; i < SCENES.length; i++) {
    const s = SCENES[i];
    if (t >= s.start && t < s.end) {
      return { scene: s, progress: (t - s.start) / (s.end - s.start), sceneIndex: i };
    }
  }
  // Clamp to last scene if past duration
  const last = SCENES[SCENES.length - 1];
  return { scene: last, progress: 1.0, sceneIndex: SCENES.length - 1 };
}
