/**
 * Root Juice - Micro-Environment Watering Algorithm
 * Core differentiator: Room-aware plant care scheduling
 * 
 * No competitor does this level of environmental awareness.
 * Planta uses 30+ macro parameters, but not micro-environment.
 */

class EnvironmentAlgorithm {
  constructor() {
    this.basePlantDatabase = {
      'monstera': { baseDays: 7, humidityLover: true, drainageNeeds: 'good' },
      'pothos': { baseDays: 10, humidityLover: false, drainageNeeds: 'good' },
      'sansevieria': { baseDays: 14, humidityLover: false, drainageNeeds: 'excellent' },
      'fiddle_leaf': { baseDays: 7, humidityLover: true, drainageNeeds: 'good' },
      'spider_plant': { baseDays: 7, humidityLover: true, drainageNeeds: 'average' }
    };
  }

  /**
   * Calculate watering schedule based on room micro-environment
   * @param {string} plantType - Plant species identifier
   * @param {object} environment - Room environment details
   * @returns {object} Watering schedule with reasoning
   */
  calculateWateringSchedule(plantType, environment) {
    const plant = this.basePlantDatabase[plantType];
    if (!plant) throw new Error(`Plant type ${plantType} not in database`);

    let adjustedDays = plant.baseDays;
    let modifiers = [];

    // Room humidity adjustment
    const humidityModifier = this.calculateHumidityModifier(environment.humidity, plant.humidityLover);
    adjustedDays += humidityModifier.adjustment;
    modifiers.push(humidityModifier.reason);

    // Radiator proximity (UK/European homes specific)
    const radiatorModifier = this.calculateRadiatorModifier(environment.radiatorDistance, environment.heatingSeason);
    adjustedDays += radiatorModifier.adjustment;
    modifiers.push(radiatorModifier.reason);

    // Window exposure (light affects water needs)
    const lightModifier = this.calculateLightModifier(environment.windowDirection, environment.windowDistance);
    adjustedDays += lightModifier.adjustment;
    modifiers.push(lightModifier.reason);

    // Pot drainage quality
    const drainageModifier = this.calculateDrainageModifier(environment.potDrainage, plant.drainageNeeds);
    adjustedDays += drainageModifier.adjustment;
    modifiers.push(drainageModifier.reason);

    // Room temperature consistency
    const tempModifier = this.calculateTemperatureModifier(environment.tempVariability);
    adjustedDays += tempModifier.adjustment;
    modifiers.push(tempModifier.reason);

    // Ensure reasonable bounds (3-21 days)
    adjustedDays = Math.max(3, Math.min(21, Math.round(adjustedDays)));

    return {
      waterEveryDays: adjustedDays,
      basePlantDays: plant.baseDays,
      totalAdjustment: adjustedDays - plant.baseDays,
      environmentFactors: modifiers.filter(m => m), // Remove empty reasons
      confidence: this.calculateConfidence(environment)
    };
  }

  calculateHumidityModifier(humidity, humidityLover) {
    if (!humidity) return { adjustment: 0, reason: '' };

    if (humidity === 'low') {
      return {
        adjustment: humidityLover ? -1 : 0, // Humidity lovers need more water when dry
        reason: humidityLover ? 'Low humidity: watering more frequently' : ''
      };
    } else if (humidity === 'high') {
      return {
        adjustment: 1, // All plants need less water in high humidity
        reason: 'High humidity: extending time between watering'
      };
    }
    return { adjustment: 0, reason: '' };
  }

  calculateRadiatorModifier(radiatorDistance, heatingSeason) {
    if (!radiatorDistance || !heatingSeason) return { adjustment: 0, reason: '' };

    if (heatingSeason && radiatorDistance === 'near') {
      return {
        adjustment: -1, // Radiators dry out soil faster
        reason: 'Near radiator during heating season: more frequent watering'
      };
    } else if (heatingSeason && radiatorDistance === 'very_near') {
      return {
        adjustment: -2,
        reason: 'Very close to radiator during heating season: much more frequent watering'
      };
    }
    return { adjustment: 0, reason: '' };
  }

  calculateLightModifier(windowDirection, windowDistance) {
    if (!windowDirection || !windowDistance) return { adjustment: 0, reason: '' };

    if ((windowDirection === 'south' || windowDirection === 'west') && windowDistance === 'near') {
      return {
        adjustment: -1, // Bright light increases water needs
        reason: 'Bright window exposure: needs more frequent watering'
      };
    } else if (windowDirection === 'north' && windowDistance === 'far') {
      return {
        adjustment: 1, // Low light reduces water needs
        reason: 'Low light location: extending time between watering'
      };
    }
    return { adjustment: 0, reason: '' };
  }

  calculateDrainageModifier(potDrainage, drainageNeeds) {
    if (!potDrainage || !drainageNeeds) return { adjustment: 0, reason: '' };

    if (potDrainage === 'poor' && drainageNeeds === 'excellent') {
      return {
        adjustment: 2, // Poor drainage + high drainage needs = much less frequent
        reason: 'Poor pot drainage: watering much less frequently to prevent root rot'
      };
    } else if (potDrainage === 'poor') {
      return {
        adjustment: 1,
        reason: 'Poor pot drainage: extending time between watering'
      };
    }
    return { adjustment: 0, reason: '' };
  }

  calculateTemperatureModifier(tempVariability) {
    if (!tempVariability) return { adjustment: 0, reason: '' };

    if (tempVariability === 'high') {
      return {
        adjustment: 0, // No change, but flag for attention
        reason: 'Temperature varies significantly in this spot'
      };
    }
    return { adjustment: 0, reason: '' };
  }

  calculateConfidence(environment) {
    const factors = [
      environment.humidity,
      environment.radiatorDistance,
      environment.windowDirection,
      environment.windowDistance,
      environment.potDrainage,
      environment.heatingSeason
    ];

    const definedFactors = factors.filter(f => f && f !== 'unknown').length;
    return Math.round((definedFactors / factors.length) * 100);
  }

  /**
   * Generate British botanist personality explanation
   */
  generateBotanistExplanation(schedule, plantType) {
    const plantNames = {
      'monstera': 'your lovely Monstera',
      'pothos': 'that robust Pothos',
      'sansevieria': 'the steadfast Snake Plant',
      'fiddle_leaf': 'your temperamental Fiddle Leaf',
      'spider_plant': 'the cheerful Spider Plant'
    };

    const plantName = plantNames[plantType] || 'your plant';
    const days = schedule.waterEveryDays;
    
    let explanation = `Right then, ${plantName} should be watered every ${days} days based on its particular situation. `;
    
    if (schedule.environmentFactors.length > 0) {
      explanation += `I've considered: ${schedule.environmentFactors.join(', ').toLowerCase()}. `;
    }
    
    if (schedule.confidence < 70) {
      explanation += `Mind you, I'd appreciate a few more details about its living conditions when you have a moment.`;
    } else {
      explanation += `Quite confident in this assessment, given the environmental details.`;
    }

    return explanation;
  }
}

// Example usage and test cases
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnvironmentAlgorithm;
} else {
  // Browser/demo usage
  const algorithm = new EnvironmentAlgorithm();
  
  // Test case: Monstera near radiator in winter
  const example = algorithm.calculateWateringSchedule('monstera', {
    humidity: 'low',
    radiatorDistance: 'near',
    heatingSeason: true,
    windowDirection: 'north',
    windowDistance: 'far',
    potDrainage: 'good',
    tempVariability: 'low'
  });
  
  console.log('Root Juice Environment Algorithm Demo:');
  console.log('Plant: Monstera near radiator in winter');
  console.log(`Watering schedule: Every ${example.waterEveryDays} days`);
  console.log(`Base plant interval: ${example.basePlantDays} days`);
  console.log(`Environment adjustment: ${example.totalAdjustment} days`);
  console.log('Factors considered:', example.environmentFactors);
  console.log(`Confidence: ${example.confidence}%`);
  
  const explanation = algorithm.generateBotanistExplanation(example, 'monstera');
  console.log('\nBotanist explanation:');
  console.log(`"${explanation}"`);
}