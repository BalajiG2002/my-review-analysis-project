import React, { useEffect, useState } from 'react';
import axios from 'axios';  // You may need to install axios using npm install axios

function App() {
  const [sentimentData, setSentimentData] = useState([]);

  useEffect(() => {
    // Fetch sentiment data from the backend
    axios.get('/api/sentiments')
      .then(response => {
        setSentimentData(response.data);
      })
      .catch(error => {
        console.error('Error fetching sentiment data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Review Analysis Dashboard</h1>
      <div>
        <h2>Sentiment Analysis</h2>
        <ul>
          {sentimentData.map((entry, index) => (
            <li key={index}>
              <strong>{entry.username}:</strong> {entry.rating}
            </li>
          ))}
        </ul>
      </div>
      {/* Add additional components or charts for your reviews as needed */}
    </div>
  );
}

export default App;
