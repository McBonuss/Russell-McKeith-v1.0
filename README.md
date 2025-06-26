# Gorilla Game

This is a modern browser-based remake of the classic "Gorillas" artillery game. Two gorillas stand atop city buildings and take turns throwing explosive bananas at each other, adjusting angle and velocity to account for gravity and obstacles. The last gorilla standing wins!

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [UX](#ux)
   1. [Project Goals](#project-goals)
   2. [User Stories](#user-stories)
   3. [Color Scheme](#color-scheme)
   4. [Typography](#typography)
   5. [Wireframes](#wireframes)
3. [Features](#features)
   1. [General](#general)
   2. [Game Window](#game-window)
   3. [Game Controls](#game-controls)
   4. [Mobile Support](#mobile-support)
   5. [Future Features](#future-features)
4. [Technologies Used](#technologies-used)
   1. [Languages Used](#languages-used)
   2. [Frameworks, Libraries and Programs Used](#frameworks-libraries-and-programs-used)
5. [Testing](#testing)
   1. [Manual Testing](#manual-testing)
   2. [Automated Testing](#automated-testing)
   3. [Known Issues](#known-issues)
6. [Deployment](#deployment)
7. [Credits](#credits)
8. [Acknowledgements](#acknowledgements)

---

## Project Overview

This project is a full-stack JavaScript remake of the classic Gorillas game, designed to be responsive and playable on both desktop and mobile browsers. The game features randomly generated city skylines, interactive aiming and throwing mechanics, and a floating card UI. The codebase is modular and well-documented for maintainability and future enhancements.

---

## UX

### Project Goals

- Deliver a fun, nostalgic, and accessible artillery game experience in the browser.
- Provide a responsive, visually appealing interface that works on all devices.
- Make controls intuitive for both mouse and touch users.
- Allow for easy replayability and clear win/loss feedback.

### User Stories

- As a player, I want to easily understand how to play and see feedback for my actions.
- As a player, I want to adjust the angle and velocity of my throws and see the effect in real time.
- As a player, I want the game to work on my phone and desktop.
- As a player, I want to be able to restart the game at any time.
- As a player, I want to see who won and have the option to play again.

### Color Scheme

- The game uses a dark background (`#1e1e1e`) for contrast.
- The city skyline is rendered in deep blues.
- UI elements use white and accent colors for clarity.

### Typography

- The main font is monospace for a retro, code-inspired feel.
- Headings and buttons use bold, clear type for readability.

### Wireframes

- The game window is centered in a floating card.
- Info panels for each player are positioned at the top corners.
- The bomb grab area overlays the gorilla's hand for intuitive interaction.
- On mobile, a rotate message overlays the game in portrait mode.

---

## Features

### General

- Responsive design: The game window scales to fit the browser/card.
- Floating card UI: The game is presented in a visually distinct card with rounded corners and shadow.
- Random city generation: Each game features a new skyline.
- Animated gorillas and bomb throws.
- Win/loss detection and celebration overlay.

### Game Window

- The canvas is dynamically sized to fit the `.game-container` card.
- All game elements (buildings, gorillas, bomb) scale with the window.
- The bomb grab area is always pinned to the active gorilla's hand.

### Game Controls

- Drag the bomb grab area to set angle and velocity.
- Release to throw.
- Info panels show current angle and velocity for each player.
- "New Game" button resets the game and city.

### Mobile Support

- On mobile devices in portrait mode, a message prompts the user to rotate their device horizontally.
- Touch events are supported for bomb dragging.

### Future Features

- Wind and weather effects.
- Sound effects and music.
- AI opponent.
- Score tracking and leaderboards.

---

## Technologies Used

### Languages Used

- HTML5
- CSS3
- JavaScript (ES6)

### Frameworks, Libraries and Programs Used

- [VSCode](https://code.visualstudio.com/) for development
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) for debugging and testing
- [Google Fonts](https://fonts.google.com/) for typography
- [GitHub](https://github.com/) for version control and deployment

---

## Testing

### Manual Testing

- **Responsiveness:** Tested on Chrome, Firefox, Edge, and Safari at various window sizes.
- **Mobile:** Tested on iPhone and Android devices. The rotate message appears in portrait mode and disappears in landscape.
- **Gameplay:** Verified that both players can aim and throw, that the bomb interacts with buildings and gorillas, and that the win condition triggers correctly.
- **UI:** Checked that info panels, overlays, and the bomb grab area are always visible and correctly positioned.
- **Edge Cases:** Resizing the window mid-game, rapid new game resets, and switching device orientation.

### Automated Testing

- No automated tests are currently implemented. All testing has been manual and exploratory.

### Known Issues

- On some mobile browsers, touch dragging may not be as smooth as mouse dragging.
- The bomb grab area may appear slightly offset on certain device pixel ratios; this is due to subpixel rounding and can be improved with further calibration.
- If the window is resized during a throw, the bomb's trajectory may visually jump due to rescaling.
- Accessibility for screen readers is minimal, as the game is primarily visual and interactive.

---

## Deployment

- The project is deployed via GitHub Pages.
- To deploy:
  1. Push the latest code to the `main` branch on GitHub.
  2. In repository settings, set GitHub Pages source to the `main` branch.
  3. The game will be available at `https://<your-username>.github.io/<repo-name>/`.

