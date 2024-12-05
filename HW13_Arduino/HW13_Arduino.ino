void setup() {
  Serial.begin(9600);
}

void loop() {
  int a0Val = analogRead(A0);  // Read sensor A0
  int a1Val = analogRead(A1);  // Read sensor A1

  Serial.print(a0Val);         // Send A0 value
  Serial.print(",");           // Separate the values by a comma
  Serial.println(a1Val);       // Send A1 value and add newline

  delay(100);                  // Small delay
}

