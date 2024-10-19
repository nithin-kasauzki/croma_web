import React, { useState } from 'react';
import axios from 'axios';

const MLModel: React.FC = () => {
  const [input, setInput] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      // In a real application, you would call your ML model API
      const response = await axios.post('/api/predict', { input });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
      setPrediction('Error occurred while making prediction');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">ML Model Interaction</h2>
      <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter input for ML model"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handlePredict}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300"
      >
        {loading ? 'Predicting...' : 'Predict'}
      </button>
      {prediction && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Prediction:</h3>
          <p className="bg-gray-100 p-4 rounded">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default MLModel;