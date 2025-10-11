let bulletHoles = [];



function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noStroke();
}



function draw() {
  background(255);

  for (let hole of bulletHoles) {
    hole.update();
    hole.display();
  }
}



function mousePressed() {
  bulletHoles.push(new BulletHole(mouseX, mouseY));
}



class BulletHole {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(15, 25);
    this.drips = [];
  }

  update() {
    if (random() < 0.1) {
      this.drips.push(new BloodDrip(this.x, this.y + this.size / 2));
    }

    for (let d of this.drips) {
      d.update();
    }

    this.drips = this.drips.filter(d => !d.isOffScreen());
  }

  display() {
    fill(0);
    ellipse(this.x, this.y, this.size, this.size);

    for (let d of this.drips) {
      d.display();
    }
  }
}



class BloodDrip {
  constructor(x, y) {
    this.x = x + random(-3, 3);
    this.y = y;
    this.len = random(3, 10);
    this.speed = random(3, 7);
    this.thickness = random(1, 4);
    this.alpha = 255;
  }

  update() {
    this.y += this.speed;
    this.alpha *= 0.98;
  }

  display() {
    fill(150, 0, 0, this.alpha);
    rect(this.x - this.thickness / 2, this.y, this.thickness, this.len);
  }

  isOffScreen() {
    return this.y > height;
  }
}
