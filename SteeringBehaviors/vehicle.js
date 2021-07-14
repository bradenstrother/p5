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

class Vehicle {
    constructor(x, y) {
      this.pos = createVector(x, y);
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.maxSpeed = 5;
      this.maxForce = 0.1;
      this.r = 1;
    }
  
    evade(vehicle) {
      let pursuit = this.pursue(vehicle);
      pursuit.mult(-1);
      return pursuit;
    }
  
    pursue(vehicle) {
      // Use the Law of Sines (https://en.wikipedia.org/wiki/Law_of_sines)
      // to predict the right collision point

      // Ratio between the edges of the triangles
      const speed_ratio = vehicle.vel.mag() / this.maxSpeed;                                // Normalize Value
      // Taking into account the angle between the vehicles persuer and the targets position
      const target_angle = vehicle.vel.angleBetween(p5.Vector.sub(this.pos, vehicle.pos));  // Angle of approach
      // Distance of the persuer to the target in relation to the speed
      const my_angle = asin(sin(target_angle) * speed_ratio);                               // Distance to target angle
      const dist = this.pos.dist(vehicle.pos);                                              // Normalize distance
      // Prediction coordinate as a vector angle
      const prediction = dist * sin(my_angle) / sin(PI - my_angle - target_angle);          // Prediction Angle
      const target = vehicle.vel.copy().setMag(prediction).add(vehicle.pos);                // Sets persuer to predicted angle
      
      drawArrow(vehicle.pos, p5.Vector.mult(vehicle.vel, 20), 'red');
      drawArrow(this.pos, p5.Vector.sub(target, this.pos), 'green');
      
      fill(0, 255, 0);
      circle(target.x, target.y, 8);
      return this.seek(target);
    }
  
    flee(target) {
      return this.seek(target).mult(-1);
    }
  
    seek(target) {
      let force = p5.Vector.sub(target, this.pos);
      force.setMag(this.maxSpeed);
      force.sub(this.vel);
      force.limit(this.maxForce);
      return force;
    }
  
    applyForce(force) {
      this.acc.add(force);
    }
  
    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.set(0, 0);
    }
  
    show() {
      stroke(255);
      strokeWeight(2);
      fill(255);
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
      pop();
    }
  
    edges() {
      if (this.pos.x > width + this.r) {
        this.pos.x = -this.r;
      } else if (this.pos.x < -this.r) {
        this.pos.x = width + this.r;
      }
      if (this.pos.y > height + this.r) {
        this.pos.y = -this.r;
      } else if (this.pos.y < -this.r) {
        this.pos.y = height + this.r;
      }
    }
  }
  
  class Target extends Vehicle {
    constructor(x, y) {
      super(x, y);
      this.vel = p5.Vector.random2D();
      this.vel.mult(4);
    }
  
    show() {
      stroke(255);
      strokeWeight(2);
      fill("#F063A4");
      push();
      translate(this.pos.x, this.pos.y);
      circle(0, 0, this.r * 2);
      pop();
    }
  }
  