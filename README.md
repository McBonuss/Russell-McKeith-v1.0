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
9. [Recent Changes & Updates](#recent-changes--updates)
10. [Technologies Used](#technologies-used)
11. [Testing](#testing)
12. [Browser Compatibility](#browser-compatibility)
13. [Accessibility](#accessibility)
14. [Known Issues](#known-issues)
15. [Future Features](#future-features)
16. [Contributing](#contributing)
17. [Credits & Acknowledgements](#credits--acknowledgements)
18. [Support](#support)
19. [License](#license)

---

## Overview

**Gorilla Game** is a full-stack JavaScript remake of the beloved QBasic classic. Built for modern browsers with mobile support, it features a responsive UI, randomly generated skylines, and intuitive drag controls for aiming and throwing. The game is designed for easy replayability and a nostalgic yet fresh experience.

This project is written with maintainability and extensibility in mind, using modular JavaScript, semantic HTML, and modern CSS. The codebase is well-commented and structured for easy onboarding of new developers.

---

## Features

- **Responsive Design:** Scales gracefully between desktop and mobile devices.
- **Procedural City Generation:** Each match features a unique skyline.
- **Animated Gorillas:** Charming, expressive gorilla sprites with improved proportions.
- **Interactive Controls:** Drag to set angle and velocity, suitable for mouse and touch.
- **Win/Loss Detection:** Clear feedback and celebration overlays.
- **Replayability:** Reset and start new games with a single click.
- **Modern UI:** Floating card interface with concise info panels for each player.
- **Expandable Info Cards:** "History," "How to Play," and "About" sections are expandable/collapsible for a clean interface.
- **Mobile Support:** Landscape-first layout, with prompts for device rotation.
- **Static Visuals:** Stars and building windows remain static for a polished look.
- **Accessibility:** Keyboard navigation for expandable cards and skip links for screen readers.

---

## Demo

> [Play the game on GitHub Pages](https://github.com/McBonuss/p2Java-script-game)



---

## Screenshots



---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- (Optional) [Live Server extension for VSCode](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for hot-reloading

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/McBonuss/p2Java-script-game.git
   cd p2Java-script-game
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
   `https://github.com/McBonuss/p2Java-script-game`

---

## File Structure

```text
/
├── index.html
├── css/
│   └── style.css
├── assets/
│   └── js/
│       └── scripts.js
├── screenshots/
│   └── ... (game screenshots)
└── README.md
```

- **index.html**: Main HTML file, includes game UI and info sections.
- **css/style.css**: Main stylesheet for layout and game visuals.
- **assets/js/scripts.js**: All game logic and rendering.
- **screenshots/**: Example images for documentation.

---

## Main Components

- **Canvas Rendering:** All visuals (buildings, gorillas, bananas) are drawn using the `<canvas>` element and 2D context.
- **State Management:** The game uses a single `state` object to track current phase, bomb position, player turn, buildings, etc.
- **Event Handling:** Interaction is through mouse/touch events bound to the bomb grab area for aiming/throwing.
- **Responsive Design:** The canvas and UI elements resize and reposition based on the `.game-container`’s size.
- **Expandable Cards:** Info sections use accessible, animated expandable cards for a modern, clean UI.
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

## Recent Changes & Updates

This section highlights recent improvements and architectural changes for developers picking up the project:

### Visual & UI Enhancements

- **Expandable Cards:**  
  - "History of Gorillas," "How to Play," and "About This Example" are now expandable/collapsible cards with smooth unroll animation.
  - Cards are keyboard-accessible and visually consistent, using the same yellow as the main title for headings.
  - All cards have a fixed max width and are centered for a uniform look.

- **How to Play Section:**  
  - Added a concise, expandable "How to Play" card for new users.

- **Consistent Card/Text Styling:**  
  - All cards and their text (except headings) use the same font, color, and spacing for a professional, cohesive appearance.

### Game Visuals

- **Night Sky:**  
  - The background uses a static night sky gradient with a moon and non-flickering, static stars.

- **Buildings:**  
  - Each building has a unique, darker shade and a subtle 3D highlight.
  - Windows are generated once per building and remain static (no flicker).
  - Rooftop antennas are randomly added for visual variety.

- **Gorillas:**  
  - Gorillas now stand directly on the buildings (feet aligned with rooftops).
  - Body and face proportions have been improved for a less "chunky" look.
  - Head angle is reduced for a more upright appearance.
  - Only the correct arm is raised during aiming; both arms are raised when celebrating.

- **Bomb:**  
  - The bomb features a glowing fuse and animated spark.
  - The bomb grab area is now invisible (no garish red circle).

### Codebase & Architecture

- **Static Visual Elements:**  
  - Star and window positions/colors are generated once and reused, ensuring static visuals.
- **Debug Code Removed:**  
  - All debug drawing and sample-point code has been removed for production.
- **Accessibility:**  
  - Expandable cards are keyboard-accessible and use ARIA attributes.
  - Skip link added for screen readers.

### Developer Experience

- **Code is modular and well-commented.**
- **All UI and gameplay logic is separated for easy maintenance.**
- **CSS and HTML are organized for clarity and extensibility.**

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
- My girlfriend and my friends for putting up with me whilst writing this.

---

## Support

If you encounter bugs or have feature requests, please [open an issue](https://github.com/McBonuss/p2Java-script-game/issues).

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

**Enjoy the game! Feel free to submit issues, suggestions, or pull requests to help make Gorilla Game even better.**
