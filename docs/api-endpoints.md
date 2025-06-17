# API Endpoints

## Overview

The G.O.A.T. Grader API provides a set of endpoints for accessing player data, statistics, and generating comparisons. This document outlines the available endpoints, request parameters, and response formats.

## Base URL

```
https://api.goatgrader.com/api
```

For local development:

```
http://localhost:3001/api
```

## Player Endpoints

### Search Players

Search for players by name, team, or other criteria.

```
GET /players/search
```

**Query Parameters:**

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| q         | string | Yes      | Search query (player name, team, etc.) |
| limit     | number | No       | Maximum number of results (default: 10) |

**Response:**

```json
{
  "results": [
    {
      "id": 1,
      "name": "Michael Jordan",
      "team": "Chicago Bulls",
      "position": "SG",
      "yearStart": 1984,
      "yearEnd": 2003
    },
    {
      "id": 2,
      "name": "LeBron James",
      "team": "Los Angeles Lakers",
      "position": "SF",
      "yearStart": 2003,
      "yearEnd": 2023
    }
  ],
  "total": 2
}
```

### Get Player Details

Get detailed information about a specific player.

```
GET /players/:id
```

**Path Parameters:**

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | number | Yes      | Player ID |

**Response:**

```json
{
  "id": 1,
  "name": "Michael Jordan",
  "slug": "michael-jordan",
  "position": "SG",
  "height": "6-6",
  "weight": 216,
  "birthDate": "1963-02-17T00:00:00.000Z",
  "birthPlace": "Brooklyn, New York",
  "college": "North Carolina",
  "yearDrafted": 1984,
  "draftPosition": 3,
  "draftTeam": "Chicago Bulls",
  "yearStart": 1984,
  "yearEnd": 2003,
  "imageUrl": "https://example.com/jordan.jpg",
  "teams": [
    { "name": "Chicago Bulls", "years": "1984-1993" },
    { "name": "Chicago Bulls", "years": "1995-1998" },
    { "name": "Washington Wizards", "years": "2001-2003" }
  ]
}
```

### Get Player Statistics

Get detailed statistics for a specific player.

```
GET /players/:id/stats
```

**Path Parameters:**

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | number | Yes      | Player ID |

**Query Parameters:**

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| type      | string | No       | Type of stats to return ("career", "season", "playoffs", "all") (default: "career") |

**Response:**

```json
{
  "career": {
    "gamesPlayed": 1072,
    "ppg": 30.1,
    "rpg": 6.2,
    "apg": 5.3,
    "spg": 2.3,
    "bpg": 0.8,
    "fgp": 49.7,
    "tpp": 32.7,
    "ftp": 83.5,
    "per": 27.9
  },
  "regularSeason": [...],
  "playoffs": [...]
}
```

### Get Player Achievements

Get awards and accolades for a specific player.

```
GET /players/:id/achievements
```

**Path Parameters:**

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | number | Yes      | Player ID |

**Response:**

```json
{
  "championships": 6,
  "mvps": 5,
  "finalsMvps": 6,
  "allStarSelections": 14,
  "allNbaFirst": 10,
  "allNbaSecond": 1,
  "allNbaThird": 0,
  "allDefenseFirst": 9,
  "allDefenseSecond": 0,
  "dpoys": 1,
  "scoringTitles": 10,
  "hallOfFame": true,
  "yearInducted": 2009
}
```

## Comparison Endpoints

### Generate Comparison

Generate a detailed comparison between multiple players.

```
POST /comparison/generate
```

**Request Body:**

```json
{
  "playerIds": [1, 2],
  "criteria": {
    "peakPerformance": true,
    "longevity": true,
    "playoffs": true,
    "championships": true,
    "statistics": true,
    "eraAdjusted": true
  }
}
```

**Response:**

```json
{
  "id": "comp123",
  "players": [
    {
      "id": 1,
      "name": "Michael Jordan",
      "team": "Chicago Bulls"
    },
    {
      "id": 2,
      "name": "LeBron James",
      "team": "Los Angeles Lakers"
    }
  ],
  "analysis": "In comparing Michael Jordan and LeBron James, several key patterns emerge...",
  "stats": {
    "1": { "ppg": 30.1, "rpg": 6.2, "apg": 5.3, ... },
    "2": { "ppg": 27.0, "rpg": 7.4, "apg": 7.4, ... }
  },
  "achievements": {
    "1": { "championships": 6, "mvps": 5, ... },
    "2": { "championships": 4, "mvps": 4, ... }
  },
  "criteria": {
    "peakPerformance": true,
    "longevity": true,
    "playoffs": true,
    "championships": true,
    "statistics": true,
    "eraAdjusted": true
  }
}
```

### Get Recent Comparisons

Retrieve recently generated comparisons.

```
GET /comparison/recent
```

**Query Parameters:**

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| limit     | number | No       | Maximum number of results (default: 5) |

**Response:**

```json
[
  {
    "id": "comp123",
    "players": [{ "id": 1, "name": "Michael Jordan" }, { "id": 2, "name": "LeBron James" }],
    "criteria": { "peakPerformance": true, ... },
    "timestamp": "2023-10-15T14:30:00.000Z"
  },
  { ... }
]
```

### Get Comparison by ID

Retrieve a specific comparison by its ID.

```
GET /comparison/:id
```

**Path Parameters:**

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | Comparison ID |

**Response:**

Same as the response from the Generate Comparison endpoint.

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK` - The request was successful
- `400 Bad Request` - Invalid request parameters
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

Error responses include a message field:

```json
{
  "message": "Player not found",
  "error": { ... }  // Detailed error information (development mode only)
}
```

## Rate Limiting

API requests are limited to 60 requests per minute per IP address. Rate limit information is included in the response headers:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1623348000
```

## Authentication

Public endpoints do not require authentication. Future premium features may require an API key.
