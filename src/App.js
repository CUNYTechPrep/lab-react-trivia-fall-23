import React, { useState } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";

const triviaQuestion = rawTriviaQuestion.results[0];

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(triviaQuestion);

//  const response =  fetch('https://opentdb.com/api.php?amount=1&category=9&type=multiple')
//   .then((response) => response.json())
//   .then((questionData) => {
  
//   });
//  const nextQuest = () => { setQuestionData(questionData)};
const nextQuest = async (event) => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=1&category=9&type=multiple');
      const result = await response.json();
    
    //feed the result 
    setQuestionData(result.results[0]); //set next question
    setSelectedAnswer(null); // not answered yet// restart/reset

      //can be an option.
      // result.results.forEach((item, index) => {
      // setQuestionData(result.results[index]);
      //  });
      
    }
    catch (e) {
      console.log(e.message)
    }
      
  };


    //set the answer
  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  let card;
   //if there is an answer show ResultCard
  if (selectedAnswer) {
    card = (
      <ResultCard
        correct={selectedAnswer === questionData.correct_answer}// show if correct or not
        answer={questionData.correct_answer} // show correct answer
      />
      
    );
    //else next question
  } else{ // set answer options
    let options = [
      questionData.correct_answer,
      ...questionData.incorrect_answers,
    ];
    card = (  // new question
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
        <button className="btn btn-success"  onClick={(nextQuest)}>Next Question</button>
        {/* show card:question or result */}
        {card}
      </div>
    </div>
  );
}

export default App;
