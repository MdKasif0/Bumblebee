# Sweet Little Bumblebee — LCD Web Animation

A high-fidelity browser reconstruction of the viral crude pixel-art monochrome animation featuring the meme song *"Sweet Little Bumblebee"* by Bambee, originally displayed on an SSD1306 128×64 LCD screen.

Built as a pure browser animation rendered live via Canvas 2D, SVG, CSS, and Vanilla JavaScript with frame-accurate audio synchronization.

---

## Features

- **Real-Time Browser Animation:** Rendered live on a Canvas 2D display — no video playback or video backgrounds.
- **Parametric Motion & Physics:**
  - Dynamic 135 BPM beat bobbing and character squash-and-stretch.
  - Scene 13 ("My love is true") knife-wielding cat parametric sway & tilt.
  - Multi-frame spiky flame flickers during "BOOM" and "ZOOM" sequences.
  - Screen recoil impact shake.
  - Finale singing cat lip sync.
- **Glare-Free Visual Restoration:** Glare reflection from the original camera footage has been isolated and removed, preserving crisp dark navy (`#141a2e`) linework on the pale blue (`#c8d8ea`) LCD background.
- **Interactive Controls & Keyboard Shortcuts:**
  - `Space`: Play / Pause
  - `←` / `→`: Skip ±2 seconds
  - `M`: Mute / Unmute
  - `G`: Toggle 128×64 LCD pixel matrix grid
  - `B`: Toggle physical SSD1306 hardware module bezel (with GND, VDD, SCK, SDA pin headers)
  - `F`: Fullscreen mode
  - Quick chapter pills to instantly jump to key scenes (`Intro`, `My Heart`, `Boom!`, `Zoom!`, `Two Cats`, `Knife`, `Rescue`, `Finale`).

---

## Project Structure

```
├── index.html        # Clean semantic markup with responsive canvas & control dock
├── style.css         # Dark studio aesthetic, CRT glow, bezel styling & controls
├── audio.mp3         # 44.1kHz stereo audio track extracted from the reference
├── js/
│   ├── app.js        # Main coordinator, audio-clock sync, input handlers
│   ├── renderer.js   # 256×128 Canvas 2D rendering pipeline (shake, sway, bobbing)
│   ├── timeline.js   # 17-scene schedule aligned with 135 BPM tempo
│   ├── sprites.js    # Asset loader & sprite manager with cache busting
│   └── typography.js # Procedural hand-drawn wobbly pixel font generator
└── assets/
    ├── chars_rgba/   # Clean transparent RGBA character sprites for each scene
    ├── text_rgba/    # Hand-drawn lyric overlays
    └── special/      # Energy bursts, "BOOM" hits, and "ZOOM" flame graphics
```

---

## Running Locally

No build tools or Node.js required! You can run it with any static web server:

```bash
# Python 3
python3 -m http.server 8088

# Or Node's npx serve
npx serve .
```

Then open `http://localhost:8088` in your browser.
