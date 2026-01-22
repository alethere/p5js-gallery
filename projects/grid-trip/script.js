var xmov = 0;
var ymov = 0;
let cols = [];
var rate = 0.01;

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent(document.body);

  describe('A calm ocean wave generated using Perlin noise.');
  w = floor(width/100)*100;
  h = floor(height/100)*100;
  
  for(i = 0; i <= w*2*h*2; i += 1){
    if(random(1) > rate){
      cols.push([0,0,0]);
    } else {
      cols.push([180,40,40]);
    }
  }

}
function windowResized() { resizeCanvas(windowWidth, windowHeight); }

function draw() {
  noStroke();
  background(255);

  for (var x = 0; x <= width; x += 100) {
    for(var y = 0; y <= height; y += 100) {
      xpos = x + xmov ;
      ypos = y + ymov ;


      n = y * w + x
      wplus = [0,-1,-1,0,+1,+1,0,-1,+1];
      hplus = [0,0,-1,-1,0,+1,+1,+1,-1];
      fill(cols[n]);
      
      for(var i = 0; i < wplus.length; i++){
        square(xpos + wplus[i]*w , ypos + hplus[i]*h , 50);
      }

    }
  }
}

mousePressed = function(){
  //xshift = xmov - mouseX;
  xshift = xmov % w - mouseX;
  yshift = ymov % h - mouseY;
  //yshift = ymov - mouseY;

}

doubleClicked = function(){
  cols = [];
  for(i = 0; i <= w*2*h*2; i += 1){
    if(random(1) > rate){
      cols.push([0,0,0]);
    } else {
      cols.push([180,40,40]);
    }
  }
}


mouseDragged = function(){
  xmov =  mouseX + xshift;
  ymov =  mouseY + yshift;
  if(xmov > w || xmov < -w){
    xmov = 0
      xshift = xmov % w - mouseX;

  }
  if(ymov > h || ymov < -h){
    ymov = 0
      yshift = ymov % h - mouseY;
  }
}
