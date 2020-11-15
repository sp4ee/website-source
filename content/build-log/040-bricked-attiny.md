---
draft: false
layout: single
description: Such camera angle, many gradient, so gorgeous.
title: My first ATTiny! And I just bricked it.
slug: bricked-attiny
publishdate: 2020-10-28
---

After I got the [brushless motor prototype](/build-log/working-brushless-motor-prototype/) working I needed a short break from 3D stuff like laser-cutting and gluing and winding coils, so I chose to give the ATTiny microcontroller a spin. Here it is sitting on its "Hello, world!" breadboard, accompanied by its big brother, the Arduino Nano that is used as an ad-hoc programmer.

![ATTiny45 and Arduino Nano](/images/040-attiny-breadboard.jpg#narrow)

<!--more-->

I fell in love with the ATTiny because of its simplicity. Yes, the "classic" microcontrollers like the various Arduinos or the ESP32 are also impressively small and accessible. But they still come with a breakout board with two dozen or more pins, a USB socket, with the ESPs even WiFi and Bluetooth... It's a lot. In contrast, with the ATTiny45 or ATTiny85:

- You have a single chip with 4 pins on both sides, and that's it. You're good to go.

- You have a very forgiving supply voltage range of 2.7&#8239;V to 5.5&#8239;V, or down to a minimum of 1.8&#8239;V with other variants like the ATTiny404 (more on that later).

- You need very little power: between 8&#8239;mA for 8&#8239;MHz at 5&#8239;V, down to 0.7&#8239;mA for 1&#8239;MHz at 3&#8239;V. And this goes down to _ridiculously_ little power in sleep mode, measured in single-digit μA. This, together with the generous voltage range, is exactly what I need in a solar-cell-powered setting.

- Writing software for these chips is also a different experience altogether. Your limits are something like  512 bytes to 4 KB of Flash for your code and 64 to 512 bytes of RAM. This is getting exciting!

- They have an EEPROM so I can store the "lifetime revolutions" count persistently before the chip shuts down each night. These EEPROMs last for about 100 thousand write cycles, which means that even if I write the value twice every day, I have over 100 years of expected lifetime. I can live with that.

### Programming an ATTiny

There are really lots of tutorials and examples out there, so I won't bore your with details. You write and compile your code in [PlatformIO](https://platformio.org/), but to upload, you need an extra device (the programmer) that has a USB connection. You can buy dedicated gadgets for this, but it makes a lot more sense to use an Arduino. So that setup means your PC talks to the Arduino, which is easy because you can plug the Arduino directly into a USB port. The Arduino, in turn, talks to the ATTiny chip over 4 wires, plus supplies it with power over 2 additional wires. This is documented in tons of tutorials, like this [Instructable](https://www.instructables.com/Arduino-ISP-to-ATTiny85/) or this German [article](https://www.heise.de/ct/artikel/Erste-Schritte-mit-den-Mikrocontrollern-ATtiny84-und-85-4399393.html).

There are only a few things worth noting:

- As an ATTiny programmer, the Arduino Nano itself must be programmed first. For this step it's easiest to go through the [Arduino IDE](https://www.arduino.cc/en/software), which contains the sketch as one of the pre-installed examples. Once you've uploaded the sketch, you can forget about the Arduino IDE again.

- The 10&#8239;μF capacitor between the Arduino's GND and RST pins really got me. I thought it worked like the capacitor you use with the ESP32 in that it allows you to upload a new sketch without having to press Reset. On the contrary, if it's there, your sketch won't upload -- a fact that caused me an hour's worth of frustration before I RTFM'ed.

- The breadboard you see on the photo is a combination of two things. It's an ATTiny programmer for uploading new code, and it's a testbed to see how that code executes. I plugged the chip into a socket, not directly into the breadboard, to spare the pins. I can put the socket where it is in the picture for "run mode," or I can move it right next to the Arduino for "programming mode."

- What you see on the breadboard is of course the "Hello, world!" of microcontrollers: an LED connected to an output pin with a current limiting resistor. The program blinks the LED. Magic ensues.

### Messing up the clock

Once I figured out the capacitor trick with the Arduino, writing and uploading the first little program for the ATTiny was easy. There's one very funny detail that the German article correctly points out at the end: the Arduino code library makes an assumption about the microcontroller's CPU frequency. But by default the ATTiny runs at 1&#8239;MHz instead of the library's assumption of 8&#8239;MHz, so the `delay` in the code below takes 8 times as long.

```C++
#include <Arduino.h>

const int led = 1;
const int sleep = 100;

// the setup routine runs once when you press reset:
void setup()
{
    // initialize the digital pin as an output.
    pinMode(led, OUTPUT);
}

// the loop routine runs over and over again forever
void loop()
{
    digitalWrite(led, HIGH); // turn the LED on (HIGH is the voltage level)
    delay(sleep);            // wait for a second
    digitalWrite(led, LOW);  // turn the LED off by making the voltage LOW
    delay(sleep);            // wait for a second
}
```

To fix this, you need to add the `board_build.f_cpu` key to the `platformio.ini` file:

```INI
[env:attiny45]
platform = atmelavr
board = attiny45
framework = arduino
board_build.f_cpu = 1000000L

upload_protocol = stk500v1
upload_flags =
  -P$UPLOAD_PORT
  -b$UPLOAD_SPEED
upload_speed = 19200
upload_port = COM5
```

So far so good! But now I tasted blood and realized that it's possible to _programmatically_ change the ATTiny's CPU clock -- and why wouldn't you do that if you can? It's been [documented here](https://www.insidegadgets.com/2011/05/16/change-attiny85-clock-speed-on-the-fly/) and all it takes is a few lines of code like so:

```C++
// Change to 2 MHz by changing clock prescaler to 4
cli();                // Disable interrupts
CLKPR = (1<<CLKPCE);  // Prescaler enable
CLKPR = 2;            // Clock division factor 4 divisor code
                      // Division factor is 2^N, with maximum N=8 for 256
sei();                // Enable interrupts
```

There are two details that none of the pages I visited seemed to mention.

- The value you write into CLKPR is interpreted as "2 to the power of N", and _not_ as N. This seems to be a case where someone published an article somewhere without explaining what's going on, and then this snippet got copied by others who also don't understand what's going on, and it's such a fringe thing that nobody really notices or bothers to fix the example. I got the explanation included in the code snippet above from a comment buried deep down under a little-visited article.

- If you change the CPI clock prescaler, then the next time you want to upload new code into the ATTiny's Flash, you have to adjust the serial bus's frequency.

This latter part is what got me. I successfully reduced my first ATTiny45's clock speed to 128&#8239;kHz, and could never upload another program again. I was apparently [not the first one to run into this](https://forum.arduino.cc/index.php?topic=182138.0). It is probably possible to reset this chip physically, but the number of hours I would need to get there is way more than what the chip itself is worth. So now I have this sad guy lying around -- a [dead bug](https://en.wikipedia.org/wiki/Point-to-point_construction#%22Dead_bug%22_construction), for all intents and purposes.

![Sad bricked ATTiny45](/images/040-attiny-bricked.jpg#narrow)



