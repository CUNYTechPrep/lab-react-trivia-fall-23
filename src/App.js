import React, { useState, useEffect } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";

const triviaQuestion = rawTriviaQuestion.results[0];

function App() {
  const api = 'https://opentdb.com/api.php?amount=1&category=9&type=multiple';

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(triviaQuestion);
  
  useEffect(() => {
    console.log('use effect ran');
    fetch(api).then((response)=> {
      console.log('resolved', response);
      return response.json(); // returns a promise 
    }).then((data) => {
      console.log("THis is question", data.results[0]);
      setQuestionData(data.results[0]);
      setSelectedAnswer(null);
     
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
 
  function nextQuestionClickHandler(){
    fetch(api).then((response)=> {
      console.log('resolved', response);
      return response.json(); // returns a promise 
    }).then((data) => {
      console.log("THis is question", data.results[0]);
      setQuestionData(data.results[0]);
      setSelectedAnswer(null);
     
    })
    .catch((err) => {
      console.log(err);
    });
  
  }
  
  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
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
        <button className="btn btn-success" onClick={nextQuestionClickHandler}>Next Question</button>
        {card}
      </div>
    </div>
  );
}

export default App;
