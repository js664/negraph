# the negraph 📱

An interactive, front-end parody replica of the fictional diagnostic smartphone application **"The Negraph"** from the classic *Key & Peele* comedy sketch. Built with a modular React structure, Tailwind CSS, and physical sound effects.

✨ **[Live Demo (Vercel)](https://negraph.vercel.app/)**

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

## 🛠️ Code Architecture (Multiple Files)

The project has been refactored into a structured, production-ready React codebase:
* `src/main.jsx`: Mounts the app and imports global styles.
* `src/App.jsx`: Manages reactive state (tone slider, diagnostic trigger, tab view navigation, muted settings, scan history).
* `src/components/PhoneFrame.jsx`: iPhone 4/5 hardware frame template with speaker slot, front camera, and interactive home button.
* `src/components/StatusBar.jsx`: iOS signal strength, network, time, and battery display.
* `src/components/NavBar.jsx`: Header panel with reset and mute selectors.
* `src/components/GraphArea.jsx`: Coordinate canvas with grid rendering, $Y = X$ diagonal line, YES/NO stamp readouts, and the floating emoji.
* `src/components/InputForm.jsx`: Grouped list form fields for name, age, and gradient slider.
* `src/components/ResultScreen.jsx`: Green glowing LCD system log showing computed scanning status results.
* `src/components/DatabaseTab.jsx`: Database entries history lists.
* `src/components/AboutTab.jsx`: Historical background about the Negraph scientific calibration theory.
* `src/components/TabBar.jsx`: Glossy bottom menu bar with Lucide icons.
* `src/utils/audio.js`: Synthesizer helper managing audio nodes (oscillators, biquad lowpass filters, gain envelopes).

---

## 🚀 Local Development & Execution

To run the project locally, install dependencies and launch Vite dev server:

1. Clone this repository:
   ```bash
   git clone https://github.com/js664/negraph.git
   cd negraph
   ```
2. Install node dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the displayed URL (e.g. `http://localhost:5173`) in your browser.

---

## ⚡ Deployment on Vercel

This app is optimized for immediate zero-config deployment on Vercel:

1. Connect your GitHub repository to your Vercel account.
2. Select the `negraph` project.
3. Keep default build settings (Vite is auto-detected):
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
4. Click **Deploy**.

---

## 📄 License & Disclaimer

This is a satirical parody project created for entertainment and comedic appreciation purposes. All references to *Key & Peele* belong to Comedy Central and their respective creators. No malice or discrimination is intended.
