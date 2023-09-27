import React, { useState } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";

const triviaQuestion = rawTriviaQuestion.results[0];

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(triviaQuestion);

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  let card;

  const handleClick = (event) => {
    // declaring url variable
    let triviaURL = "https://opentdb.com/api.php?amount=1&category=9&type=multiple"
    // fetch url data, turn response into json, then get .results[0]
    fetch(triviaURL)
    .then((result) => result.json())
    .then((fetchData) => {
      console.log(fetchData.results[0])
      //set fetched data to questionData
      setQuestionData(fetchData.results[0]);
      //selectedAnswer becomes null, brings question card back
      setSelectedAnswer(null);
    })
  }

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
        <button className="btn btn-success" onClick={handleClick}>Next Question</button>
        {card}
      </div>
    </div>
  );
}

export default App;
