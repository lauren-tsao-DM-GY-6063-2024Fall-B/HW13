let mSerial;
let connectButton;
let circleBsize;
let circleAsize;

function receiveSerial() {
  let line = mSerial.readUntil("\n"); // read from serial line (println from Arduino) until the end of the line

  if (line) {
    print(line); // print above received line to javascript console

    // splitting the line into two sensor values
    let sensorValues = split(line, ','); // split line at ','

    if (sensorValues.length === 2) { // if there are exactly 2 values in the array after splitting..
      let sensorVal1 = int(sensorValues[0]); // .. convert 1st sensor value from A0 (potentiometer) to an integer
      let sensorVal2 = int(sensorValues[1]); // .. convert 2nd sensor value from A1 (LDR) to an integer

      // map the sensor values to appropriate ranges
      circleAsize = map(sensorVal1, 0, 4095, 16, 120); // map A0 values to circleA size values
      circleBsize = map(sensorVal2, 0, 30, 8, 20); // map A1 values to circleB size values
    }
  }
}

// function to connect to the serial port
// MAKE SURE TO CLOSE SERIAL MONITOR IN ARDUINO (only one serial monitor can be run in one time)
function connectToSerial() {
  if (!mSerial.opened()) {
    mSerial.open(9600); // make sure this is the same speed as the Serial.begin in the .ino file
    connectButton.hide(); // hide the connect button once connected
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // set up variables
  circleAsize = 0;
  circleBsize = 0;

  // create a serial connection
  mSerial = createSerial(); // from the p5.js serial library

  // create button to connect to the serial port
  connectButton = createButton("Click me to connect To Serial!");
  connectButton.position(width / 2 - 210, height / 2);

  // styling the button
  connectButton.style('font-family', 'Courier New'); // change font
  connectButton.style('font-size', '24px'); // change font size
  connectButton.style('color', '#ffffff'); // change font color
  connectButton.style('background-color', '#007bff'); // change button background color
  connectButton.style('border', '2px solid #0056b3'); // add border (i.e stroke) around button

  connectButton.mousePressed(connectToSerial); // when this button is pressed, it would execute connectToSerial() function
}

function draw() {
  background(236, 215, 0);


push();
blendMode(BLEND);

strokeWeight(0);
fill(0);

// multiples of row 1b's
for (let y = 0; y < height; y += 56) {
  // row 1b (small circles)
  for (let x = 5; x < width; x += 56) {
    ellipse(x, y, circleBsize);
  }
}

// column of row 2b's
for (let y = 28; y < height; y += 56) {
  // row 2b (small circles)
  for (let x = 34; x < width; x += 56) {
    ellipse(x, y, circleBsize);
  }
}
pop();


push();
blendMode(EXCLUSION);

strokeWeight(0);
fill(255);

// multiples of row 1a's
for (let y = 28; y < height; y += 56) {
  // row 1a (big circles)
  for (let x = 5; x < width; x += 56) {
    ellipse(x, y, circleAsize);
  }
}

// column of row 2a's
for (let y = 0; y < height; y += 56) {
  // row 2a (big circles)
  for (let x = 34; x < width; x += 56) {
    ellipse(x, y, circleAsize);
  }
}
pop();

  if (mSerial.opened() && mSerial.availableBytes() > 0) { // if the serial port is open and there's data..
    receiveSerial(); // .. process it
  }
}
