// // A sound file object
// let song;

// function preload() {
//   // Load a sound file
//   song = loadSound('assets/Damscray_DancingTiger.mp3');
// }

// function setup() {
//   createCanvas(710, 400);

//   // Loop the sound forever
//   // (well, at least until stop() is called)
//   song.loop();
// }

// function draw() {
//   background(200);

//   // Set the volume to a range between 0 and 1.0
//   let volume = map(mouseX, 0, width, 0, 1);
//   volume = constrain(volume, 0, 1);
//   song.amp(volume);

//   // Set the rate to a range between 0.1 and 4
//   // Changing the rate alters the pitch
//   let speed = map(mouseY, 0.1, height, 0, 2);
//   speed = constrain(speed, 0.01, 4);
//   song.rate(speed);

//   // Draw some circles to show what is going on
//   stroke(0);
//   fill(51, 100);
//   ellipse(mouseX, 100, 48, 48);
//   stroke(0);
//   fill(51, 100);
//   ellipse(100, mouseY, 48, 48);
// }

let song;

function preload() {
  // Load a sound file
  song = loadSound('joker.mp3');
}


let time = 0;
let points = []
let evo = 0;
let x = 0;
let y = 2;
let z = 0;
let mX = 0;
let mY = 0;

let osc, playing = false, freq, amp, firstClick = true;

function setup() {

  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  // cnv.mousePressed(playOscillator);

  colorMode(HSB)

  initConditions()
}

function mouseClicked() {
  if (firstClick) {
    // osc = new p5.Oscillator('sine');
    // osc.start()
    // osc.amp(0, 0);
    song.loop();
    firstClick = false;
  }

  if (!playing) {
    // osc.freq(freq, 0.1);
    // osc.amp(0.1, 0.5);
  } else {
    // osc.amp(0, 0.5);
    // osc.stop();
  }

  playing = !playing;

  // console.log(playing)
}

// function mouseReleased() {
//   // ramp amplitude to 0 over 0.5 seconds
//   osc.amp(0, 0.5);
//   playing = false;
// }

let scale = 10;

function initConditions() {
  if (windowWidth < 600) {
    scale = 3;
  }

  if (windowWidth < 1000) {
    scale = 5;
  }

  if (windowWidth < 1500) {
    scale = 6;
  }


  points = []
  time = 0;

  x = 0;
  y = 2;
  z = 0;

  mX = mouseX;
  mY = mouseY;
}


function attract(a, b, c, catchup) {
  if (!catchup) {
    evo++;
  }
  let dt = 0.017;
  let dx = (a * (y - x)) * dt;
  let dy = (x * (b - z) - y) * dt;
  let dz = (x * y - c * z) * dt;

  x += dx;
  y += dy;
  z += dz;
  time += dt;
  points.push({ x: x, y: y, z: z })

  if (points.length > 1000) {
    // points.shift()
  }
}

function display() {

  background(255)

  noFill()
  strokeWeight(2)

  rotateY(time / 2)

  push()
  let hu = 0;
  let check = 0;
  beginShape()
  for (let p = 0; p < points.length; p++) {
    check += 1;
    // stroke(hu, 255, 255)
    stroke(255 * p / points.length, 255, 255)

    vertex(points[p].x * scale, points[p].y * scale, points[p].z * scale)
    hu += 0.5;
    if (hu > 255) {
      hu = 0;
    }
    if (check == 2) {
      endShape()
      check = 0;
      beginShape()
      vertex(points[p].x * scale, points[p].y * scale, points[p].z * scale)
    }
  }
  stroke(255)
  strokeWeight(2)
  noStroke()
  fill(0)
  translate(x * scale, y * scale, z * scale)
  sphere(7)
  pop()
}

function bound(z) {
  return map(z, 0, windowWidth, 1, 11)
}



let a = 10;
let b = 28;
let c = 8 / 3;

function draw() {


  if (!firstClick) {
    let rate = constrain(map(x * y * z, 0, 8000, 0.8, 2), 0.8, 2)

    if (!isNaN(rate)) {
      console.log(rate)

      song.rate(rate);
    } else {
      song.rate(3);
    }

    if (mX != mouseX || mY != mouseY) {
      mX = mouseX;
      mY = mouseY;
      initConditions()


      a = bound(mX)
      b = 30;
      c = bound(mY) / bound(mX)

      // a = 10;
      // b = 28;
      // c = 8 / 3;



      for (let i = 0; i < evo; i++) {
        attract(a, b, c, true)
      }
    } else {
      attract(a, b, c, false)
    }

    display()

  }

  // points = []

  // for (let i = 0; i < time * 20; i++) {
  //   attract(a, b, c)
  // 



}