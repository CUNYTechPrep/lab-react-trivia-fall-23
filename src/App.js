import React, { useEffect, useState } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(null);

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  const handleNextQuestion = () => {
    fetch("https://opentdb.com/api.php?amount=1&category=9&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        const newQuestion = data.results[0];
        setQuestionData(newQuestion);
        setSelectedAnswer(null);
      })
      .catch((error) => console.error("Error fetching qiestion:", error));
  };

  useEffect(() => {
    handleNextQuestion();
  }, [])

  let card;

  if (selectedAnswer !== null) {
    card = (
      <ResultCard
        correct={selectedAnswer === questionData.correct_answer}
        answer={questionData.correct_answer}
      />
    );
  } else if(questionData) {
    let options = [
      questionData.correct_answer,
      ...questionData.incorrect_answers,
    ];
    card = (
      <QuestionCard
        question={questionData.question}
        options={shuffleArray(options)}
        selectAnswer={selectAnswer}
      />
    );
  }

  return (
    <div className="w-100 my-5 d-flex justify-content-center align-items-center">
      <div style={{ maxWidth: "45%" }}>
        <h1 className="text-center">Trivia App</h1>
        <button className="btn btn-success" onClick={handleNextQuestion}>Next Question</button>
        {card}
      </div>
    </div>
  );
}

export default App;
