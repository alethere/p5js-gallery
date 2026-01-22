let balls = [];
function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent(document.body);
  for (let i = 0; i < 24; i++) {
    balls.push({ x: random(width), y: random(height), r: random(8, 28), vx: random(-3, 3), vy: random(-3, 3), hue: random(360) });
  }
  colorMode(HSL, 360, 100, 100, 1);
  noStroke();
}
function windowResized() { resizeCanvas(windowWidth, windowHeight); }
function draw() {
  background(230, 30, 6);
  for (const b of balls) {
    b.x += b.vx; b.y += b.vy;
    if (b.x < b.r || b.x > width - b.r) b.vx *= -1;
    if (b.y < b.r || b.y > height - b.r) b.vy *= -1;
    fill((b.hue + frameCount) % 360, 80, 60, 0.85);
    circle(b.x, b.y, b.r * 2);
  }
}