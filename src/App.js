import React, { useState, useEffect } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  const fetchNewQuestion = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=1&category=9&type=multiple"
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setQuestionData(data.results[0]);
      } else {
        console.error("No question data found in the API response.");
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    }

    setIsLoading(false); 
  };

  useEffect(() => {
    fetchNewQuestion();
  }, []); 

  const handleNextQuestionClick = () => {
    setSelectedAnswer(null);
    fetchNewQuestion();
  };

  let card;

  if (isLoading) {
    card = <p>Loading...</p>;
  } else if (selectedAnswer) {
    card = (
      <ResultCard
        correct={selectedAnswer === questionData.correct_answer}
        answer={questionData.correct_answer}
      />
    );
  } else if (questionData) {
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
        <button className="btn btn-success" onClick={handleNextQuestionClick}>
          Next Question
        </button>
        {card}
      </div>
    </div>
  );
}

export default App;
