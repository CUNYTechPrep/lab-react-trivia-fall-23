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


  const fetchTriviaQuestions = () => {
    // Begin initial fetch to Trivia API
    fetch("https://opentdb.com/api.php?amount=1&category=9&type=multiple")
        // convert response data to JSON
        .then((res) => res.json())
        // now that we have the actual data we pass set the question and selected answer
        .then((data) => {
          setQuestionData(data.results[0]);
          setSelectedAnswer();
        });
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
        {/* when we click the "Next question" button we fetch  */}
        <button className="btn btn-success" onClick={ fetchTriviaQuestions } >Next Question</button>
        {card}
      </div>
    </div>
  );
}

export default App;
