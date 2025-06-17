# The G.O.A.T. Grader Architecture

## System Overview

The G.O.A.T. Grader application follows a modern client-server architecture with a clear separation of concerns between frontend and backend components.

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │     │                     │
│    React Frontend   │◄────▶│   Express Backend   │◄────▶│  External Services  │
│                     │     │                     │     │                     │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
          │                           │                           │
          ▼                           ▼                           ▼
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │     │                     │
│      UI/UX          │     │     MongoDB         │     │  Basketball Stats   │
│    Components       │     │     Database        │     │       API           │
│                     │     │                     │     │                     │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
                                       │                           │
                                       │                           │
                                       ▼                           ▼
                             ┌─────────────────────┐     ┌─────────────────────┐
                             │                     │     │                     │
                             │     OpenAI API      │     │    Web Scraping     │
                             │    (Analysis)       │     │     Service         │
                             │                     │     │                     │
                             └─────────────────────┘     └─────────────────────┘
```

## Components

### Frontend

The frontend is built with React.js and TypeScript, utilizing the following key technologies and patterns:

1. **UI Framework**: Material-UI provides a comprehensive set of pre-built components that follow Google's Material Design guidelines.

2. **State Management**: Redux Toolkit manages global application state, with separate slices for players and comparison functionality.

3. **Routing**: React Router handles navigation between different pages.

4. **API Integration**: Axios for making HTTP requests to the backend API.

5. **Data Visualization**: D3.js for creating interactive charts and visualizations of player statistics.

6. **Component Structure**:
   - Layout components (Header, Footer)
   - Page components (HomePage, ComparisonPage, AboutPage)
   - Feature components (PlayerCard, ComparisonResults, etc.)
   - UI utility components

### Backend

The backend is built with Node.js and Express, with the following key components:

1. **API Routes**:
   - `/api/players` - Player data and statistics
   - `/api/comparison` - Comparison generation endpoints

2. **Controllers**: Handle request processing and business logic.

3. **Services**:
   - Data scraping service - Collects statistics from public sources
   - AI analysis service - Integrates with OpenAI for generating insights
   - Statistics processing service - Normalizes and processes raw data

4. **Data Storage**:
   - MongoDB database for storing player information, statistics, and cached comparisons
   - Schema design optimized for efficient querying of player statistics

### External Integrations

1. **OpenAI API**: Generates natural language analysis of player comparisons.

2. **Basketball Statistics Sources**: Web scraping tools collect data from public basketball statistics websites.

## Data Flow

1. **Player Selection**:
   - User searches for players in the frontend
   - Frontend makes API calls to `/api/players/search`
   - Backend returns matching player records

2. **Comparison Generation**:
   - User selects players and criteria for comparison
   - Frontend sends request to `/api/comparison/generate`
   - Backend collects player statistics and sends them to the AI service
   - AI service generates natural language analysis
   - Results are returned to the frontend for display

3. **Data Visualization**:
   - Frontend receives raw data from the backend
   - D3.js transforms the data into interactive visualizations

## Deployment Architecture

The application can be deployed in various ways:

1. **Development**: Local development using Node.js and MongoDB.

2. **Production**:
   - Frontend: Static files served from CDN or static hosting (Netlify, Vercel)
   - Backend: Node.js server deployed on cloud platform (Heroku, AWS, Google Cloud)
   - Database: MongoDB Atlas or other managed MongoDB service
   - Caching: Redis for caching API responses and frequent queries

3. **Scaling Considerations**:
   - Horizontal scaling of backend services
   - Caching of common player comparisons
   - Rate limiting for scraping and AI services
   - CDN for static assets

## Security Considerations

1. **API Protection**:
   - Rate limiting to prevent abuse
   - Input validation for all API endpoints
   - CORS configuration to restrict API access

2. **External Services**:
   - Secure storage of API keys
   - Proxied requests to external services
   - Proper error handling for external service failures

3. **Data Privacy**:
   - No collection of personal user data
   - Transparent data sources and processing
