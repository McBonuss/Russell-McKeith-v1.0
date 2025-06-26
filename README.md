# Gorilla Game

A modern, browser-based remake of the classic "Gorillas" artillery game. Two gorillas stand atop procedurally generated city buildings and take turns throwing explosive bananas at each other. Adjust angle and velocity to account for gravity and obstacles—the last gorilla standing wins!

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Demo](#demo)
4. [Screenshots](#screenshots)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running Locally](#running-locally)
   - [Deployment](#deployment)
6. [File Structure](#file-structure)
7. [Main Components](#main-components)
8. [Gameplay](#gameplay)
9. [Technologies Used](#technologies-used)
10. [Testing](#testing)
11. [Browser Compatibility](#browser-compatibility)
12. [Accessibility](#accessibility)
13. [Known Issues](#known-issues)
14. [Future Features](#future-features)
15. [Contributing](#contributing)
16. [Credits & Acknowledgements](#credits--acknowledgements)
17. [Support](#support)
18. [License](#license)

---

## Overview

**Gorilla Game** is a full-stack JavaScript remake of the beloved QBasic classic. Built for modern browsers with mobile support, it features a responsive UI, randomly generated skylines, and intuitive drag controls for aiming and throwing. The game is designed for easy replayability and a nostalgic yet fresh experience.

---

## Features

- **Responsive Design:** Scales gracefully between desktop and mobile devices.
- **Procedural City Generation:** Each match features a unique skyline.
- **Animated Gorillas:** Enjoy charming animations and expressive gameplay.
- **Interactive Controls:** Drag to set angle and velocity, suitable for mouse and touch.
- **Win/Loss Detection:** Clear feedback and celebration overlays.
- **Replayability:** Reset and start new games with a single click.
- **Modern UI:** Floating card interface with concise info panels for each player.
- **Mobile Support:** Landscape-first layout, with prompts for device rotation.

---

## Demo

> [Play the game on GitHub Pages](https://<your-username>.github.io/<repo-name>/)

Replace `<your-username>` and `<repo-name>` with your GitHub details.

---

## Screenshots

<!-- Replace with actual image paths in your repo -->
![Game Start](screenshots/game-start.png)
![Player Aiming](screenshots/aiming.png)
![Victory Screen](screenshots/victory.png)

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- (Optional) [Live Server extension for VSCode](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for hot-reloading

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```

### Running Locally

Open `index.html` directly in your browser, or use Live Server for development:

```sh
open index.html      # macOS
start index.html     # Windows
xdg-open index.html  # Linux
```

### Deployment

1. Push your code to the `main` branch on GitHub.
2. In repository settings, set GitHub Pages source to the `main` branch.
3. Your game will be available at:  
   `https://<your-username>.github.io/<repo-name>/`

---

## File Structure

```
/
├── index.html
├── css/
│   └── style.css
├── assets/
│   └── js/
│       └── scripts.js
└── README.md
```
- **index.html**: Main HTML file, includes game UI and info sections.
- **css/style.css**: Main stylesheet for layout and game visuals.
- **assets/js/scripts.js**: All game logic and rendering.

---

## Main Components

- **Canvas Rendering:** All visuals (buildings, gorillas, bananas) are drawn using the `<canvas>` element and 2D context.
- **State Management:** The game uses a single `state` object to track current phase, bomb position, player turn, buildings, etc.
- **Event Handling:** Interaction is through mouse/touch events bound to the bomb grab area for aiming/throwing.
- **Responsive Design:** The canvas and UI elements resize and reposition based on the `.game-container`’s size.
- **Mobile Orientation:** A rotate message is displayed on portrait mobile layouts.

---

## Gameplay

- **Goal:** Be the last gorilla standing by accurately throwing bananas at your opponent.
- **Controls:**
  - **Drag the bomb:** Set the angle and velocity.
  - **Release:** Throw the banana.
  - **Info Panels:** See your angle and velocity.
  - **New Game:** Restart the game and regenerate the city.
- **Mobile:** Rotate to landscape for optimal play. Touch controls are fully supported.

---

## Technologies Used

- **Languages:** HTML5, CSS3, JavaScript (ES6)
- **Dev Tools:** VSCode, Chrome DevTools
- **Fonts:** Google Fonts (monospace for retro feel)
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
- Info panels are marked up as headings and paragraphs, but gameplay is not fully accessible for non-visual users.

---

## Known Issues

- Touch dragging may be less smooth on some mobile browsers.
- The bomb grab area may be slightly offset on certain device pixel ratios (subpixel rounding).
- Resizing during a throw may cause the bomb’s trajectory to jump.
- Minimal accessibility support for screen readers.

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

## Credits & Acknowledgements

- Inspired by the original [QBasic Gorillas](https://en.wikipedia.org/wiki/Gorillas_(video_game))
- UI and gameplay enhancements by [Your Name] and community contributors.
- [MDN Web Docs](https://developer.mozilla.org/) for JavaScript and Canvas APIs
- [Google Fonts](https://fonts.google.com/) for "Press Start 2P"
- Special thanks to open-source contributors and testers.

---

## Support

If you encounter bugs or have feature requests, please [open an issue](https://github.com/<your-username>/<repo-name>/issues).

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

**Enjoy the game! Feel free to submit issues, suggestions, or pull requests to help make Gorilla Game even better.**
