
let circles = [];
let circleColor = [];
const colors = [
        '#ffadad', '#ffd6a5', '#fdffb6', '#caffbf',
        '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'
    ];
let coli = 0;
function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent(document.body);
}

function draw() {
    background(220);

    // No stroke for shapes
    noStroke();
    let x = mouseX;
    x = map(x, 0, width, 0, 255);
    
    if(random(1) < 0.9){

       circles.push(createVector(mouseX,mouseY,1));

       circleColor.push(colors[coli]);
       coli ++;
       if(coli >= colors.length){
           coli = 0;
       }
    }

    for(let i = 0; i < circles.length; i++){
        fill(circleColor[i]);
        growth = min(10, 0.05*circles[i].z);
        circles[i].z += growth
        circle(circles[i].x, circles[i].y, circles[i].z);

        if(circles[i].z > width*3){
            circles.splice(i, 1);
            circleColor.splice(i, 1);
            i--;
        }
    }
}

