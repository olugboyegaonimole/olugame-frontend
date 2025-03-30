import React, { useState, useEffect } from "react";

const Game = ({ difficulty, onGameOver }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);

useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/get_words/${difficulty}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Questions:", data); // Debugging line
        setQuestions(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [difficulty]);

  const handleAnswerClick = (answer) => {
    if (gameOver || !questions.length) return;

    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion || !currentQuestion.correct_answer) {
      setFeedback("Error: Correct answer missing!");  // Debugging check
      return;
    }

    if (answer === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong! The correct answer was: ${currentQuestion.correct_answer}`);
    }

    setSelectedAnswer(answer);

    setTimeout(() => {
      if (currentQuestionIndex < 9) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
        setFeedback("");
      } else {
        setGameOver(true);
        onGameOver(score + (answer === currentQuestion.correct_answer ? 1 : 0)); // Send correct final score
      }
    }, 1000);
  };

  return (
    <div className="game-container">
      {gameOver ? (
        <div className="game-over">
          <h2>Game Over! Final Score: {score}/10</h2>
          <button onClick={() => window.location.reload()}>🏠 Return to Home</button>
        </div>
      ) : questions.length > 0 ? (
        <div>
          <h2>Question {currentQuestionIndex + 1} of 10</h2>
          <h3>{questions[currentQuestionIndex].word}</h3>
          <div className="options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className={selectedAnswer === option ? "selected" : ""}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
          {feedback && <p className="feedback">{feedback}</p>}
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Game;
