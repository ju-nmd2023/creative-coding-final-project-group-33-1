let gridSize = 50;
let columns, rows;
let lines = [];

function setup() {
  createCanvas(800, 800);
  stroke(0);
  strokeWeight(2);
  noFill();

  columns = width / gridSize;
  rows = height / gridSize;

  // random line direction
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      let orientation = random(['horizontal', 'vertical']);
      lines.push({
        x: x * gridSize + gridSize / 2,
        y: y * gridSize + gridSize / 2,
        orientation: orientation
      });
    }
  }
}

function draw() {
  background(255, 255, 255, 20);

  for (let i = 0; i < lines.length; i++) {
    let l = lines[i];
    push();
    translate(l.x, l.y);

    // rotation from vertex.js
    rotate(sin(frameCount * 0.01 + l.x * 0.1 + l.y * 0.1) * 8);

    // horizontal or vertical lines
    let len = gridSize * 0.6;
    if (l.orientation === 'horizontal') {
      line(-len / 2, 0, len / 2, 0);
    } else {
      line(0, -len / 2, 0, len / 2);
    }

    pop();
  }
}
