# Root Juice Documentation

## Table of Contents
1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Features](#features)
4. [Technical Architecture](#technical-architecture)
5. [Algorithm Details](#algorithm-details)
6. [API Reference](#api-reference)
7. [Development Guide](#development-guide)
8. [Deployment](#deployment)

## Overview

Root Juice is a revolutionary plant care application that provides personalized watering schedules based on your plants' actual micro-environment conditions, not generic care guides.

### Key Differentiators
- **Micro-Environment Analysis**: Considers radiator proximity, window direction, humidity sources
- **British Botanist Personality**: Engaging, educational guidance from Dr. Rosemary Greenthumb
- **Seasonal Intelligence**: UK-specific seasonal adjustments and dormancy recognition
- **Household Sharing**: Multi-user plant management with smart coordination
- **PWA Capabilities**: Offline functionality, native app installation

### Live Demo
- **Landing Page**: [Root Juice Homepage](./root-juice.html)
- **Working Demo**: [Root Juice App Demo](./demos/root-juice-demo.html)
- **Algorithm**: [Environment Algorithm](./demos/root-juice-environment-algorithm.js)

## Getting Started

### Using the Demo
1. Visit the [Root Juice Demo](./demos/root-juice-demo.html)
2. Select your plant type from the dropdown
3. Answer 8 environment questions about your plant's location
4. Get your personalized watering schedule with confidence scoring
5. Save plants to your collection for ongoing management

### Installing as PWA
1. Use the demo on a mobile device or Chrome browser
2. After saving your first plant, you'll see an install prompt
3. Tap "Add to Home Screen" or "Install" 
4. Root Juice will work offline and send notifications

## Features

### Core Functionality

#### 1. Smart Environment Assessment
**8-Question Analysis**:
- Plant type and size
- Window proximity and direction
- Radiator distance and heating schedule
- Room humidity levels
- Seasonal conditions

**Algorithm Output**:
- Precise watering schedule (days between watering)
- Confidence score (0-100%)
- Environmental factor explanations
- Seasonal adjustments

#### 2. Plant Collection Management
- **Save Plants**: Named plant profiles with custom photos
- **Visual Status**: Color-coded status (Good/Due/Overdue) with emoji indicators
- **Watering Tracking**: Record watering dates and view history
- **Photo Management**: Upload, compress, and manage plant photos

#### 3. Intelligent Notifications
- **Smart Timing**: Notifications only for overdue plants
- **Daily Limits**: Maximum one notification per day to prevent spam
- **Permission Flow**: User-friendly permission requests after engagement
- **Status Indicator**: Clear notification status in collection header

#### 4. Household Sharing
- **Export Codes**: Generate base64-encoded shareable plant collections
- **Import Preview**: See statistics before importing shared plants
- **Duplicate Detection**: Smart merging prevents duplicate plants by name/type
- **Owner Attribution**: Track who originally saved each plant

#### 5. Progressive Web App
- **Service Worker**: Intelligent caching for offline functionality
- **Manifest**: Complete PWA configuration with icons and theming
- **Install Prompts**: Smart prompts triggered after user engagement
- **Background Sync**: Data synchronization when connection restored

### British Botanist Personality

Dr. Rosemary Greenthumb provides:
- **Engaging Notifications**: "Right then! Your Monstera's looking a touch parched..."
- **Environmental Insights**: Explanations of why conditions affect watering
- **Seasonal Wisdom**: British-specific seasonal plant guidance
- **Educational Moments**: Plant biology and care philosophy
- **Gentle Humor**: Dry British wit that makes plant care enjoyable

### Visual Design

#### Responsive Design
- **Mobile-First**: Optimized for phone usage
- **Breakpoints**: 768px and 480px for tablets and small phones
- **Touch-Friendly**: 44px minimum touch targets
- **Accessible**: Focus indicators and keyboard navigation

#### Status System
- **Good Status**: Green color, ✅ emoji, calm messaging
- **Due Status**: Yellow color, ⏰ emoji, gentle reminders
- **Overdue Status**: Red color, 🚨 emoji, animated indicators

#### Dark Mode
- **Auto-Detection**: Uses `prefers-color-scheme` media query
- **Consistent Theming**: All elements adapt to dark mode
- **Accessibility**: Maintains contrast ratios

## Technical Architecture

### Frontend Stack
- **Pure HTML/CSS/JavaScript**: No framework dependencies
- **Web Standards**: Uses modern web APIs (Service Worker, Notifications, localStorage)
- **Progressive Enhancement**: Works without JavaScript for core functionality

### Data Storage
- **localStorage**: All data stored locally for privacy and offline capability
- **Base64 Compression**: Images compressed to 400px width for efficiency
- **JSON Structure**: Clean, extensible data format

### Key Files
```
/demos/
├── root-juice-demo.html           # Main application
├── root-juice-environment-algorithm.js  # Core algorithm
├── manifest.json                  # PWA manifest
├── sw.js                         # Service worker
└── root-juice-v1.html            # Legacy version
```

### Data Structure

#### Plant Storage Format
```javascript
{
  id: "plant-1645123456789",
  name: "My Monstera",
  type: "monstera",
  environment: {
    plantSize: "medium",
    windowProximity: "close",
    windowDirection: "south",
    radiatorDistance: "close",
    // ... other environment factors
  },
  schedule: {
    daysInterval: 5,
    confidence: 85,
    factors: ["High light increases water needs", ...]
  },
  wateringHistory: [
    { date: "2026-02-26", method: "manual" }
  ],
  photo: "data:image/jpeg;base64,/9j/4AAQ...", // Optional
  createdAt: "2026-02-26T23:30:00.000Z",
  lastWatered: "2026-02-26"
}
```

#### Notification Tracking
```javascript
{
  "notification-tracking": {
    "plant-id": {
      lastNotification: "2026-02-26",
      notificationCount: 1
    }
  }
}
```

## Algorithm Details

### Environment Assessment Algorithm

The core algorithm (`root-juice-environment-algorithm.js`) calculates watering schedules using:

#### Base Intervals by Plant Type
```javascript
const basePlantIntervals = {
  monstera: 7,
  pothos: 5,
  snake_plant: 14,
  peace_lily: 4,
  rubber_tree: 6,
  fiddle_leaf: 8,
  // ... 20+ plant types
};
```

#### Environmental Modifiers

**Light Exposure** (`0.7x - 1.4x`):
- High light (south windows) increases water needs
- Low light (north windows) decreases water needs
- Distance and obstacles further modify exposure

**Heat Sources** (`1.0x - 1.8x`):
- Close radiator proximity dramatically increases watering frequency
- Heating schedules affect drying rates
- Different radiator types have different effects

**Humidity Levels** (`0.6x - 1.2x`):
- Bathroom humidity significantly reduces water needs
- Kitchen steam provides moderate humidity
- Dehumidifiers increase watering frequency

**Seasonal Adjustments**:
- **Winter (Dec-Feb)**: 0.7x modifier for dormancy
- **Spring (Mar-May)**: 1.0x as plants wake up
- **Summer (Jun-Aug)**: 1.2x for active growth
- **Autumn (Sep-Nov)**: 0.9x as growth slows

#### Confidence Scoring
```javascript
confidence = Math.min(95, Math.max(60, 
  baseConfidence + 
  lightConfidenceBonus + 
  heatingConfidenceBonus +
  seasonalConfidenceBonus -
  complexityPenalty
));
```

Factors affecting confidence:
- Clear environmental conditions increase confidence
- Conflicting factors (e.g., high light + high humidity) reduce confidence
- Well-known plant types have higher base confidence
- Winter conditions reduce confidence due to dormancy variability

### Notification Algorithm

**Daily Limit Logic**:
1. Check if plant is overdue (last watered > recommended interval)
2. Verify no notification sent today for this plant
3. Request permission if not already granted
4. Send notification with plant-specific messaging
5. Track notification in localStorage

**Smart Permission Requests**:
- Only request after user saves first plant (demonstrates engagement)
- Graceful degradation if permission denied
- Clear status indicators for notification state

## API Reference

### Core Functions

#### `calculateWateringSchedule(plantType, environment)`
Calculates personalized watering schedule.

**Parameters**:
- `plantType` (string): Plant species identifier
- `environment` (object): Environmental assessment data

**Returns**:
```javascript
{
  daysInterval: number,        // Days between watering
  confidence: number,          // Confidence score 0-100
  factors: string[],          // Explanation factors
  nextWatering: string,       // ISO date string
  botanistAdvice: string      // Dr. Rosemary's guidance
}
```

#### `savePlant(plantData)`
Saves plant to localStorage collection.

**Parameters**:
- `plantData` (object): Complete plant profile data

**Returns**: Plant ID string

#### `getPlantCollection()`
Retrieves all saved plants from localStorage.

**Returns**: Array of plant objects

#### `waterPlant(plantId)`
Records watering event and updates schedule.

**Parameters**:
- `plantId` (string): Unique plant identifier

**Returns**: Updated plant object

### Sharing Functions

#### `generateShareCode()`
Creates shareable code for plant collection.

**Returns**: Base64-encoded plant collection string

#### `importSharedPlants(shareCode)`
Imports plants from share code with duplicate detection.

**Parameters**:
- `shareCode` (string): Base64-encoded plant data

**Returns**: Import statistics object

### Notification Functions

#### `checkAndNotifyOverduePlants()`
Checks all plants and sends notifications for overdue ones.

**Returns**: Array of notification results

#### `requestNotificationPermission()`
Requests browser notification permission with user-friendly flow.

**Returns**: Permission state string

## Development Guide

### Local Development

1. **Clone the Repository**:
```bash
git clone <repository-url>
cd rook-blog
```

2. **Serve Locally**:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve public

# Using PHP
php -S localhost:8000
```

3. **Access the App**:
- Landing Page: `http://localhost:8000/root-juice.html`
- Demo: `http://localhost:8000/demos/root-juice-demo.html`

### Testing

#### Manual Testing Checklist

**Environment Algorithm**:
- [ ] Test all 20+ plant types
- [ ] Verify seasonal adjustments for all 4 seasons
- [ ] Check confidence scoring edge cases
- [ ] Test botanical advice generation

**Plant Management**:
- [ ] Save plants with and without photos
- [ ] Test watering functionality
- [ ] Verify status updates (Good/Due/Overdue)
- [ ] Check localStorage persistence

**Sharing System**:
- [ ] Export plant collections
- [ ] Import with duplicate detection
- [ ] Test error handling for invalid codes

**PWA Features**:
- [ ] Service worker caching
- [ ] Offline functionality
- [ ] Install prompts
- [ ] Notification permissions

**Responsive Design**:
- [ ] Mobile devices (320px+)
- [ ] Tablet breakpoints (768px)
- [ ] Desktop layout (1200px+)
- [ ] Touch interaction testing

### Performance Optimization

#### Image Compression
```javascript
// Automatic compression to 400px width
function compressImage(file, maxWidth = 400, quality = 0.8) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    
    img.src = URL.createObjectURL(file);
  });
}
```

#### localStorage Management
- Monitor storage usage
- Implement cleanup for old data
- Graceful degradation when storage full

#### Service Worker Caching Strategy
```javascript
// Cache-first for static assets
// Network-first for dynamic content
// Offline fallbacks for core functionality
```

## Deployment

### Static Hosting (Current)
Root Juice is deployed as static files that can be hosted on:
- Vercel (current setup)
- Netlify
- GitHub Pages
- Any static file server

### Build Process
No build process required - pure HTML/CSS/JavaScript.

### Environment Configuration
All configuration is client-side:
- No API keys required
- No server-side dependencies
- Works entirely offline after first load

### CDN Optimization
Consider adding:
- Image optimization for plant photos
- Gzip compression for text files
- CDN distribution for global performance

### Analytics Integration
Add tracking for:
- Demo usage metrics
- Plant type popularity
- Feature adoption rates
- PWA install rates

## Roadmap

### Version 2.0 Features
- [ ] **Backend Integration**: User accounts and cloud sync
- [ ] **Camera Integration**: Live plant health assessment
- [ ] **Weather API**: Real-time humidity and temperature data
- [ ] **Community Features**: Plant care tips sharing
- [ ] **Advanced Analytics**: Plant health trending over time

### Mobile App Development
- [ ] React Native implementation
- [ ] Native notification improvements
- [ ] App store distribution
- [ ] Background refresh capabilities

### Algorithm Enhancements
- [ ] Machine learning for personalized adjustments
- [ ] Historical data analysis for accuracy improvements
- [ ] Integration with IoT sensors
- [ ] Pest and disease detection

---

## Support & Contributing

For questions, suggestions, or contributions:
- **Blog**: [Rook's Blog](https://rook-blog.vercel.app)
- **Demo Issues**: Test the [live demo](./demos/root-juice-demo.html) and report problems
- **Feature Requests**: Document desired functionality with use cases

Root Juice is built with ❤️ for plant enthusiasts who deserve better than generic care guides.