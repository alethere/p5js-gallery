
let colorMode = 0;

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent(document.getElementById('canvas-container'));
  background(0);

  // Event listeners
  document.getElementById('mode-0').addEventListener('click', () => setColorMode(0));
  document.getElementById('mode-1').addEventListener('click', () => setColorMode(1));
  document.getElementById('mode-2').addEventListener('click', () => setColorMode(2));
  document.getElementById('mode-3').addEventListener('click', () => setColorMode(3));
  
  updateButtonStyles();
}


function windowResized() { resizeCanvas(windowWidth, windowHeight); }

function setColorMode(mode){
  colorMode = mode;
  updateButtonStyles();
}

function updateButtonStyles() {
  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById(`mode-${i}`);
    if (i === colorMode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }
}

function draw() {
  background(0);

  for(i = 0; i <= width; i += 10){
    let [r,g,b] = getRGB(i)
    
    let weight = getWeight(i)

    // strokeWeight(weight)
    // stroke(r,0,g);
    // line(i,0,i,height);
    fill(r,g,b)
    ellipse(i, mouseY/2, weight, height*2)
  }
}


function getWeight(x){
  let weight;

  switch(colorMode){
    case 0:
      weight = map(abs(x - mouseX),0,width/4,10,2)
      break;
    case 1:
      weight = map(sin(mouseX/width*Math.PI) - sin(x/(width*0.03) - mouseX/100) , -2, 2, 10, 2,true);
      break;
    case 2:
      weight = map(abs(x - mouseX),0,width/2,3,1) 
      break;
    case 3:
      distX = abs(mouseX - width/2)
      weight = map((distX)/(abs(x - width/2)*0.005),0, width/2,10,2, true)
      break;
  }

  return weight;
}

function getRGB(x){
  let r, g, b;

  switch(colorMode){
    case 0: // Mode 1: Original
      r = map(abs(x - mouseX), 0, width, 0, 255);
      g = map(abs(x - mouseY), 0, width, 255, 0);
      b = g - r;
      break;
    case 1: // Mode 2: Rainbow
      r = map(abs(x - mouseX), 0, width, 255, 0);
      g = map(sin(x * 0.01) + sin(mouseY * 0.01), -2, 2, 0, 255);
      b = map(abs(x - mouseY), 0, width, 0, 255);
      break;
    case 2: // Mode 3: X→R Y→B
      r = map(x, 0, width, 0, 255);
      g = 100;
      b = map(mouseY, 0, height, 0, 255);
      break;
    case 3: // Mode 4: X→G Y→R
      r = map(mouseY, 0, height, 0, 255);
      g = map(x, 0, width, 0, 255);
      b = 50;
      break;
  }

  return [r,g,b]
}