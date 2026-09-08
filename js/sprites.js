/**
 * sprites.js
 * Sprite registry, preloader, and metadata for Sweet Little Bumblebee LCD animation
 */

export class SpriteManager {
  constructor() {
    this.images = new Map();
    this.loaded = false;
  }

  async loadAll(onProgress = () => {}) {
    const assetList = [
      // Characters (RGBA transparent)
      { key: 'char_intro_1', url: 'assets/chars_rgba/01_intro_1.png?v=2' },
      { key: 'char_intro_2', url: 'assets/chars_rgba/01_intro_2.png?v=2' },
      { key: 'char_heart_1', url: 'assets/chars_rgba/02_my_heart_1.png?v=2' },
      { key: 'char_heart_2', url: 'assets/chars_rgba/02_my_heart_2.png?v=2' },
      { key: 'char_walk_1', url: 'assets/chars_rgba/03_walk_in_room_1.png?v=2' },
      { key: 'char_walk_2', url: 'assets/chars_rgba/03_walk_in_room_2.png?v=2' },
      { key: 'char_boom_1', url: 'assets/chars_rgba/04_i_go_boom_1.png?v=2' },
      { key: 'char_boom_2', url: 'assets/chars_rgba/04_i_go_boom_2.png?v=2' },
      { key: 'char_zoom_1', url: 'assets/chars_rgba/05_zoom_1.png?v=2' },
      { key: 'char_zoom_2', url: 'assets/chars_rgba/05_zoom_2.png?v=2' },
      { key: 'char_playboy_1', url: 'assets/chars_rgba/06_playboy_1.png?v=2' },
      { key: 'char_playboy_2', url: 'assets/chars_rgba/06_playboy_2.png?v=2' },
      { key: 'char_flower_1', url: 'assets/chars_rgba/07_playtoy_flower_1.png?v=2' },
      { key: 'char_flower_2', url: 'assets/chars_rgba/07_playtoy_flower_2.png?v=2' },
      { key: 'char_twocats_1', url: 'assets/chars_rgba/08_two_cats_intro_1.png?v=2' },
      { key: 'char_twocats_2', url: 'assets/chars_rgba/08_two_cats_intro_2.png?v=2' },
      { key: 'char_wanna_1', url: 'assets/chars_rgba/09_wanna_be_with_you_1.png?v=2' },
      { key: 'char_wanna_2', url: 'assets/chars_rgba/09_wanna_be_with_you_2.png?v=2' },
      { key: 'char_until_1', url: 'assets/chars_rgba/10_until_the_end_1.png?v=2' },
      { key: 'char_until_2', url: 'assets/chars_rgba/10_until_the_end_2.png?v=2' },
      { key: 'char_give_1', url: 'assets/chars_rgba/11_give_my_heart_1.png?v=2' },
      { key: 'char_give_2', url: 'assets/chars_rgba/11_give_my_heart_2.png?v=2' },
      { key: 'char_soul_1', url: 'assets/chars_rgba/12_soul_to_you_1.png?v=2' },
      { key: 'char_soul_2', url: 'assets/chars_rgba/12_soul_to_you_2.png?v=2' },
      { key: 'char_knife_1', url: 'assets/chars_rgba/13_knife_true_1.png?v=2' },
      { key: 'char_knife_2', url: 'assets/chars_rgba/13_knife_true_2.png?v=2' },
      { key: 'char_confused_1', url: 'assets/chars_rgba/14_confused_1.png?v=2' },
      { key: 'char_confused_2', url: 'assets/chars_rgba/14_confused_2.png?v=2' },
      { key: 'char_deadpan_1', url: 'assets/chars_rgba/15_cant_you_see_1.png?v=2' },
      { key: 'char_deadpan_2', url: 'assets/chars_rgba/15_cant_you_see_2.png?v=2' },
      { key: 'char_rescue_1', url: 'assets/chars_rgba/16_rescue_me_1.png?v=2' },
      { key: 'char_rescue_2', url: 'assets/chars_rgba/16_rescue_me_2.png?v=2' },
      { key: 'char_sweet_1', url: 'assets/chars_rgba/17_sweet_little_1.png?v=2' },
      { key: 'char_sweet_2', url: 'assets/chars_rgba/17_sweet_little_2.png?v=2' },

      // Lyric Text (RGBA transparent)
      { key: 'text_heart', url: 'assets/text_rgba/02_my_heart_1.png?v=2' },
      { key: 'text_walk', url: 'assets/text_rgba/03_walk_in_room_1.png?v=2' },
      { key: 'text_boom', url: 'assets/text_rgba/04_i_go_boom_1.png?v=2' },
      { key: 'text_zoom', url: 'assets/text_rgba/05_zoom_1.png?v=2' },
      { key: 'text_playboy', url: 'assets/text_rgba/06_playboy_1.png?v=2' },
      { key: 'text_flower', url: 'assets/text_rgba/07_playtoy_flower_1.png?v=2' },
      { key: 'text_wanna', url: 'assets/text_rgba/09_wanna_be_with_you_1.png?v=2' },
      { key: 'text_until', url: 'assets/text_rgba/10_until_the_end_1.png?v=2' },
      { key: 'text_give', url: 'assets/text_rgba/11_give_my_heart_1.png?v=2' },
      { key: 'text_soul', url: 'assets/text_rgba/12_soul_to_you_1.png?v=2' },
      { key: 'text_knife', url: 'assets/text_rgba/13_knife_true_1.png?v=2' },
      { key: 'text_confused', url: 'assets/text_rgba/14_confused_1.png?v=2' },
      { key: 'text_deadpan', url: 'assets/text_rgba/15_cant_you_see_1.png?v=2' },
      { key: 'text_rescue', url: 'assets/text_rgba/16_rescue_me_1.png?v=2' },
      { key: 'text_sweet', url: 'assets/text_rgba/17_sweet_little_1.png?v=2' },
      { key: 'text_sweet_2', url: 'assets/text_rgba/17_sweet_little_2.png?v=2' },

      // Special impact overlays
      { key: 'special_igo', url: 'assets/special/text_i_go.png?v=2' },
      { key: 'special_boom_1', url: 'assets/special/boom_1.png?v=2' },
      { key: 'special_boom_2', url: 'assets/special/boom_2.png?v=2' },
      { key: 'special_boom_3', url: 'assets/special/boom_3.png?v=2' },
      { key: 'special_zoom_text_1', url: 'assets/special/zoom_text_1.png?v=2' },
      { key: 'special_zoom_text_2', url: 'assets/special/zoom_text_2.png?v=2' },
      { key: 'special_zoom_flame_1', url: 'assets/special/zoom_flame_1.png?v=2' },
      { key: 'special_zoom_flame_2', url: 'assets/special/zoom_flame_2.png?v=2' },
    ];

    let loadedCount = 0;
    const total = assetList.length;

    await Promise.all(
      assetList.map(({ key, url }) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            this.images.set(key, img);
            loadedCount++;
            onProgress(loadedCount / total);
            resolve();
          };
          img.onerror = () => {
            console.warn(`[SpriteManager] Failed to load asset: ${url}`);
            loadedCount++;
            onProgress(loadedCount / total);
            resolve();
          };
        });
      })
    );

    this.loaded = true;
    return this.images;
  }

  get(key) {
    return this.images.get(key) || null;
  }
}
