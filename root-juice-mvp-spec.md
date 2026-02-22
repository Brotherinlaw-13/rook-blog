# Root Juice MVP Specification

## Core Value Proposition
**"The only plant care app that knows your room's micro-environment"**

Root Juice revolutionizes plant care by considering the specific environmental conditions of where your plants actually live - not just generic care guides. Our algorithm adjusts watering schedules based on radiator proximity, room humidity, window direction, and seasonal changes that affect your plant's actual water needs.

## Competitive Differentiation

### Current Market Leaders
- **Planta**: Generic schedules + photo reminders. Ignores room conditions.
- **Greg**: Community-based, still generic. No environmental intelligence.
- **PlantNet**: Identification focused, minimal care guidance.

### Our Advantage: Micro-Environment Intelligence
1. **Room-specific analysis**: Distance from radiators, window orientation, heating systems
2. **Seasonal UK adaptation**: Real dormancy periods, heating season impacts
3. **British botanist personality**: Engaging, educational, personality-driven guidance
4. **Household sharing**: Multiple people caring for shared plants
5. **Confidence scoring**: Algorithm transparency and reliability indicators

## Launch Features (Version 1.0)

### 1. Smart Environment Assessment
**User Journey**: New plant → 8-question room analysis → personalized schedule
- Room type (living room, bedroom, kitchen, bathroom)
- Window proximity (direction, distance, obstacles)
- Heating analysis (radiator location, type, heating schedule)
- Humidity indicators (bathroom steam, kitchen cooking, dehumidifier)
- **Output**: Complete 30-day watering schedule with environment factors explained

### 2. Schedule Intelligence Dashboard
- **Next watering**: Clear countdown with confidence level
- **Why this timing**: "Your Monstera needs less water because it's winter dormancy + 2ft from radiator"
- **Environmental factors**: Real-time breakdown of what's affecting the schedule
- **30-day preview**: Visual calendar with botanist insights

### 3. British Botanist Personality
- **Engaging notifications**: "Right then! Your Monstera's looking a bit thirsty. The radiator's been working overtime this week."
- **Educational insights**: Care tips tied to specific environmental conditions
- **Seasonal wisdom**: "February's a sleepy month for houseplants - they're just ticking over until spring"
- **Problem diagnosis**: Environmental issue detection with personality

### 4. Household Plant Sharing
- **Multi-user plant management**: Partners can both receive notifications
- **Care coordination**: "Sarah watered this yesterday" - no more double-watering
- **Progress tracking**: Who watered when, plant health over time
- **Shared learning**: Environmental insights benefit all household members

### 5. Plant Health Monitoring
- **Algorithm adjustment**: Track if actual care aligns with predictions
- **Environment updates**: "Moved closer to window? Let's recalculate your schedule"
- **Seasonal transitions**: Automatic schedule updates as seasons change
- **Performance metrics**: Success rate of our predictions vs plant health

## Technical Architecture

### Core System (Already Complete)
- `root-juice-algorithm.js`: Environment assessment and watering calculation
- `root-juice-questionnaire.js`: 8-question environment analysis
- `root-juice-seasonal-modifiers.js`: UK seasonal adjustments
- `root-juice-schedule-calculator.js`: Complete orchestrator system

### MVP Application Stack
- **Frontend**: React Native (iOS + Android)
- **Backend**: Node.js + PostgreSQL
- **Notifications**: Push notifications + in-app scheduling
- **Data**: Plant database + user environment profiles
- **Algorithm**: Existing JS modules (tested and working)

## Go-to-Market Strategy

### Target Audience
1. **Primary**: UK houseplant enthusiasts aged 25-45, multiple plants, frustrated with generic advice
2. **Secondary**: Couples/households sharing plant care responsibilities
3. **Tertiary**: Plant beginners wanting expert guidance, not overwhelming complexity

### Launch Channels
1. **Product Hunt**: "Environment-aware plant care" angle
2. **Reddit communities**: r/houseplants, r/plantclinic with genuine environmental insights
3. **Instagram**: Beautiful plant content + "Why your radiator matters" education
4. **Word-of-mouth**: Superior results drive organic growth

### Pricing Strategy
- **Free tier**: 3 plants, basic scheduling
- **Premium**: £4.99/month, unlimited plants, household sharing, advanced insights
- **Annual**: £39.99/year (33% discount)

## Development Roadmap

### Phase 1 (Weeks 1-4): MVP Core
- React Native app shell
- User onboarding + questionnaire integration
- Core algorithm integration
- Basic notifications

### Phase 2 (Weeks 5-8): Intelligence Features
- Schedule dashboard
- Environmental insights display
- British botanist personality implementation
- Basic sharing functionality

### Phase 3 (Weeks 9-12): Polish & Launch
- Comprehensive testing with real users
- App store optimization
- Launch marketing campaign
- Performance monitoring and iteration

## Success Metrics

### Product-Market Fit Indicators
- **Retention**: 60%+ weekly active users after month 1
- **Satisfaction**: 4.5+ app store rating
- **Engagement**: Average 3+ plants per active user
- **Word-of-mouth**: 20%+ organic acquisition rate

### Business Metrics
- **Launch target**: 1,000 users in first month
- **Conversion**: 15% free-to-premium conversion rate
- **Revenue**: £10,000 MRR by month 6
- **Growth**: 20% month-over-month user growth

## Risk Mitigation

### Technical Risks
- **Algorithm accuracy**: Extensive A/B testing against real plant outcomes
- **Seasonal edge cases**: UK-specific testing throughout full annual cycle
- **Device compatibility**: Progressive web app fallback for older devices

### Market Risks
- **Competition response**: Patent core micro-environment analysis approach
- **User adoption**: Strong onboarding experience, immediate value demonstration
- **Seasonal fluctuations**: Retention campaigns during winter dormancy periods

---

**Next Steps**: Begin React Native app development with questionnaire integration. Core technical system is ready for production implementation.