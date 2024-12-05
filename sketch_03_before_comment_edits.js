let mSerial;
let connectButton;
let circleBsize;
let circleAsize;

function receiveSerial() {
  let line = mSerial.readUntil("\n"); // Read from serial line until newline

  if (line) {
    print(line); // Debug: Print the received line to the console

    // Split the line into two sensor values
    let sensorValues = split(line, ','); 

    if (sensorValues.length === 2) {
      let sensorVal1 = int(sensorValues[0]); // First sensor value (A0), potentiometer
      let sensorVal2 = int(sensorValues[1]); // Second sensor value (A1), light

      // Map the sensor values to appropriate ranges
      circleAsize = map(sensorVal1, 0, 4095, 16, 120); // Map A0 value to background color
      circleBsize = map(sensorVal2, 0, 30, 8, 20); // Map A1 value to circle size (between 50 and 300)
    }
  }
}

// Function to connect to the serial port
function connectToSerial() {
  if (!mSerial.opened()) {
    mSerial.open(9600); // Open serial at 9600 baud rate
    connectButton.hide(); // Hide the connect button once connected
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize variables
  circleAsize = 0;
  circleBsize = 0;

  // Create a serial connection
  mSerial = createSerial(); // p5.js serial library

  // Create a button to connect to the serial port
  connectButton = createButton("Connect To Serial");
  connectButton.position(width / 2 - 120, height / 2);

  connectButton.style('font-family', 'Courier New'); // Change to a different font
  connectButton.style('font-size', '24px'); // Change font size
  connectButton.style('color', '#ffffff'); // Change font color (optional)
  connectButton.style('background-color', '#007bff'); // Change button background color (optional)
  connectButton.style('border', '2px solid #0056b3'); // Add a border to the button (optional)

  connectButton.mousePressed(connectToSerial); // Call connectToSerial() when the button is pressed
}

function draw() {
  background(236, 215, 0); // Set the background color based on sensorVal1

// Multiples of row 1a's
push();
blendMode(BLEND);

strokeWeight(0);
fill(0);

for (let y = 0; y < height; y += 56) {
  // row 1a (big circles)
  for (let x = 5; x < width; x += 56) {
    ellipse(x, y, circleBsize);
  }
}

// column of row 2a's
for (let y = 28; y < height; y += 56) {
  // row 2a (big circles)
  for (let x = 34; x < width; x += 56) {
    ellipse(x, y, circleBsize);
  }
}
pop();

push();

blendMode(EXCLUSION);

strokeWeight(0);
fill(255);

// Multiples of row 1b's
for (let y = 28; y < height; y += 56) {
  // row 1b (small circles)
  for (let x = 5; x < width; x += 56) {
    ellipse(x, y, circleAsize);
  }
}

// column of row 2b's
for (let y = 0; y < height; y += 56) {
  // row 2b (small circles)
  for (let x = 34; x < width; x += 56) {
    ellipse(x, y, circleAsize);
  }
}
pop();

  // If the serial port is open and there's data, process it
  if (mSerial.opened() && mSerial.availableBytes() > 0) {
    receiveSerial();
  }
}
