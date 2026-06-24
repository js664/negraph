# the negraph 📱

An interactive, front-end parody replica of the fictional diagnostic smartphone application **"The Negraph"** from the classic *Key & Peele* comedy sketch. Built with early-2010s skeuomorphic iOS aesthetics, responsive canvas positioning, physical sound effects, and diagnostic history tracking.

✨ **[Live Demo (GitHub Pages)](https://js664.github.io/negraph/)**

---

## 🎨 Visuals & Skeuomorphic Design

The application is a visual homage to the iconic **iOS 5 / iOS 6 era (circa 2012)**:
* **iPhone Body Frame:** Mimics the classic iPhone 4S/5 chassis, complete with a reflective glass front camera lens, speaker grille, and a working circular physical **Home Button** that brings you back to the main app screen.
* **Textured Linen:** Features the classic grey-textured linen background inside the application menus and a dark linen desktop wallpaper outside the device.
* **Glossy Navigation Controls:** Navbars and buttons feature layered metallic gradients, top-border inner highlights, and inset shadows.
* **Form Layout:** Leverages the classic iOS grouped list layout for form inputs.

---

## ⚙️ Interactive Mechanics

1. **The Cartesian Diagonal Calibration:**
   * Moves a custom face indicator along a 2D diagonal coordinate path following the linear formula $Y = X$.
   * Top-left bounds map to **YES** (with a pulsing green LED glow) and bottom-left bounds map to **NO** (with a pulsing red LED glow).
2. **Skin Tone Spectra Index:**
   * Dragging the slider shifts the face's skin color smoothly from fair to deep tones.
   * Dynamic emoji expression transitions:
     * **0% - 35%:** Frowning Face `🙁` &rarr; **ACCESS DENIED** 🛑
     * **36% - 69%:** Neutral Face `😐` &rarr; **RESTRICTED** ⚠️
     * **70% - 100%:** Smiling Face `🙂` &rarr; **ACCESS GRANTED** ✅
3. **Hardware Synthesized Sounds:**
   * Utilizes the **Web Audio API** to generate real-time mechanical ticks on slider drag, digital sweeps on scan, and custom chimes/buzzers based on the diagnostic outcomes. *Mute/unmute toggle is built into the navigation header.*
4. **Scan Database Log:**
   * Includes an active scan log loaded with comical records from the sketch (Keegan-Michael Key, Jordan Peele, Zach Braff, etc.) and dynamically adds your own custom scans.

---

## 🛠️ Technology Stack

* **Core Structure:** HTML5 & Vanilla ES6 JS
* **Framework:** React 18 (via UMD CDN)
* **Style Engine:** Tailwind CSS v3 (via Play CDN) + Custom Skeuomorphic CSS
* **Audio Synthesis:** Web Audio API (oscillators, filters, gain nodes)
* **Deployment:** GitHub Pages (Single-page static app, zero external build dependencies)

---

## 🚀 Local Development & Execution

Since the app has zero build tools or package dependencies, running it is simple:

1. Clone this repository:
   ```bash
   git clone https://github.com/js664/negraph.git
   cd negraph
   ```
2. Double-click `index.html` or open it with any web browser of your choice.

Alternatively, serve it locally with Python:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

---

## 📄 License & Disclaimer

This is a satirical parody project created for entertainment and comedic appreciation purposes. All references to *Key & Peele* belong to Comedy Central and their respective creators. No malice or discrimination is intended.
