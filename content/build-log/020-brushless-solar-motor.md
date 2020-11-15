---
draft: false
layout: single
description: Such camera angle, many gradient, so gorgeous.
title: Motion and smarts
slug: motion-smarts-solar-engine
publishdate: 2020-10-17
---

Learning about pummers awakened my building instinct, but it turns out the desire goes a bit deeper this time. A blinking light is, well, a blinking light, but it's somehow very -- abstract? immaterial? The non-sitters in the BEAM menagerie get their twitchy motion from tiny motors soldered in weird ways, and that, in turn, is somehow a little -- scrappy?

I want motion, but also elegance, and at least some interesting engineering. And hey, my whole obsession with making started with microcontrollers, so there has to be some form of programmed goodness in there too. And so, starting off on the general idea of motors, I rabbitholed into the YouTube sub-genre of scratch-built solar and brushless motors, like this one:

{{< youtubevid id="-xgDJyCoNh4" img="/images/020--xgDJyCoNh4.jpg" title="Solar Brushless Motor out of Fidget SPINNER" >}}

<!--more-->

Splendid! This guy has done it, so it's clearly possible: you can make a wheel of magnets spin using the power of an ordinary solar cell. Here's what piques my imagination:

- There are no moving parts with friction! OK, that is obviously not _completely_ true because you need a bearing at the center. But that's the only one, and you can completely avoid electrical contacts.
- Things that have no friction tend to last very long. I like the idea of building somehing that lasts very long.
- This is a machine that showcases its inner workings instead of hiding them. What you see is exactly what it does. This is the mechanical equivalent of freeform circuits. It is a functional sculpture!
- It is mechanically very simple. I am fascinated by the potential of trading mechanical complexity for smart circuitry.
- I can build it from scratch, down to hand-winding the solenoid!

This is getting warm. But if I'm honest, I don't need a microcontroller to make this motor run. A single magnetically activated contact is enough, like the reed relay that is used in the video. If you count that as a second moving part, you can substitute electronics, but it's still a simple analog approach.

I need a good excuse for a microcontroller.

Let's make it count the wheel's turns and show it on a display! In fact, let's make it count those turns _forever_, showing a number that grows day after day and never resets. In fact, let's call this thing the _forever engine_!

I'm so happy with this concept that I made a quick pencil sketch. I put it as the site's title image, but here it is again:

![Sketch of the Solarpunk Forever Engine](/images/sp4ee-concept-sketch.jpg)

- The output of a small solar cell _is_ limited, so the electronics need to be energy-efficient.
- As luck has it, we have the super-accessible and cheap ATTiny chips that need ridiculously little energy, and even less when they go into sleep mode.
- The display is a bit more tricky, but I can use an old-fashioned monochrome LCD with no backlight. It ought to be large enough so that it's prominent, and if this engine really is to run for decades, I need enough digits.
- I love building with laser-cut wood a lot more than 3D printing. 3D printing is great, but ultimately the result is just a glorified piece of plastic. So laser-cut wood it will be, with mostly exposed brass wires connecting the electric parts.
- There is an element that comes straight from the BEAM cookbook: a large capacitor stores enough energy to power the electronics (though not the motor) for a few hours, so the machine can still be "on" during cloudy spells, or for a while after dusk.

There. That's the outline of the Solarpunk Forever Engine. I'm as excited as you are to see how the build will go!

