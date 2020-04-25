import React from 'react';

const NumberCorrect = (props) => (
  <div className="number-correct__container">
    <div className="number-correct number-correct--correct">
      Correct: {props.numberCorrect.correct}
    </div>
    <div className="number-correct number-correct--skip">
      Skipped: {props.numberCorrect.skip}
    </div>
    <div className="number-correct number-correct--wrong">
      Wrong: {props.numberCorrect.wrong}
    </div>
  </div>
);

export default NumberCorrect;