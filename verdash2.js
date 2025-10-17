let gridSize = 50;
let columns, rows;
let lines = [];
let influenceRadius = 100; //magnet



function setup() {
  createCanvas(800, 800);
  stroke(0);
  strokeWeight(3);
  noFill();

  columns = width / gridSize;
  rows = height / gridSize;

  // random line direction
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      lines.push({
        x: x * gridSize + gridSize / 2,
        y: y * gridSize + gridSize / 2,
        baseAngle: random(TWO_PI) // start with random orientation
      });
    }
  }
}



function draw() {
  background(255, 255, 255, 20);

  // erase animation inside influenceRadius
  noStroke();
  fill(255, 255, 255);
  ellipse(mouseX, mouseY, influenceRadius * 2); 

  // draw all lines
  stroke(0);
  for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    push();
    translate(l.x, l.y);

    let d = dist(mouseX, mouseY, l.x, l.y);
    let len = gridSize * 0.6;

    if (d < influenceRadius) {
      // face the cursor
      let angleToMouse = atan2(mouseY - l.y, mouseX - l.x);
      rotate(angleToMouse);
    } else {
      // normal rotating animation
      rotate(l.baseAngle + sin(frameCount * 0.01 + l.x * 0.1 + l.y * 0.1) * 8);
    }

    line(-len / 2, 0, len / 2, 0);
    pop();
  }
}
