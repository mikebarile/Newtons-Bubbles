## Darwin's Colorful Bubbles

### Background

Darwin's Colorful Bubbles is a new take on the classic "bigger bubble eats smaller bubble" flash game that's proliferated all over the internet. The classic game's rules are simple: eat smaller bubbles or be eaten. However, Darwin's Colorful Bubbles throws in a few twists:

1) Every bubble is assigned a color
2) When a bubble absorbs another bubble, it also absorbs that bubble's color. This changes the larger bubble's color proportional to the size of the smaller bubble.
3) At the end of every thirty seconds, the player's bubble must match the color displayed at the top of the screen or they will be **selected out**.

### Functionality & MVP  

In its first iteration, players will be able to:

- [ ] Float a bubble around a square game board
- [ ] Absorb other bubbles make their bubble larger and changing its pigment
- [ ] Be absorbed by other bubbles (thus losing the game)
- [ ] A goal color with a "selection" timer

In addition, this project will include:

- [ ] An "About" modal describing the background and rules of the game
- [ ] A production Readme

### Wireframes

The game will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn,
and the About modal.  Game controls will include directional movement keys and a pause button. There will also be a clickable mute button and a clickable "about" that opens a modal explaining the game's rules and controls.

![wireframes](https://drive.google.com/open?id=0B5y0fyPv51Nud1RMSm9SVDVUUEE)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`board.js`: this script will handle the logic for creating and updating the necessary `Easel.js` elements and rendering them to the DOM.

`bubble.js`: this script will include the constructor and update functions for "Bubble" objects. Each bubble with have color, size, location, movement, and aliveOrDead properties.

`color_target.js`: this script will control the "color target" at the top of the screen and the game logic for a "selection" event.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element

**Day 2**: Dedicate this day to learning the `Easel.js` API.  First, build out the `Bubble` object to connect to the `Board` object.  Then, use `board.js` to create and render at least the board, ideally with floating bubbles. Goals for the day:

- Complete the `bubble.js` module (constructor, update functions)
- Render the board to the `Canvas` using `Easel.js`
- Allow bubbles to pop one another

**Day 3**: Build out the bubble absorption logic to include pigment changing and size changing. Add the "target color" to the top and create a condition  Goals for the day:

- Bubbles now absorb the size and color of smaller bubbles
- Top of screen includes a "color target" with a timer; if timer expires and bubble color hasn't changed player loses


**Day 4**: Style the frontend, making it polished and professional.  Goals for the day:

- Add the "about" modal
- Spruce up the frontend appearance and get everything looking great
- Work on bonus features (time permitting)


### Bonus features

There are loads of features I'd like to add to the game.  Some anticipated updates are:

- [ ] Assign points for every bubble absorption with a high score backend
- [ ] Add music that changes based on the timer
- [ ] Add multiple levels to the game; when the bubble gets large enough, it enters a new stage
