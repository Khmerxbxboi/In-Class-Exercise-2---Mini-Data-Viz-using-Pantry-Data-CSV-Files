let x = 200;
let y = 300;
let spaceship;

let bgFiles = ["background_001.png", "background_002.png"];
let bgs = [];
let currentBg = 0;
let nextBg = 0;
let fading = false;
let fadeAmt = 0; 


function preload() {
  // Load backgrounds
  for (let i = 0; i < bgFiles.length; i++) {
    bgs[i] = loadImage(bgFiles[i]);
  }
 
  spaceship = loadImage("001.jpeg"); // drawing spaceship with GIF
}

function setup() {
  createCanvas(1000, 600);
  imageMode(CORNER);
}

function draw() {
  if (fading) {
    fadeAmt += 0.02; // speed
    if (fadeAmt >= 1) {
      fadeAmt = 0;
      fading = false;
      currentBg = nextBg;
    }
  }


  imageMode(CORNER);
  if (fading) {
    tint(255, 255); 
    image(bgs[currentBg], 0, 0, width, height);

    tint(255, map(fadeAmt, 0, 1, 0, 255)); 
    image(bgs[nextBg], 0, 0, width, height);

    noTint();
  } else {
    image(bgs[currentBg], 0, 0, width, height);
  }

 
  imageMode(CENTER);
  image(spaceship, x, y, 100, 80);


  if (keyIsDown(65)) { // 'A'
    y = max(40, y - 4);
  }
  if (keyIsDown(90)) { // 'Z'
    y = min(height - 40, y + 4);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    nextBg = (currentBg - 1 + bgs.length) % bgs.length;
    fading = true;
    fadeAmt = 0;
  }
  if (keyCode === RIGHT_ARROW) {
    nextBg = (currentBg + 1) % bgs.length;
    fading = true;
    fadeAmt = 0;
  }
}
