import React, { useState } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";

const triviaQuestion = rawTriviaQuestion.results[0];

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(triviaQuestion);

  // state={
  //   testCore:10
  // }


  var counter=0;

  const getQuestion =() =>{
    
    fetch("https://opentdb.com/api.php?amount=1&category=9&type=multiple")
    .then((res)=> res.json())
    .then((body)=>{
      setQuestionData(body.results[0]);
      setSelectedAnswer(null);
      // setTotal((prevTotal => prevTotal + 1).bind(this), 1000)
     
      // if(selectedAnswer === questionData.correct_answer){
      //   counter+=1;
      //   console.log(selectedAnswer === questionData.correct_answer)
      // }

    });
    

    };

    const selectAnswer = (selection) => {
      setSelectedAnswer(selection);
     
    };
  
    // const [total, setTotal] = React.useState(1)
   
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
        <button className="btn btn-success" onClick={getQuestion}>Next Question</button>
        {card}
   
      </div>
    </div>
  );
}

export default App;
