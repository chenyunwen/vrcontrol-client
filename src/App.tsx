import React from 'react';
import logo from './logo.svg';
import './App.css';
import WebSocketComponent from './components/WebSocketComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WebSocketComponent/>
      </header>
    </div>
  );
}

export default App;
