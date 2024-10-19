import React, { useState } from 'react';
import axios from 'axios';

const WebScraper: React.FC = () => {
  const [url, setUrl] = useState('');
  const [scrapedData, setScrapedData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    setLoading(true);
    try {
      // In a real application, you would call your backend API to perform the scraping
      const response = await axios.post('/api/scrape', { url });
      setScrapedData(response.data);
    } catch (error) {
      console.error('Error scraping data:', error);
      setScrapedData('Error occurred while scraping');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Web Scraper</h2>
      <div className="mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to scrape"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleScrape}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? 'Scraping...' : 'Scrape'}
      </button>
      {scrapedData && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Scraped Data:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{scrapedData}</pre>
        </div>
      )}
    </div>
  );
};

export default WebScraper;