import React from "react";
import AnswerButton from "./AnswerButton";

function QuestionCard({ question, options, selectAnswer }) {
  
  return (
    <>
      <h2>{question.replace(/&quot;|&#039;/g, '"')}</h2>
      {options.map((option) => (
        
        <AnswerButton
          key={option.replace(/&quot;|&#039;/g, '"')}
          value={option.replace(/&quot;|&#039;/g, '"')}
          handleClick={() => selectAnswer(option.replace(/&quot;|&#039;/g, '"'))}
        />
      ))}
    </>
  );
}

export default QuestionCard;
