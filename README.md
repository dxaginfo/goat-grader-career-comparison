# The G.O.A.T. Grader - NBA Career Comparison Engine

A web application that allows basketball fans to compare the careers of NBA players using historical statistics, helping to settle "Greatest Of All Time" debates with data-driven insights.

## 🏀 Overview

The G.O.A.T. Grader is a public-facing web tool that enables users to:

1. Select two or more NBA players to compare
2. Choose specific criteria for comparison (peak performance, longevity, playoff success, etc.)
3. Receive an AI-generated, narrative-based analysis that highlights similarities and differences in their careers
4. Visualize the comparison through interactive charts and graphs

Instead of relying on subjective opinions, the G.O.A.T. Grader provides data-driven insights to enrich basketball discussions and debates.

## ✨ Features

- **Player Selection**: Search and select from a comprehensive database of NBA players
- **Customizable Comparison Criteria**:
  - Peak Performance (best 3/5/7 seasons)
  - Career Longevity
  - Playoff Performance
  - Championship Success
  - Statistical Dominance
  - Era-Adjusted Statistics
- **AI-Generated Analysis**: Natural language summaries that contextualize the statistical comparison
- **Interactive Visualizations**: Charts and graphs that illustrate the differences between players
- **Sharable Results**: Generate links to comparison results that can be shared on social media

## 🛠️ Technology Stack

- **Frontend**: React.js with TypeScript
- **UI Framework**: Material-UI
- **State Management**: Redux Toolkit
- **Visualization**: D3.js for custom charts
- **Backend**: Node.js with Express
- **Database**: MongoDB for player data
- **AI/ML**: 
  - OpenAI API for generating natural language analysis
  - Custom algorithms for statistical normalization across eras
- **Data Source**: Web scraping of public basketball statistics

## 📊 Architecture

The application follows a modern, modular architecture:

```
client/               # React frontend application
├── public/           # Static assets
├── src/
│   ├── components/   # UI components
│   ├── pages/        # Page layouts
│   ├── redux/        # State management
│   ├── services/     # API integration
│   ├── utils/        # Helper functions
│   └── App.tsx       # Main application

server/               # Node.js backend
├── controllers/      # Request handlers
├── models/           # Database models
├── routes/           # API endpoints
├── services/         # Business logic
│   ├── ai/           # AI integration
│   ├── scraper/      # Data collection
│   └── stats/        # Statistical analysis
├── utils/            # Helper functions
└── server.js         # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dxaginfo/goat-grader-career-comparison.git
   cd goat-grader-career-comparison
   ```

2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Create .env file in server directory
   touch server/.env
   
   # Add the following variables
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   PORT=3001
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # In another terminal, start frontend
   cd client
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 📝 Data Collection & Processing

The application relies on historical NBA statistics which are:

1. Collected through web scraping of public basketball statistics websites
2. Processed and normalized to account for different eras and rule changes
3. Stored in MongoDB for efficient retrieval
4. Updated periodically to include the most recent seasons

## 🧠 AI Analysis Engine

The heart of the G.O.A.T. Grader is its AI analysis engine that:

1. Takes structured statistical data as input
2. Applies basketball domain knowledge to identify significant patterns and differences
3. Generates natural language analysis that highlights key comparisons
4. Contextualizes statistics within the appropriate historical era

## 📈 Key Performance Metrics

Players are compared across multiple dimensions:

- Traditional Stats (Points, Rebounds, Assists, etc.)
- Advanced Metrics (PER, Win Shares, VORP, etc.)
- Accolades and Awards
- Team Success
- Impact on the Game
- Cultural Significance

## 🔜 Roadmap

- [ ] Add support for team comparisons
- [ ] Implement "What If" scenarios (e.g., "What if Player X played in today's era?")
- [ ] Add video highlight integration
- [ ] Develop mobile app versions
- [ ] Expand to other sports (NFL, MLB, etc.)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Basketball-Reference.com for providing comprehensive basketball statistics
- The NBA community for their passion and ongoing GOAT debates
- All contributors who help improve this tool