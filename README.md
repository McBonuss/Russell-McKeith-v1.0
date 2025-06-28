# Gorilla Game

[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/demo-play-blue)](https://mcbonuss.github.io/p2Java-script-game/)
[![Issues](https://img.shields.io/github/issues/McBonuss/p2Java-script-game.svg)](https://github.com/McBonuss/p2Java-script-game/issues)
[![Last Commit](https://img.shields.io/github/last-commit/McBonuss/p2Java-script-game.svg)](https://github.com/McBonuss/p2Java-script-game/commits/main)

A modern, browser-based remake of the classic QBasic "Gorillas" artillery game!  
Challenge a friend on a beautiful night skyline—now with animated gorillas, dynamic cityscapes, and a polished, mobile-friendly UI.

---

## Table of Contents

1. [Overview](#overview)
2. [Badges](#badges)
3. [Features](#features)
4. [Demo](#demo)
5. [Screenshots](#screenshots)
6. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running Locally](#running-locally)
    - [Deployment](#deployment)
7. [Game Architecture](#game-architecture)
8. [File Structure](#file-structure)
9. [Main Components](#main-components)
10. [Gameplay](#gameplay)
11. [Extensibility & Customisation](#extensibility--customisation)
12. [Recent Changes & Updates](#recent-changes--updates)
13. [Technologies Used](#technologies-used)
14. [Testing](#testing)
15. [Browser Compatibility](#browser-compatibility)
16. [Accessibility](#accessibility)
17. [Known Issues](#known-issues)
18. [Troubleshooting & FAQ](#troubleshooting--faq)
19. [Future Features](#future-features)
20. [Contributing](#contributing)
21. [Changelog](#changelog)
22. [Credits & Acknowledgements](#credits--acknowledgements)
23. [Support](#support)
24. [Contact](#contact)
25. [License](#license)

---

## Overview

**Gorilla Game** is a modern, open-source tribute to the legendary QBasic Gorillas.  
Use intuitive drag controls to set the angle and velocity, then watch your banana arc over procedurally generated buildings.  
It’s a two-player, turn-based battle—first to hit wins!

> Built in vanilla JavaScript, with accessibility, mobile support, and extensibility in mind.

---

## Badges

| Build Status | License | Demo | Issues | Last Commit |
|:---:|:---:|:---:|:---:|:---:|
| ![status](https://img.shields.io/badge/build-passing-brightgreen) | ![MIT](https://img.shields.io/badge/license-MIT-green) | [Play Now](https://mcbonuss.github.io/p2Java-script-game/) | ![Issues](https://img.shields.io/github/issues/McBonuss/p2Java-script-game.svg) | ![Last Commit](https://img.shields.io/github/last-commit/McBonuss/p2Java-script-game.svg) |

---

## Features

- **Responsive**: Desktop & mobile-optimised; fluid canvas scaling
- **Procedural Cities**: New city skyline every game
- **Animated Gorillas**: Improved proportions; only the right arm up when throwing
- **Intuitive Controls**: Drag-and-release to aim and throw
- **Night Sky**: Beautiful gradient, static stars, moon, and building depth
- **Building Variety**: 3D effects, static windows, rooftop antennas
- **Celebration Overlay**: Custom “Congratulations” screen
- **Modern UI**: Floating cards for info and instructions
- **Expandable Sections**: Keyboard-accessible “How to Play”, “History”, etc.
- **Accessibility**: ARIA, skip links, keyboard nav for cards
- **Zero Dependencies**: All code is vanilla JS/CSS/HTML
- **Easy to Fork & Extend**

---

## Demo

[▶️ **Play Gorilla Game (GitHub Pages)**](https://mcbonuss.github.io/p2Java-script-game/)

---

## Screenshots

align="center">
  ![Gameplay Screenshot](assets/ReadMEImages/GorillasResponsive.jpg)

_**Add more screenshots or animated GIFs in the future for enhanced presentation!**_

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- _(Optional)_ VSCode Live Server extension for local dev

### Installation

```bash
git clone https://github.com/McBonuss/p2Java-script-game.git
cd p2Java-script-game
```

### Running Locally

Open `index.html` in your browser, or use Live Server for auto-refresh:

```bash
# Mac
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

### Deployment

Push to the main branch.

Enable GitHub Pages in your repository settings (root).

Your game will be live at:  
<https://mcbonuss.github.io/p2Java-script-game/>

---

## Game Architecture

The codebase is modular and designed for maintainability:

- **Game State:** All runtime data is stored in a single state object.
- **Procedural Generation:** Buildings and windows are randomly generated, using seeded functions for reproducibility if desired.
- **Rendering:** All visuals (city, gorillas, bomb) are handled via Canvas 2D API.
- **Input:** Mouse/touch events for aiming; responsive design auto-adjusts controls.
- **UI:** Info cards and overlays use semantic HTML/CSS and are ARIA-labelled for accessibility.
- **Game Loop:** Uses requestAnimationFrame for smooth animation and physics stepping.
- **Collision Detection:** Simple circle-to-circle for gorilla/bomb; rectangle for buildings.

The game logic, rendering, and UI code are clearly separated for easy onboarding and extension.

---

## File Structure

```text
/
├── index.html
├── css/
│   └── style.css
├── assets/
│   ├── ReadMEImages/
│   └── js/
│       └── scripts.js
├── screenshots/
├── README.md
├── LICENSE
```

---

## Main Components

- **index.html:** Game canvas and all UI elements; also includes info overlays and cards
- **css/style.css:** Main styling for layout, UI, and canvas visuals
- **assets/js/scripts.js:** All gameplay, rendering, input, and logic
- **assets/ReadMEImages/:** Documentation assets/screenshots
- **screenshots/:** (Add gameplay screenshots and GIFs here)

---

## Gameplay

**Goal:**  
Hit your opponent’s gorilla with the banana to win!

**How to Play:**

- Click and drag the banana to set angle/velocity.
- Release to throw.
- The bomb’s arc is affected by gravity; aim carefully over (or around) buildings.
- The correct arm raises when aiming—both arms when celebrating!
- Click “New Game” to reset and play again.

**Mobile:**  
Rotate your device to landscape for the best experience.

---

## Extensibility & Customisation

Want to add your own twist? Here’s how:

**Add new features:**

- Wind or weather: Modify the bomb’s physics in `moveBomb()`.
- More players: Refactor the `state.currentPlayer` logic and UI.
- Power-ups: Add objects to the city and handle collisions in the main loop.
- AI Opponent: Implement a simple bot for single-player.

**Customise visuals:**

- Tweak colors, building shapes, or add new sprites in `drawBuildings()` or `drawGorillaBody()`.
- Replace the night sky and moon with your own background in `drawBackground()`.

**Add sounds:**

- Hook into bomb throw and collision events to play sounds.

All main code is in `/assets/js/scripts.js` and is thoroughly commented for ease of navigation.

---

## Recent Changes & Updates

- **Night sky** with a realistic moon and static stars
- **More building variety**, 3D shading, rooftop details
- **Improved gorilla body/face proportions and animation**
- **Enhanced celebration overlay**
- **Static, non-flickering windows and stars** for a polished look
- **Full ARIA/keyboard accessibility** on expandable cards
- **Debug/development code removed** for production
- **Updated and extended documentation**

---

## Technologies Used

- **Languages:** HTML5, CSS3, JavaScript (ES6)
- **Dev Tools:** VSCode, Chrome DevTools
- **Fonts:** Google Fonts (Press Start 2P for retro feel)
- **Version Control & Hosting:** GitHub, GitHub Pages

---

## Testing

### Manual Testing

- Cross-browser: Chrome, Firefox, Edge, Safari.
- Mobile: iOS and Android, including device orientation handling.
- Gameplay: All game states, win/loss detection, UI overlays.
- Responsive resizing: Window resize during gameplay and resets.

### Automated Testing

- No automated tests implemented yet. All testing has been manual and exploratory.

---

## Browser Compatibility

Tested in:

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)
- Mobile browsers on iOS and Android

> Note: Touch dragging may vary slightly between browsers.

---

## Accessibility

- The game is primarily visual and interactive, with minimal support for screen readers.
- Info panels and expandable cards are marked up for accessibility.
- Keyboard navigation is supported for expandable cards and skip links.
- Gameplay is not fully accessible for non-visual users.

---

## Known Issues

- Touch dragging may be less smooth on some mobile browsers.
- The bomb grab area may be slightly offset on certain device pixel ratios (subpixel rounding).
- Resizing during a throw may cause the bomb’s trajectory to jump.
- Minimal accessibility support for screen readers.

---

## Troubleshooting & FAQ

**Q: The game doesn't load / is stuck on a white screen.**  
A: Ensure you have a modern browser. Check the console for errors (F12).

**Q: Why is there a gap on the right side of the game?**  
A: This happens if the window aspect ratio doesn't match the game. Resize the window or use a different device.

**Q: How to play on mobile?**  
A: Rotate your device to landscape mode for the best experience. Touch controls are fully supported.

**Q: The gorilla/bomb doesn't seem to respond correctly.**  
A: This may occur on very high or low screen resolutions. Ensure your browser is up-to-date.

**Q: I found a bug / issue.**  
A: Please report it on the [GitHub Issues page](https://github.com/McBonuss/p2Java-script-game/issues).

---

## Future Features

- [ ] Add wind and weather effects
- [ ] Sound effects and background music
- [ ] AI opponent for solo play
- [ ] Score tracking and persistent leaderboards
- [ ] Enhanced accessibility for visually impaired users
- [ ] Game settings (gravity, building count, etc.)

---

## Contributing

Contributions are welcome! Please:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes.
4. Open a pull request with a clear description.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) if available.

---

## Changelog

- **v1.0.0**: Initial release with core gameplay and features.
- **v1.1.0**: Added mobile support, improved UI, and procedural city generation.
- **v1.2.0**: Night mode, building variety, and animated gorillas.
- **v1.3.0**: Celebration overlay, modern UI cards, and accessibility improvements.
- **v1.4.0**: Debug code removal, documentation updates, and minor bug fixes.

---

## Credits & Acknowledgements

- Inspired by the original [QBasic Gorillas](https://en.wikipedia.org/wiki/Gorillas_(video_game))
- UI and gameplay enhancements by [Your Name] and community contributors.
- [MDN Web Docs](https://developer.mozilla.org/) for JavaScript and Canvas APIs
- [Google Fonts](https://fonts.google.com/) for "Press Start 2P"
- Special thanks to open-source contributors and testers.
- My girlfriend and my friends for putting up with me whilst writing this.

---

## Support

If you encounter bugs or have feature requests, please [open an issue](https://github.com/McBonuss/p2Java-script-game/issues).

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

**Enjoy the game! Feel free to submit issues, suggestions, or pull requests to help make Gorilla Game even better.**
