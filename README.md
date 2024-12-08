## Creative Coding (DM-GY 6063) - Programming: Week 13

### Description of the Arduino logic and circuit
- After going through our assignments, I found that HW03A would be a nice canvas to improve on using the Arduino.
- I used a potentiometer (pin A0) to control the size of the bigger circles (circleA), and a LDR (pin A1) for the size of the smaller circles (circleB).
- In p5.js, I applied the map() function so that the values received from the above Arduino components are directly proportional to the size of the circles. As the values increase and decrease, so do the size of the circles. When the values read 0, the circles return to their original sizes.
- I applied the Exclusion blending mode to 'circleA's so that when they overlap with 'circleB's, the overlapped areas turn black and white.

### Schematic
- Please click [here](https://drive.google.com/file/d/10ieMbInDyBM35ss2SUYxwHX9n6Bjt899/view?usp=sharing).

### Finite State Machine
- Please click [here](https://drive.google.com/file/d/1mAJnIPA9eqOFGp4AZO2v27zLJDNgTccV/view?usp=sharing).