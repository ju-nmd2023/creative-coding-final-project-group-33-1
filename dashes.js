let gridSize = 25;
let columns, rows;
let signs = ['|', '-', ' '];
let lastSign = ' ';


function setup() {

  createCanvas(800, 800);
  background(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  noLoop();

  columns = width / gridSize;
  rows = height / gridSize;

}

function draw() {
  for (let y = 0; y < rows; y++) {
    
    for (let x = 0; x < columns; x++) {
      let s = pickSign(lastSign);
      text(s, x * gridSize + gridSize/2, y * gridSize + gridSize/2);
      lastSign = s;
    }

  }
}

function pickSign(prev) {
  return random(signs);
}