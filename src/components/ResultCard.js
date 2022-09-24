import React, { Fragment } from "react";

function ResultCard({ correct, answer }) {
  return (
    <Fragment>
      <h2>You answer is {correct ? `correct ✅` : `wrong ❌`}</h2>
      {!correct && <p>The correct answer was {answer}</p>}
    </Fragment>
  );
}

export default ResultCard;
