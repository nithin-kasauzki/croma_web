import React from 'react';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <main className="w-full max-w-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Chatbot with ML Integration</h1>
        <Chatbot />
      </main>
    </div>
  );
}

export default App;