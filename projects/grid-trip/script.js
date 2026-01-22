  var noiseValue = 255;
  var noiseScale = 0.009;

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent(document.body);

  describe('A calm ocean wave generated using Perlin noise.');


}
function windowResized() { resizeCanvas(windowWidth, windowHeight); }

function draw() {
  fill(0);
  noStroke();
  background(255);
  w = floor(width/100)*100;
  h = floor(height/100)*100;
  for (var x = 0; x <= width; x += 100) {
    for(var y = 0; y <= height; y += 100) {
      xpos = x + mouseX ;
      ypos = y + mouseY ;
      noStroke();
      fill(0);
      square(xpos , ypos , 50);
      square(xpos - w, ypos , 50);
      square(xpos - w, ypos - h , 50);
      square(xpos , ypos - h , 50);

    }
  }
}
