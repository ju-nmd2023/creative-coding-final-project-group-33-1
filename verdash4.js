let gridSize = 50;
let columns, rows;
let lines = [];
let influenceRadius = 100; // magnet
let baseInfluence = 100;
let targetInfluence = 100;

let animating = false;
let animStartTime = 0;
let animDuration = 3000;
let holdDuration = 1000; // 1s hold

let synth; // Tone.js synth
let scale = ["C3", "D3", "E3", "G3", "A3"]; // notes
let audioStarted = false;



function setup() {
  createCanvas(800, 800);
  stroke(0);
  strokeWeight(3);
  noFill();

  // init synth with reverb
  let reverb = new Tone.Reverb({
    decay: 5,
    wet: 0.9
  }).toDestination();

  synth = new Tone.Synth().connect(reverb);


  columns = width / gridSize;
  rows = height / gridSize;

  // random line direction
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      lines.push({
        x: x * gridSize + gridSize / 2,
        y: y * gridSize + gridSize / 2,
        baseAngle: random(TWO_PI),
        facing: false // track state of sound
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
  for (let l of lines) {
    push();
    translate(l.x, l.y);

    let d = dist(mouseX, mouseY, l.x, l.y);
    let len = gridSize * 0.6;

    // detecting the cursor facing state change
    let nowFacing = d < influenceRadius;

    if (nowFacing && !l.facing) { // if started facing then play note
      playRandomNote();
    } else if (!nowFacing && l.facing) { // if stopped facing then play note
      playRandomNote();
    }

    l.facing = nowFacing; // update state

    if (nowFacing) { // color change between facing or not facing cursor
      let angleToMouse = atan2(mouseY - l.y, mouseX - l.x);
      rotate(angleToMouse);
      stroke(212, 175, 55);
    } else {
      stroke(0);
      rotate(l.baseAngle + sin(frameCount * 0.01 + l.x * 0.1 + l.y * 0.1) * 8);
    }

    line(-len / 2, 0, len / 2, 0);
    pop();
  }
}



// play a random pleasant note
function playRandomNote() {
  if (!audioStarted) return;
  let note = random(scale);
  synth.triggerAttackRelease(note, "8n");
}



// mouse click interaction
function mousePressed() {
  if (!audioStarted) { // start Tone.js audio
    Tone.start();
    audioStarted = true;
  }

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
