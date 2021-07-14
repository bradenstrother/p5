// More Steering Behaviors! (Pursue)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/Q4MU7pkDYmQ
// https://thecodingtrain.com/learning/nature-of-code/5.3-flee-pursue-evade.html

// Flee: https://editor.p5js.org/codingtrain/sketches/v-VoQtETO
// Pursue: https://editor.p5js.org/codingtrain/sketches/Lx3PJMq4m
// Evade: https://editor.p5js.org/codingtrain/sketches/X3ph02Byx
// Pursue Bouncing Ball: https://editor.p5js.org/codingtrain/sketches/itlyDq3ZB
// Pursue Wander: https://editor.p5js.org/codingtrain/sketches/EEnmY04lt
// Pursue Slider Prediction: https://editor.p5js.org/codingtrain/sketches/l7MgPpTUB

let pursuer;
let target;

// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function setup() {
  createCanvas(800, 800);
  pursuer = new Vehicle(100, 100);
  target = new Target(200, 100);
}

function draw() {
  background(0);

  let steering = pursuer.pursue(target);
  pursuer.applyForce(steering);

  let d = p5.Vector.dist(pursuer.pos, target.pos);
  if (d < pursuer.r + target.r) {
    target = new Target(random(width), random(height));
    pursuer.pos.set(width / 2, height / 2);
  }

  pursuer.update();
  pursuer.show();

  target.edges();
  target.update();
  target.show();
}
