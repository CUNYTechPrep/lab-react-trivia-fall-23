import React, { useState } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";

const triviaQuestion = rawTriviaQuestion.results[0];

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null); // if null, user hasn't selected anything yet
  const [questionData, setQuestionData] = useState(triviaQuestion);

  const getNextQuestion = () => {
    console.log("Next question requested");
  };
  
  const selectAnswer = (selection) => {
    setSelectedAnswer(selection); // value passed (selection) is stored in the selectedAnswer state
  };

  let card;

  if (selectedAnswer) {
    card = (
      <ResultCard
         correct={selectedAnswer === questionData.correct_answer}
        answer={questionData.correct_answer}
      />
    );
  } else {
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
        <button className="btn btn-success" onClick={getNextQuestion}>Next Question</button>
        {card}
      </div>
    </div>
  );
}

export default App;
