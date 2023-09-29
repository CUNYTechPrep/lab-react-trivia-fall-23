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
  const fetchData = async () => {
    try {
      let data = await fetch('https://opentdb.com/api.php?amount=1&category=9&type=multiple');
      let body = await data.json();
      setQuestionData(body.results[0])
      console.log('Success', body);
     
    }
    catch (err) {
      console.log(err);
    }
  }
  
  let card;
  const handleQuestion = () => {
    setSelectedAnswer(null);
    fetchData();
  };
  if (selectedAnswer) {
    card = (
      <ResultCard
        correct={selectedAnswer === questionData.correct_answer}
        answer={questionData.correct_answer}
      />
    );
  } else {
    let options = [];
    if (questionData.incorrect_answers) {
      options = [questionData.correct_answer,
        ...questionData.incorrect_answers
      ]
    }
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
        <button className="btn btn-success" onClick={handleQuestion}>Next Question</button>
        {card}
      </div>
    </div>
  );
}

export default App;
