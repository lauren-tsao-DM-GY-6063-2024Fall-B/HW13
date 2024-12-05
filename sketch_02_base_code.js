let mSerial;
let connectButton;
let cBackgroundColor;
let circleSize;

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
      cBackgroundColor = map(sensorVal1, 0, 4095, 0, 255); // Map A0 value to background color
      circleSize = map(sensorVal2, 0, 30, 100, 300); // Map A1 value to circle size (between 50 and 300)
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
  cBackgroundColor = 0;
  circleSize = 100;

  // Create a serial connection
  mSerial = createSerial(); // p5.js serial library

  // Create a button to connect to the serial port
  connectButton = createButton("Connect To Serial");
  connectButton.position(width / 2, height / 2);
  connectButton.mousePressed(connectToSerial); // Call connectToSerial() when the button is pressed
}

function draw() {
  background(cBackgroundColor); // Set the background color based on sensorVal1

  // Draw a circle with size controlled by sensorVal2
  ellipse(width / 2, height / 2, circleSize);

  // If the serial port is open and there's data, process it
  if (mSerial.opened() && mSerial.availableBytes() > 0) {
    receiveSerial();
  }
}
