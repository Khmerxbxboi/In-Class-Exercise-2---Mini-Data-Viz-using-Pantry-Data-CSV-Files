// Khmer Food Radar — Bullimalinna Sot
let table;
let foods = [];
const metrics = ["Calories", "Sugar", "Carbs", "Sodium", "Protein"];
const mins = {};
const maxs = {};
let idx = 0;
let clickable = null;
const CSV_URL = "food.csv";

function preload() {
  table = loadTable(CSV_URL, "csv", "header");
}

function setup() {
  const c = createCanvas(min(windowWidth * 0.95, 700), 520);
  c.parent("p5-holder");
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textFont("Inter");
  loadFoods();
}

function loadFoods() {
  if (!table) return;
  for (let r = 0; r < table.getRowCount(); r++) {
    const name = table.getString(r, "Food");
    const row = { name };
    metrics.forEach(m => {
      const v = parseFloat(table.getString(r, m));
      row[m] = isNaN(v) ? 0 : v;
    });
    foods.push(row);
  }
  metrics.forEach(m => {
    const vals = foods.map(f => f[m]).filter(Number.isFinite);
    mins[m] = Math.min(...vals);
    maxs[m] = Math.max(...vals);
  });
}

function draw() {
  background(15, 30, 15);
  fill(234, 241, 225);
  if (foods.length === 0) {
    textSize(16);
    text("No data loaded. Check food.csv headers.", width / 2, height / 2);
    return;
  }

  const f = foods[idx % foods.length];
  const foodName = f.name;
  const googleURL = `https://www.google.com/search?q=${encodeURIComponent(foodName)}+Cambodian+food`;

  // Title
  textSize(22);
  fill(181, 211, 75);
  text(foodName, width / 2, 50);
  clickable = {
    x1: width / 2 - textWidth(foodName) / 2,
    x2: width / 2 + textWidth(foodName) / 2,
    y1: 30,
    y2: 70,
    url: googleURL
  };

  // Radar chart
  push();
  translate(width / 2, height / 2 + 20);
  stroke(137, 185, 123, 140);
  noFill();
  circle(0, 0, 280);

  const step = 360 / metrics.length;
  const pts = [];

  for (let i = 0; i < metrics.length; i++) {
    const m = metrics[i];
    const v = f[m];
    const r = map(v, mins[m], maxs[m], 35, 130);
    const a = -90 + i * step;
    stroke(137, 185, 123, 180);
    line(0, 0, r * cos(a), r * sin(a));
    noStroke();
    fill(181, 211, 75, 200);
    circle(r * cos(a), r * sin(a), 12);
    pts.push({ x: r * cos(a), y: r * sin(a) });
  }

  noFill();
  stroke(79, 123, 86, 180);
  beginShape();
  pts.forEach(p => vertex(p.x, p.y));
  endShape(CLOSE);

  fill(79, 123, 86, 220);
  noStroke();
  circle(0, 0, 20);

  fill(220);
  textSize(12);
  for (let i = 0; i < metrics.length; i++) {
    const a = -90 + i * step;
    text(metrics[i], 165 * cos(a), 165 * sin(a));
  }
  pop();

  // Instructions
  textAlign(CENTER, CENTER);
  textSize(12);
  fill(234, 241, 225, 210);
  text("← prev • → next • click name for info", width / 2, height - 25);
}

function mousePressed() {
  if (!clickable) return;
  if (mouseX > clickable.x1 && mouseX < clickable.x2 && mouseY > clickable.y1 && mouseY < clickable.y2) {
    window.open(clickable.url, "_blank");
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) idx = (idx - 1 + foods.length) % foods.length;
  else if (keyCode === RIGHT_ARROW) idx = (idx + 1) % foods.length;
}

function windowResized() {
  resizeCanvas(min(windowWidth * 0.95, 700), 520);
}
