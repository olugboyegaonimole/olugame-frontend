import React, { useState } from "react";
import Game from "./components/Game";

const App = () => {
  const [difficulty, setDifficulty] = useState(null);

  return (
    <div className="app">
      {difficulty ? (
        <Game difficulty={difficulty} onRestart={() => setDifficulty(null)} />
      ) : (
        <div className="home">
          <h1>Synonym Game</h1>
          <button onClick={() => setDifficulty("easy")}>Easy</button>
          <button onClick={() => setDifficulty("medium")}>Medium</button>
          <button onClick={() => setDifficulty("hard")}>Hard</button>
        </div>
      )}
    </div>
  );
};

export default App;
