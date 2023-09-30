import React, { useState, useEffect } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";
const apiUrl = "https://opentdb.com/api.php?amount=1&category=9&type=multiple";

let apiData

const triviaQuestion = rawTriviaQuestion.results[0];
function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(triviaQuestion);//it needs to initialize with this first question

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };
  useEffect(()=>{
    fetch(apiUrl) // fetch data whenever the state of questionData changes!
      .then(raw => raw.json())
      .then(data => apiData = data.results[0])
      .catch(err => console.error(err));
  }, [questionData]);

  function changeQuestion(){
    setSelectedAnswer(false); // set to false because we want to change the question and stay on question card no matter what
    setQuestionData(apiData);
  }
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
        <button className="btn btn-success" onClick={changeQuestion}>Next Question</button>
        {card}
      </div>
    </div>
  );
}

export default App;
