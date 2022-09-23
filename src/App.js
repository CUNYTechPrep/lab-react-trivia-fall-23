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


  const handleClick = () => {
    //clear selectAnswer state so the previous selection(state) 
    //doesn't repeat for new questions
    setSelectedAnswer(null);

    const url = "https://opentdb.com/api.php?amount=1&category=9&type=multiple";
    fetch(url).then(response => response.json())
    .then((data) => {
      /*On the next render following the click, questionData will be set
      to the new question fetched from the API and the card props will pass
      this new data to be rendered */
      setQuestionData(data.results[0]);
    })
  };

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
