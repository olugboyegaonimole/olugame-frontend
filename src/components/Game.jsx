import React, { useState, useEffect } from 'react';

const Game = ({ level, onReturnToHome }) => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Fetch the words for the selected level
    fetch(`https://olugame-backend.onrender.com/words/${level}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setWords(data);
        }
      });
  }, [level]);

  const handleOptionSelect = (option) => {
    if (selectedOption !== null) return; // Prevent multiple selections

    const correctAnswer = words[currentWordIndex].answer;
    if (option === correctAnswer) {
      setScore(score + 1);
    }

    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentWordIndex + 1 < words.length) {
      setCurrentWordIndex(currentWordIndex + 1);
      setSelectedOption(null);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setGameOver(false);
    setSelectedOption(null);
  };

  if (gameOver) {
    return (
      <div className="game-over">
        <h2>Game Over! Final Score: {score}/{words.length}</h2>
        <button onClick={onReturnToHome}>🏠 Return to Home</button>
      </div>
    );
  }

  if (words.length === 0) {
    return <div>Loading...</div>;
  }

  const currentWord = words[currentWordIndex];
  const { word, options } = currentWord;

  return (
    <div className="game-container">
      <h2>{level}</h2>
      <div className="word-container">
        <h3>{word}</h3>
        <div className="options">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              disabled={selectedOption !== null}
              className={selectedOption === option ? (option === currentWord.answer ? 'correct' : 'incorrect') : ''}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="progress">
        <p>Question {currentWordIndex + 1} of {words.length}</p>
        <p>Score: {score}</p>
      </div>
      {selectedOption !== null && (
        <button onClick={handleNextQuestion}>Next Question</button>
      )}
    </div>
  );
};

export default Game;
