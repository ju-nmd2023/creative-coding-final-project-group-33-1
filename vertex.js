function setup() {
  createCanvas(800, 800);
  noFill();
}

const size = 80;
const layers = 8;

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  const variance = size / 1000;
  push();
  translate(x, y);
  rotate(sin(frameCount * 0.01 + x * 0.1 + y * 0.1) * 0.8); // rotation

  for (let i = 0; i < layers; i++) {
    if (Math.random() > 0.8) continue;
    const s = (size / layers) * i;
    const half = s / 2;
    beginShape();
    vertex(getRandomValue(-half, variance), getRandomValue(-half, variance));
    vertex(getRandomValue(half, variance), getRandomValue(-half, variance));
    vertex(getRandomValue(half, variance), getRandomValue(half, variance));
    vertex(getRandomValue(-half, variance), getRandomValue(half, variance));
    endShape(CLOSE);
  }
  pop();
}

function draw() {
  background(255, 255, 255, 5);
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }
}
