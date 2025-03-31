import React, { useState } from 'react';
import Game from './components/Game';
import './styles.css';

const App = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleReturnToHome = () => {
    setSelectedLevel(null); // Reset to show the level selection screen
  };

  return (
    <div className="app-container">
      {!selectedLevel ? (
        <div className="level-selection">
          <h1>Synonyms!</h1>
          <p>Select a difficulty level to start playing:</p>
          <div className="level-buttons">
            {Array.from({ length: 7 }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handleLevelSelect(`Level ${i + 1}`)}
              >
                Level {i + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <Game level={selectedLevel} onReturnToHome={handleReturnToHome} />
      )}
    </div>
  );
};

export default App;
