# Player Data Model

## Overview

The G.O.A.T. Grader application uses a structured data model to represent NBA players, their career statistics, and achievements. This document outlines the key data structures used throughout the application.

## Player Entity

### Core Information

```javascript
{
  id: Number,            // Unique identifier
  name: String,          // Player's full name
  slug: String,          // URL-friendly version of name
  position: String,      // Basketball position (PG, SG, SF, PF, C)
  height: String,        // Height in feet and inches
  weight: Number,        // Weight in pounds
  birthDate: Date,       // Date of birth
  birthPlace: String,    // City/country of birth
  college: String,       // College attended (if any)
  yearDrafted: Number,   // Year player was drafted
  draftPosition: Number, // Draft pick position
  draftTeam: String,     // Team that drafted the player
  yearStart: Number,     // First NBA season year
  yearEnd: Number,       // Last NBA season year (or current year)
  imageUrl: String,      // URL to player's photo
  teams: Array           // Teams played for (with years)
}
```

## Career Statistics

### Regular Season Career Averages

```javascript
{
  playerId: Number,     // Reference to player
  gamesPlayed: Number,   // Total games played
  gamesStarted: Number,  // Total games started
  mpg: Number,          // Minutes per game
  ppg: Number,          // Points per game
  rpg: Number,          // Rebounds per game
  apg: Number,          // Assists per game
  spg: Number,          // Steals per game
  bpg: Number,          // Blocks per game
  topg: Number,         // Turnovers per game
  fpg: Number,          // Fouls per game
  fgp: Number,          // Field goal percentage
  tpp: Number,          // Three-point percentage
  ftp: Number,          // Free throw percentage
  per: Number,          // Player Efficiency Rating
  ws: Number,           // Win Shares
  wsPerMin: Number,     // Win Shares per 48 minutes
  bpm: Number,          // Box Plus/Minus
  vorp: Number          // Value Over Replacement Player
}
```

### Season-by-Season Statistics

```javascript
{
  playerId: Number,     // Reference to player
  season: String,       // Season (e.g., "2010-11")
  age: Number,          // Player's age during season
  team: String,         // Team abbreviation
  gamesPlayed: Number,   // Games played
  gamesStarted: Number,  // Games started
  // ... same statistical categories as career averages
  // Additional per-season data
  isAllStar: Boolean,   // All-Star selection that season
  isAllNBA: Boolean,    // All-NBA selection that season
  allNBATeam: Number,   // 1st, 2nd, or 3rd team (if applicable)
  isAllDefense: Boolean, // All-Defensive selection
  isChampion: Boolean,  // Won championship that season
  isMVP: Boolean,       // Won MVP that season
}
```

### Playoff Statistics

```javascript
{
  playerId: Number,     // Reference to player
  season: String,       // Playoff year
  age: Number,          // Player's age during playoffs
  team: String,         // Team abbreviation
  roundsPlayed: Number,  // How far the team advanced
  gamesPlayed: Number,   // Games played
  // ... same statistical categories as regular season
  // Additional playoff-specific data
  result: String,       // Final result (e.g., "Won Finals")
  ppgDiff: Number,      // Difference from regular season PPG
  rpgDiff: Number,      // Difference from regular season RPG
  apgDiff: Number,      // Difference from regular season APG
}
```

## Achievements and Accolades

```javascript
{
  playerId: Number,          // Reference to player
  championships: Number,      // NBA championships won
  mvps: Number,              // Regular season MVP awards
  finalsMvps: Number,        // Finals MVP awards
  allStarSelections: Number,  // All-Star selections
  allNbaFirst: Number,       // All-NBA First Team selections
  allNbaSecond: Number,      // All-NBA Second Team selections
  allNbaThird: Number,       // All-NBA Third Team selections
  allDefenseFirst: Number,   // All-Defensive First Team selections
  allDefenseSecond: Number,  // All-Defensive Second Team selections
  dpoys: Number,             // Defensive Player of the Year awards
  roys: Number,              // Rookie of the Year awards
  scoringTitles: Number,     // Scoring champion titles
  assistTitles: Number,      // Assists leader titles
  reboundTitles: Number,     // Rebounding leader titles
  stealTitles: Number,       // Steals leader titles
  blockTitles: Number,       // Blocks leader titles
  hallOfFame: Boolean,       // Hall of Fame induction
  yearInducted: Number,      // Year inducted to Hall of Fame
  jerseyRetired: Boolean,    // Jersey retired by any team
  retiredJerseys: Array      // Teams that retired player's jersey
}
```

## Comparison Data Model

When players are compared, we generate a structured comparison result:

```javascript
{
  id: String,               // Unique identifier for the comparison
  playerIds: Array,         // IDs of compared players
  criteria: Object,         // Criteria used for comparison
  timestamp: Date,          // When comparison was generated
  analysis: String,         // AI-generated text analysis
  charts: Array,            // Visualization data
  playerStats: Object,      // Key statistical comparisons
  playerAchievements: Object, // Achievement comparisons
  eraAdjusted: Object,      // Era-normalized statistics
}
```

## Data Sources and Collection

Player data is sourced from:

1. **Public basketball statistics websites** - For historical player data
2. **API providers** - For supplementary information
3. **Custom calculations** - For advanced metrics and era adjustments

The data collection process involves:

1. Web scraping of publicly available statistics
2. Data cleaning and normalization
3. Statistical adjustments for cross-era comparisons
4. Storage in MongoDB for efficient retrieval

## Data Update Frequency

- **Historical player data**: Updated once at initial database population
- **Active player statistics**: Updated daily during NBA season, weekly during off-season
- **Player images and metadata**: Updated monthly

## Storage Considerations

- MongoDB provides flexible schema design for the varying player data
- Indexes on frequently queried fields (player name, id, teams, positions)
- Caching layer for frequently requested player comparisons
