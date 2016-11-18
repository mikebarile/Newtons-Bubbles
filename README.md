# [Newton's Bubbles][link]
[link]: https://mikebarile.github.io/Newtons-Bubbles/

A browser based vanilla javascript game utilizing the Canvas library.

![Survival GameScreen](https://res.cloudinary.com/dsguwnfdw/image/upload/v1479496677/Screen_Shot_2016-11-18_at_11.17.36_AM_faeys7.png)

## Goal

The game's goal is to grow your bubble's size by eating smaller bubbles while avoiding larger ones. This can be tricky due to the strong gravitational fields exerted by the larger bubbles. The game is won when the user has eaten every other bubble on the screen. There are five difficulty levels that toggle the starting size of the other bubbles.

The user can use w-a-s-d or the arrow keys to move. In addition, the user can reset the game by pressing space and pause it by pressing mute. There are also pause and mute buttons located at the bottom left corner of the screen.

Every time the user moves, their bubble shrinks slightly and they emit a "pellet". Likewise, every time enemy bubbles bounce into one another, they emit "glitter" and their radius shrinks slightly. Glitter is emitted at the point of impact between two bubbles and its quantity is proportional to the size of the two bubbles and their velocities.

When the user absorbs a smaller bubble, the user's bubble grows proportional to the size of the absorbed bubble. In addition, the user bubble "absorbs" the color of the smaller bubble which causes its own color to change proportional to the size / color of the absorbed bubble. Upon absorption, the smaller bubble explodes and releases glitter proportional to its size.

## Implementation Details

I decided to create my own physics engine from scratch rather than leveraging pre-existing 2D physics engines. The two most interesting components of my physics engine are:
1) Elastic collisions
2) Gravitational forces

In addition, I leveraged parseInt and RGB values to allow the user's bubble to absorb other bubbles' color proportional to their relative sizes.

#### Elastic Collisions

Every time a bubble bounces off of a wall or another bubble, they interact with the foreign body in an "elastic collision". In physics, this means that the total energy of the two-object system remains constant after the collision. In practice, this tends to mean small objects get shot off while larger objects move more slowly and that the bubbles have a nice "bounce" effect. Wall bounce collisions were calculated using the following code (example is for the left and right sides of the screen):

```
  if (this.pos[0] - this.radius <= 0) {
    this.pos[0] = 0 + this.radius;
    this.vel[0] = this.vel[0] * -1;
  }
  else if (this.pos[0] + this.radius >= window.innerWidth) {
    this.pos[0] = window.innerWidth - this.radius;
    this.vel[0] = this.vel[0] * -1;
  }
```

The first line in each if statements accounts for bubbles that were moving so fast that they bounced "through" the screen. The second line flips the velocity.

The calculation for bubble interactions is much more complex because both objects are moving, have different sizes, and have complex interaction angles. Below is the code used to recompute the bubbles' velocities:

```
static collide(bub1, bub2) {
  // Calculate mass for each bubble assuming that bubble mass is proportional to square area
  let m1 = Math.PI * Math.pow((bub1.radius), 2);
  let m2 = Math.PI * Math.pow((bub2.radius), 2);

  // Calculate contact angle
  let dx = bub1.pos[0] - bub2.pos[0];
  let dy = bub1.pos[1] - bub2.pos[1];
  let angle = Math.atan2(dy, dx);

  // Calculate velocity magnitudes and directional vectors
  let mag1 = this.mag(bub1.vel);
  let mag2 = this.mag(bub2.vel);
  let d1 = Math.atan2(bub1.vel[1], bub1.vel[0]);
  let d2 = Math.atan2(bub2.vel[1], bub2.vel[0]);

  // Calculate new speeds based on magnitude, direction and the collision angle
  let newX1 = mag1*Math.cos(d1 - angle);
  let newY1 = mag1*Math.sin(d1 - angle);
  let newX2 = mag2*Math.cos(d2 - angle);
  let newY2 = mag2*Math.sin(d2 - angle);

  // Adjust speeds to account for relative masses
  let finalX1 = ((m1 - m2)*newX1 + (m2+m2)*newX2) / (m1+m2);
  let finalX2 = ((m1 + m1)*newX1 + (m2 - m1)*newX2) / (m1+m2);
  let finalY1 = newY1;
  let finalY2 = newY2;

  // Recompute final speeds based on adjustment
  let x1 = Math.cos(angle)*finalX1 + Math.cos(angle + Math.PI/2)*finalY1;
  let y1 = Math.sin(angle)*finalX1 + Math.sin(angle + Math.PI/2)*finalY1;
  let x2 = Math.cos(angle)*finalX2 + Math.cos(angle + Math.PI/2)*finalY2;
  let y2 = Math.sin(angle)*finalX2 + Math.sin(angle + Math.PI/2)*finalY2;

  //Send x and y velocities to bubbles' "bounce" methods
  bub1.bounce(x1, y1, bub2);
  bub2.bounce(x2, y2, bub1);
}
```

#### Gravitational Forces

Another component of my physics engine is gravitational forces. Every bubble (including the user's bubble) emits a gravitational force on every other object in the screen. This effect is amplified on glitter to create the "swirling" effect all over the screen. To calculate the gravitational forces, I used the classic Newtonian formula for gravity. See code below:

```
static calculateGravity(obj1, obj2) {
  //Calculate relative masses
  let m1 = Math.PI * Math.pow(obj1.radius, 2);
  let m2 = Math.PI * Math.pow(obj2.radius, 2);

  //Adjust formula for glitter
  if (obj1.glitter === true){
    m2 = m2 * 50;
  }

  //Determine relative positions vector
  let dx = obj2.pos[0] - obj1.pos[0];
  let dy = obj2.pos[1] - obj1.pos[1];
  let d = this.mag([dx, dy]);

  //Determine accelleration
  let a = G * m2 / (d * d);

  //Determine effect on velocity
  let vx = a * dx;
  let vy = a * dy;

  return [obj1.vel[0] + vx, obj1.vel[1] + vy];
}
}
```

#### Color Absorption

Whenever the user's bubble absorbs a smaller bubble, the user's bubble also absorbs the smaller bubbles color. The user bubble's color changes "towards" the color of the absorbed bubble proportional to their relative sizes. In practice, this causes the user's bubble to approach the color white by the end of every game (the bubble automatically fades to white upon victory). Below is the code I used to calculate to identify the RGB values of the user bubble and the interacting bubble:

```
var j = {};

j.red = parseInt(c.slice(1,3), 16);
j.green = parseInt(c.slice(3,5), 16);
j.blue = parseInt(c.slice(5,7), 16);

return j;
```

To calculate the mass-weighted difference in colors, I used the following code:

```
static weighColors(bubble1, bubble2, color1, color2) {
  //Note: color1 and color2 are each an RGB value; this code is run three times for red, green, and blue
  //Calculate relative masses
  let m1 = Math.PI * Math.pow(bubble1.radius,2);
  let m2 = Math.PI * Math.pow(bubble2.radius,2);

  //Calculate weighted average of RGB value
  let string = Math.abs(Math.floor((color1*m1 + color2*m2) / (m1 + m2))).toString(16);
  if (string.length === 1) {
    string = "0" + string;
  }
  return string;
}
```
