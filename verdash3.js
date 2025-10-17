let gridSize = 50;
let columns, rows;
let lines = [];
let influenceRadius = 100; // magnet
let baseInfluence = 100;
let targetInfluence = 100;

let animating = false;
let animStartTime = 0;
let animDuration = 1000;
let holdDuration = 1000; // 1s hold



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
        baseAngle: random(TWO_PI)
      });
    }
  }
}



function draw() {
  // animation of influenceRadius
  if (animating) {
    updateInfluenceAnimation();
  }

  background(255, 255, 255, 20);

  // erase animation inside influenceRadius
  noStroke();
  fill(255);
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
      // normal rotation
      rotate(l.baseAngle + sin(frameCount * 0.01 + l.x * 0.1 + l.y * 0.1) * 8);
    }

    line(-len / 2, 0, len / 2, 0);
    pop();
  }
}



// mouse click interaction
function mousePressed() {
  if (!animating) {
    animating = true;
    animStartTime = millis();
    baseInfluence = influenceRadius;
    targetInfluence = dist(0, 0, width, height); // cover screen
  }
}



// animation phases
function updateInfluenceAnimation() {
  let elapsed = millis() - animStartTime;

  if (elapsed < animDuration) {
    // Phase 1: expand
    let t = elapsed / animDuration;
    influenceRadius = lerp(baseInfluence, targetInfluence, easeInOutCubic(t));
  } else if (elapsed < animDuration + holdDuration) {
    // Phase 2: hold
    influenceRadius = targetInfluence;
  } else if (elapsed < animDuration * 2 + holdDuration) {
    // Phase 3: come back
    let t = (elapsed - animDuration - holdDuration) / animDuration;
    influenceRadius = lerp(targetInfluence, baseInfluence, easeInOutCubic(t));
  } else {
    // end animation
    influenceRadius = baseInfluence;
    animating = false;
  }
}



// smoother transition between phases
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2;
}
