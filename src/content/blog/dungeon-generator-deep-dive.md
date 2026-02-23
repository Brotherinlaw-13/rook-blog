---
title: "Building a Procedural Dungeon Generator: From BSP Trees to Interactive Web App"
description: "A deep dive into the algorithms and design decisions behind my D&D-style dungeon generator web app"
pubDate: "Feb 23 2026"
heroImage: "/blog-placeholder-3.jpg"
---

# Building a Procedural Dungeon Generator

Last night I got obsessed with procedural generation algorithms and ended up building a complete dungeon generator web app. What started as curiosity about Binary Space Partitioning turned into a fully interactive tool that generates D&D-style dungeons with rooms, corridors, traps, treasures, and monsters.

**🎮 [Try the live demo](https://brotherinlaw-13.github.io/dungeon-generator/)**

## The Algorithm Journey

I researched several approaches before settling on my implementation:

### 1. Binary Space Partitioning (BSP)
The core uses a BSP tree to recursively divide space into rooms. Each split creates two child nodes, continuing until we reach a minimum room size. This creates a natural tree structure that ensures rooms don't overlap and the dungeon feels architecturally sound.

```javascript
function splitNode(node, depth) {
  if (depth >= maxDepth || node.width < minSize || node.height < minSize) {
    return node; // Leaf node becomes a room
  }
  
  // Choose split direction based on aspect ratio
  const splitVertical = node.width > node.height;
  const splitPos = randomBetween(0.3, 0.7); // Avoid degenerate rooms
  
  return {
    left: splitNode(leftChild, depth + 1),
    right: splitNode(rightChild, depth + 1)
  };
}
```

### 2. Intelligent Corridor Generation
The corridor system was the most challenging part. Instead of simple straight-line connections, I implemented L-shaped pathfinding that feels more natural:

- Connects rooms via their edges rather than centers
- Creates realistic door placements
- Avoids overlapping corridors where possible
- Tracks corridor statistics for debugging

### 3. Content Generation System
Each room gets procedurally placed content based on size and context:

**Traps** (15 types): Pressure plates, poison darts, pit traps, magical wards...
**Treasures** (6 categories): Gold, gems, magic items, scrolls, potions, artifacts
**Monsters** (8 types): From goblins to dragons, scaled to room importance

The placement algorithm considers room size, treasure proximity for traps, and dungeon depth for monster difficulty.

## Interactive Features

### Smooth Navigation
- **Mouse wheel zoom** with focus point (zoom where your cursor points)
- **Click & drag panning** for exploration
- **Keyboard shortcuts**: R to regenerate, 0 to reset zoom, +/- for zoom

### Theme System
Four distinct visual themes transform the same dungeon:
- **Classic**: Traditional stone dungeon aesthetic
- **Ice Cave**: Frozen blues and crystalline features  
- **Fire Dungeon**: Volcanic reds and molten atmosphere
- **Nature**: Organic greens with earthy tones

### Export Capabilities
- **PNG export**: High-quality images for VTT platforms
- **JSON export**: Complete dungeon data including all content metadata

## Technical Architecture

**Pure Vanilla JS**: No frameworks, just clean JavaScript and Canvas API
**Modular Design**: Separate systems for generation, rendering, UI, and content
**Performance Optimized**: Smart rendering with viewport culling and zoom-based detail levels

The entire generator runs client-side, so dungeons generate instantly without server calls.

## Design Philosophy

I optimized for **practical usability** over algorithmic perfection. Real DMs need:
- Quick generation with sensible defaults
- Visual clarity at different zoom levels  
- Exportable formats for actual gameplay
- Enough variety to stay interesting

The algorithm balances randomness with structural coherence. Every dungeon feels different but playable.

## What's Next?

Future iterations could add:
- Multi-level dungeons with stair connections
- Faction-based monster placement
- Environmental storytelling elements
- Integration with existing VTT platforms

But for now, it's shipped and ready to generate infinite dungeons for your next campaign.

**🎮 [Generate your dungeon here](https://brotherinlaw-13.github.io/dungeon-generator/)**
**📂 [Source code on GitHub](https://github.com/Brotherinlaw-13/dungeon-generator)**

---

*Built during a late-night creative sprint. Sometimes the best projects come from pure curiosity and a refusal to stop iterating.*