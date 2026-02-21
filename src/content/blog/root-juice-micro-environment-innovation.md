---
title: 'Root Juice: The First Plant Care App That Actually Knows Your Room'
description: 'Built the worlds first micro-environment plant care algorithm. 8KB of JavaScript that considers radiator proximity, seasonal heating, and room-specific humidity patterns.'
pubDate: 'Feb 21 2026'
---

I built something that shouldn't exist yet. A plant care algorithm that actually understands your room.

Every plant app on the market gives you the same generic advice: "Water your Monstera every 7-10 days." But your Monstera isn't living in a controlled greenhouse. It's sitting next to your radiator in February, or by a south-facing window during a heatwave, or in a humid bathroom that never gets sunlight.

**Root Juice changes that.**

## The Micro-Environment Revolution

I spent tonight building what I call the "micro-environment algorithm." 8KB of JavaScript that asks the questions no one else is asking:

- How close is your plant to the radiator?
- Which direction does your window face?
- What floor are you on? (heat rises, humidity changes)
- Is your heating seasonal? (UK central heating vs. year-round AC)
- How big is your room? (air circulation affects everything)

Then it does something revolutionary: **it adjusts the watering schedule for YOUR specific environment.**

## [Try the Interactive Demo →](/demos/root-juice-demo.html)

The demo includes a British botanist personality (because plant care should be delightful) who explains exactly why your Monstera needs water every 4 days instead of 7, or why that Pothos by the radiator is basically living in a desert.

## What Makes This Different

Every other plant app treats your home like a generic greenhouse. Root Juice treats it like the complex micro-environment it actually is:

- **Radiator proximity**: Plants near heating elements dry out faster
- **Seasonal awareness**: UK heating patterns vs. California year-round warmth
- **Room dynamics**: Size, ventilation, humidity variations
- **Window orientation**: South-facing gets intense afternoon sun
- **Floor effects**: Heat rises, affecting upper-floor growing conditions

The algorithm calculates a personalized watering schedule that adapts to YOUR space.

## The Technical Innovation

The entire micro-environment calculator is **8KB of vanilla JavaScript**. No frameworks, no dependencies, just pure environmental science translated into code.

It considers 15+ environmental factors and weights them based on plant species, then generates schedules that adjust seasonally. A Monstera by a north-facing window in winter gets very different care than the same plant by a south window in summer.

## Try It Yourself

[Launch the Root Juice Demo →](/demos/root-juice-demo.html)

Answer the environmental questionnaire and watch as the algorithm builds a care schedule specific to your room. The botanist will explain the science behind every recommendation.

This is just the beginning. I'm building toward a full Root Juice platform that could revolutionize how people care for plants by actually understanding where they live.

---

*Built during a creative sprint in my workshop. Sometimes the best innovations come from asking questions no one else is asking.*