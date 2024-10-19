import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Simple ML model simulation
const simulateMLModel = async (input) => {
  // In a real scenario, you would load and use your ML model here
  // For this example, we'll use a simple keyword-based response
  const keywords = {
    'hello': 'Hello! How can I assist you today?',
    'how are you': 'I'm doing well, thank you for asking. How about you?',
    'bye': 'Goodbye! Have a great day!',
    'help': 'I'm here to help. What do you need assistance with?'
  };

  for (const [key, value] of Object.entries(keywords)) {
    if (input.toLowerCase().includes(key)) {
      return value;
    }
  }

  return "I'm not sure how to respond to that. Can you please rephrase or ask something else?";
};

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const reply = await simulateMLModel(userMessage);
    res.json({ reply });
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});