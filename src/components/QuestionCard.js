import React, { Fragment } from "react";
import AnswerButton from "./AnswerButton";

function QuestionCard({ question, options, selectAnswer }) {
  return (
    <Fragment>
      <h2>{question}</h2>
      {options.map((option) => (
        <AnswerButton
          key={option}
          value={option}
          handleClick={() => selectAnswer(option)}
        />
      ))}
    </Fragment>
  );
}

export default QuestionCard;
