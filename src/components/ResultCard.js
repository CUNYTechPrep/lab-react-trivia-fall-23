import React from "react";

function ResultCard({ correct, answer, score, total }) {
  return (
    <>
      <h2>You answer is {correct ? `correct ✅` : `wrong ❌`}</h2>
      {!correct && <p>The correct answer was {answer}</p>}
      {/* <p>The number of correct answers {score} out of {total}</p> */}
    </>
  );
}

export default ResultCard;
