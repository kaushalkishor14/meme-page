import React from 'react';
import MemeComponent from './MemeComponent';
import './App.css';

function App() {
  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <header className="App-header">
        <MemeComponent />
      </header>
    </div>
  );
}

export default App;
