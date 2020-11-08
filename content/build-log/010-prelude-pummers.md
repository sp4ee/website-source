---
draft: false
layout: single
description: Reviving the lost art of BEAM engines and pummers with a solar cell and a 74HC14 IC.
title: Wait, what... A pummer?
slug: fell-in-love-with-pummers
publishdate: 2020-10-10
---

May Kevin Lynagh be damned! I have just found me an entire new herd of yak to shave, and [his newsletter](https://kevinlynagh.com/newsletter/) is largely to blame. If he hadn't included that link to Mohit Bhoite's [freeform circuit sculptures](https://www.bhoite.com/sculptures/) at the bottom in the October 4 issue, I would still be blissfully ignorant of pummers and BEAM circuits. I would not have ordered yet another small bag of parts, and I would definitely not have found myself tweeting out this image on a Friday evening:

![Pummer schematic and parts](/images/010-pummer-parts.jpg#narrow)

<!--more-->

But he did, and here we are. I've discovered a delightful little subculture that dates back to the 1990s, when you could first scavenge tiny motors and solar panels from defunct mass-produced consumer goods. And scavenge they did, these folks! This dude Mark Tilden came up with the whole [BEAM](https://en.wikipedia.org/wiki/BEAM_robotics) idea, the name being short for _Biology, Electronics, Aesthetics and Mechanics_. This is the kind of thing you should think of (photo from [smfr.org](http://www.smfr.org/robots/fled_popper.html)):

![FLED Photopopper](/images/010-fled_popper_small.jpg)

They charge a capacitor from the solar cell, and periodically discharge the accumulated energy to drive a  tiny motor and give the beast a little nudge. There's a whole nomenclature of these creatures. One group is called _sitters_, and a subgroup of these immobile robots are the _pummers_, whose defining feature is that they blink while staying put.

After seeing Mohit Bhoite's work, in particular the "satellites" like SATtiny or the Cube Sat, I knew what I had to build was a pummer.

It seems Mohit has rediscovered an entire lost art. The Internet has some isolated traces, but it all feels like rescuing the last few books from a burning library. Whole websites have disappeared (and sadly, without a trace in the [Wayback Machine](https://archive.org/web/) too), and the few places that are still hanging in there suffer from pervasive link rot and missing pages. There was also once a Yahoo! mailing list. Its archive was [deleted by Yahoo](https://www.theverge.com/2019/10/16/20917710/yahoo-groups-deleting-all-content-upload-message-boards-email-communities) in December 2019, along with all the other groups.

For my own pummer I went with what I could find on the charmingly quaint Solarbotics website, in particular on the page about the [SIMD1 nocturnal solar engine](http://solarbotics.net/library/circuits/se_noct_SIMD1SR.html) and the [efficient pummer circuit](http://solarbotics.net/library/circuits/bot_pummer.html). Here's my recreation of the schematic in KiCad, but by all means go and look at the original pages, they are immense fun to read! Also, they will explain how the circuits actually work, which is something I cannot do.

![Schematic of SIMD1 nocturnal engine and dual-LED pummer with 74HC14](/images/010-simd1-pummer-schematic.png)

For now, my own pummer lives on a breadboard and looks like this. The little lights are delighting to look at in the dark, but I haven't figured out what their final sculpture-form will be like. Most likely it will have some laser-cut plywood parts and lots of soldered brass wires.

![Pummer on a breadboard](/images/010-pummer-breadboard.jpg#narrow)

_For more stuff about Mohit's sculptures and how he makes them, check out Kane Hsieh's [MachinePix interview]( https://www.machinepix.com/p/machinepix-weekly-7) with him, and watch his [25-minute talk](https://www.youtube.com/watch?v=LqVFxNFGNbc) with all the juicy details of the technique._
