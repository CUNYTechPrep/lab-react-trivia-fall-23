import React, { useState } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";

const triviaQuestion = rawTriviaQuestion.results[0];

const decodeHTMLEntities = (text) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  return doc.documentElement.textContent;
};

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(triviaQuestion);

  let decodedQuestion = decodeHTMLEntities(questionData.question);
  let decodedCorrectAnswer = decodeHTMLEntities(questionData.correct_answer);
  let decodedIncorrectAnswers = questionData.incorrect_answers.map(answer => decodeHTMLEntities(answer));
  
  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  const handleClick = async (event) => {
    
    try {
      let response = await fetch('https://opentdb.com/api.php?amount=1&category=9&type=multiple');
      let body = await response.json();
      console.log('Success:', body);
      setSelectedAnswer(null);
      setQuestionData(body.results[0]);
    } catch(error) {
      console.log('Error:', error);
    }
    
   
  }



  let card;

  if (selectedAnswer) {
    card = (
      <ResultCard
        correct={selectedAnswer === decodedCorrectAnswer}
        answer={decodedCorrectAnswer}
      />
    );
  } else {
    let options = [
      decodedCorrectAnswer,
      ...decodedIncorrectAnswers,
    ];
    card = (
      <QuestionCard
        question={decodedQuestion}
        options={shuffleArray(options)}
        selectAnswer={selectAnswer}
      />
    );
  }

  // Inside your App component

  

  return (
    <div className="w-100 my-5 d-flex justify-content-center align-items-center">
      <div style={{ maxWidth: "45%" }}>
        <h1 className="text-center">Trivia App</h1>
        <button onClick={handleClick} className="btn btn-success">Next Question</button>
        {card}
      </div>
    </div>
  );
}

export default App;
