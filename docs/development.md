# Development Guide

## Getting Started

This guide will help you set up the G.O.A.T. Grader project for local development.

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB (local installation or Atlas account)
- Git

### Repository Setup

1. Clone the repository:

```bash
git clone https://github.com/dxaginfo/goat-grader-career-comparison.git
cd goat-grader-career-comparison
```

2. Install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Configuration

1. Create a `.env` file in the server directory:

```bash
cd ../server
cp .env.example .env
```

2. Edit the `.env` file with your configuration values:

```
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/goat-grader

# OpenAI API
OPENAI_API_KEY=your_openai_api_key
```

> Note: The OpenAI API key is optional. If not provided, the application will use mock data for AI-generated analysis.

### Running the Application

1. Start the backend server:

```bash
# In the server directory
npm run dev
```

2. Start the frontend development server:

```bash
# In the client directory
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

### Client (React.js)

```
client/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable React components
│   │   ├── comparison/  # Comparison-specific components
│   │   └── layout/      # Layout components (Header, Footer)
│   ├── pages/        # Page components
│   ├── redux/        # Redux state management
│   ├── services/     # API services
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Main application component
│   ├── index.tsx     # Entry point
│   └── theme.ts      # Material-UI theme configuration
└── package.json      # Dependencies and scripts
```

### Server (Node.js/Express)

```
server/
├── controllers/      # Request handlers
├── models/           # Database models
├── routes/           # API routes
├── services/         # Business logic
│   ├── ai/           # AI integration
│   ├── scraper/      # Data collection
│   └── stats/        # Statistical analysis
├── utils/            # Utility functions
├── .env              # Environment variables
├── package.json      # Dependencies and scripts
└── server.js         # Entry point
```

## Development Workflow

### Code Style and Linting

The project uses ESLint and Prettier for code formatting and linting. To check and fix code style:

```bash
# In either client or server directory
npm run lint
npm run lint:fix
```

### Testing

The project uses Jest for testing. To run tests:

```bash
# In either client or server directory
npm test
```

### Adding New Features

1. **Create a new branch**:

```bash
git checkout -b feature/your-feature-name
```

2. **Implement your changes**

3. **Write tests for your feature**

4. **Run tests and linting**:

```bash
npm test
npm run lint
```

5. **Commit your changes**:

```bash
git add .
git commit -m "feat: add your feature description"
```

6. **Push your branch and create a pull request**:

```bash
git push origin feature/your-feature-name
```

### Adding a New Player Component

1. Create a new component file in `client/src/components/players/`
2. Import and use required UI components from Material-UI
3. Connect to Redux state if needed
4. Add the component to the appropriate page

### Adding a New API Endpoint

1. Define the route in the appropriate router file in `server/routes/`
2. Implement the controller function in `server/controllers/`
3. Add any required service functions in `server/services/`
4. Update API documentation in the `docs` directory

## Working with Data

### Database

The application uses MongoDB for data storage. Models are defined in the `server/models/` directory.

To seed the database with initial data:

```bash
# In the server directory
npm run seed
```

### Data Scraping

The application includes tools for scraping basketball statistics. To update the player database:

```bash
# In the server directory
npm run scrape
```

> Note: Please use the scraping tools responsibly and in accordance with the terms of service of the source websites.

## Deployment

### Building for Production

```bash
# Build the client
cd client
npm run build

# Prepare the server for production
cd ../server
npm run build
```

### Deployment Options

- **Heroku**: Use the provided `Procfile`
- **Vercel/Netlify**: Deploy the client build directory
- **AWS/GCP**: Deploy using Docker containers

## Troubleshooting

### Common Issues

- **MongoDB Connection Errors**: Ensure MongoDB is running and the connection string is correct
- **OpenAI API Errors**: Check your API key and usage limits
- **CORS Issues**: Ensure the server CORS configuration matches your client origin

### Getting Help

If you encounter any issues or have questions, please:

1. Check the existing issues on GitHub
2. Create a new issue with a detailed description of your problem
3. Include relevant logs and environment information
