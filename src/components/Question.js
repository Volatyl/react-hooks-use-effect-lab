import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    let intervalId = setInterval(
      () => setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1),
      1000
    );

    const timeOut = setTimeout(() => {
      clearInterval(intervalId);
      setTimeRemaining(10);
      onAnswered(false);
    }, 10000);

    return function () {
      clearInterval(intervalId);
      clearTimeout(timeOut);
    };
  }, [onAnswered]);
  console.log(timeRemaining);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
