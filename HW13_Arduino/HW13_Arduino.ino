void setup() {
  Serial.begin(9600);
}

void loop() {
  // read sensor inputs
  int a0Val = analogRead(A0);
  int a1Val = analogRead(A1);

  // print the values of a0Val input and a1Val input in one line, seperated by a comma
  Serial.print(a0Val);
  Serial.print(",");
  Serial.println(a1Val);

  delay(100);
}

