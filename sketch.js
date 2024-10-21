//
//
// Instructions: Read the code until the comments tell you that you can stop.
//
// 
//

/*
- You have to rewrite the implementation of the getUpdatedHeadHeading() function.
- Angles are in radians
*/

let headHeading; // an angle in radians that denotes the rotation of the head
let mousePosition; // a P5.Vector object (will be initialized below). Position is relative to center of canvas.
const fovRadius = 150; // field-of-view radius
const fovAngle = 1; // field-of-view angle. In radians (but PI not known at this point in the code)

// The function that you need to correct
function getUpdatedHeadHeading() {
  
  let mouseDir = mousePosition.copy().normalize(); 

  let headDir = createVector(cos(headHeading), sin(headHeading));
 
  let dotProduct = mouseDir.dot(headDir);

  let angleToMouse = acos(dotProduct); 
 
  if (mousePosition.mag() < fovRadius && angleToMouse < fovAngle / 2) {
    // Update head direction to face the mouse
    return mousePosition.heading(); // Return new heading towards the mouse
  }

  return headHeading; // Keep current heading if not within FOV
}


// The following function runs whenever you click the mouse button. This may help in debugging,
// for instance by using console.log().
function onMousePressDebug() {
  // console.log("Debug message");
}

//
//
// Don't make changes below this line (doing so may break the code that we use for automated assessment)
// There is no need to look at the remaining code (but it is certainly allowed)
//
//


const canvasSize = 400;
let setupDone = false; // Will be used in the Canvas/Codegrade assessment code to wait for the sketch to be initialized and running


function setup() {
  let cnv = createCanvas(canvasSize, canvasSize);
  cnv.parent("sketchparent"); // Connect canvas to an existing html element
  ellipseMode(RADIUS);
  angleMode(RADIANS);
  colorMode(RGB, 255, 255, 255, 1); // Set RGB values to range [0,255] and alpha to [0,1]
  cnv.mousePressed(onMousePressDebug);

  mousePosition = createVector(mouseX - canvasSize / 2, mouseY - canvasSize / 2);
  headHeading = 0;

  setupDone = true;
}

function draw() {
  clear();
  background(222, 216, 189, 1);
  translate(canvasSize / 2, canvasSize / 2); // Move the origin to the center of the sketch

  drawAxes2D(canvasSize / 2); // draw axes of length 50, defined below
  drawHelpLines(canvasSize / 2, 50); // draw helplines, spaced at 50 units, defined below

  mousePosition.set(mouseX - canvasSize / 2, mouseY - canvasSize / 2);

  headHeading = getUpdatedHeadHeading();

  rotate(headHeading);
  drawFOV(); // defined below
  drawHead(); // defined below
}

function drawHead() {
  push(); // preserve the state of the coordinate system outside this function
  scale(4);
  fill(0, 0, 0, 1);
  arc(0, 0, 10, 10, 1 * PI / 5, -PI / 5, OPEN);
  circle(0, 9, 3);
  circle(0, -9, 3);
  fill(255, 255, 255, 1);
  noStroke();
  circle(4, 4, 2);
  circle(4, -4, 2);
  stroke(255, 255, 255, 1);
  strokeWeight(1.5);
  noFill();
  arc(4, 4, 4, 4, PI - 0.7, PI + 0.7,)
  arc(4, -4, 4, 4, PI - 0.7, PI + 0.7,)
  line(-6, 4, -3, 4);
  pop(); // preserve the state of the coordinate system outside this function
}

function drawFOV() {
  push();
  fill(0, 0, 255, 0.1);
  arc(0, 0, fovRadius, fovRadius, -fovAngle / 2, +fovAngle / 2, PIE);
  pop();
}

function drawAxes2D(B) {
  push();
  // x-axis
  strokeWeight(2);
  stroke(0, 0, 0, 1);
  line(-B, 0, 0, 0);
  strokeWeight(3);
  stroke(255, 0, 0, 1);
  line(0, 0, B, 0);

  // y-axis
  strokeWeight(2);
  stroke(0, 0, 0, 0.5);
  line(0, -B, 0, 0);
  strokeWeight(3);
  stroke(0, 255, 0, 1);
  line(0, 0, 0, B);
  pop();
}

function drawHelpLines(B, delta) {
  push();
  strokeWeight(0.5);
  stroke(0, 0, 0, 0.2);
  for (let x = -B; x <= B; x = x + delta) {
    line(x, -B, x, B);
  }
  for (let z = -B; z <= B; z = z + delta) {
    line(-B, z, B, z);
  }
  pop();
}