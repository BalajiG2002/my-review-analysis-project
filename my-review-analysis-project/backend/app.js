const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const Sentiment = require('sentiment');


const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Initialize Sentiment analyzer
const sentimentAnalyzer = new Sentiment();

// In-memory storage for user responses
let userResponses = {};

// Endpoint to receive sentiment data from the Telegram bot
app.post('/api/sentiments', (req, res) => {
  const { userResponses: receivedUserResponses } = req.body;

  // Update or merge the user responses
  userResponses = { ...userResponses, ...receivedUserResponses };

  // Process sentiment data if needed (e.g., store it in a database)
  // You can also perform additional analysis here

  res.sendStatus(200);
});

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, '/home/balajig/my-review-analysis-project/my-review-analysis-project/frontend')));

// Send other requests to the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/home/balajig/my-review-analysis-project/my-review-analysis-project/frontend', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
