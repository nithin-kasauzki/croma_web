import React, { useState } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { text: input, sender: 'user' }]);
      setInput('');

      try {
        const response = await axios.post('/api/chat', { message: input });
        setMessages(prev => [...prev, { text: response.data.reply, sender: 'bot' }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prev => [...prev, { text: 'Sorry, I encountered an error.', sender: 'bot' }]);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-grow mr-2 p-2 border rounded"
        />
        <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;