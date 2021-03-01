//lift left hand next to your head, palm facing head; lift right hand next to your head, palm facing head; put hands together in front of your face 🙏 click mouse for new colors


/*
 * @name Video Pixels
 * @frame 500, 500
 * @description Load a video, manipulate its pixels and draw to canvas.
 * To run this example locally, you will need a running 
 * <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.
 */

//let cards;
let cards;

// The video
let video;
// For displaying the label
let label = "waiting...";
// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/kj-HEG0Fw/';

//color 1
var r;
var g;
var b;
  
//color 2
var r2;
var g2;
var b2;

//starting and ending colors
var from;
var to;

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(500, 500);
  
  //cards = createVideo(['https://cdn.glitch.com/3bb6af75-2911-4cd9-9c41-9c8d14881cbf%2Fcards720.mp4?v=1614562800721']);
  //cards.loop();
  //cards.hide();
  //cards.volume(0)
  //noStroke();
  //fill(0);

  
  video = createCapture(VIDEO);
  video.hide();
  // STEP 2: Start classifying
  classifyVideo();
  
  //setting up colors for from
  r = random(255);
  g = random(255);
  b = random(255);
  
  //setting up colors for to
  r2 = random(255);
  g2 = random(255);
  b2 = random(255);
  
  //starting and ending colors
  from = color(r, g, b);
  to = color(r2, g2, b2);
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}


function draw() {
  //fill(255);
  //cards.loadPixels();
  
  var stepSize = 6;
  
  //in between colors, decimal is amount to interpolate from 0 to 1
  let inter = lerpColor(from, to, 0.5);
  
  //new code to connect teachable machine to dots
  if(label === 'left') {
     //const stepSize = round(constrain(mouseX / 18, 4, 32));
    //stepSize = 6;
    background(from);
    text('left', 10, 90);
    
  }
  else if (label === 'together') {
    //stepSize = 6;
    background(inter);
    text('together', 10, 90);
  }
  else if (label === 'right') {
    //stepSize = 6;
    background(to);
    text('right', 10, 90);
  }
  else {
    //stepSize = 6;
    background(230);
  }
  
  
  //const stepSize = round(constrain(mouseX / 8, 6, 32));
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      const i = y * width + x;
      //const darkness = (255 - cards.pixels[i * 4]) / 255;
      //const radius = stepSize * darkness;
      //ellipse(x, y, radius, radius);
    }
  }
}

function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  classifyVideo();
}

//change colors
function mouseClicked() {
  r = random(255);
  g = random(255);
  b = random(255);
  
  r2 = random(255);
  g2 = random(255);
  b2 = random(255);
  
  from = color(r, g, b);
  to = color(r2, g2, b2);
}
