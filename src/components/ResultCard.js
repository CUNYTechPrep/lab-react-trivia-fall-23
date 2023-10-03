import React from "react";

function ResultCard({ correct, answer }) {
  return (
    <>
      <h2>Your answer is {correct ? `correct ✅` : `wrong ❌`}</h2>
      {!correct && <p>The correct answer was {answer}</p>}
    </>
  );
}

export default ResultCard;
