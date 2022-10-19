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
  let [total, setTotal] = React.useState(1)
  let [score, setScore] = React.useState(0)
  const getQuestion =() =>{
    
    fetch("https://opentdb.com/api.php?amount=1&category=9&type=multiple")
    .then((res)=> res.json())
    .then((body)=>{
      if(selectedAnswer === questionData.correct_answer){
        setScore(score +1)
       
        console.log(selectedAnswer === questionData.correct_answer)
      }
      setTotal(total+1)
      setQuestionData(body.results[0]);
      setSelectedAnswer(null);
           



    });
    

    };

    const selectAnswer = (selection) => {
      setSelectedAnswer(selection);
     
    };
  

   
    let card;

   

  if (selectedAnswer) {
   
    
    card = (
      <ResultCard
        correct={selectedAnswer === questionData.correct_answer}
        answer={questionData.correct_answer}
        score = {score}
        total = {total}

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
       
        {card}
        <button className="btn btn-success mt-4 w-100" onClick={getQuestion}>Next Question</button>
      </div>
    </div>
  );
}

export default App;
