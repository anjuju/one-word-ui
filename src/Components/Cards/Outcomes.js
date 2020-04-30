import React from 'react';

const Outcomes = (props) => (
  <div className="outcomes__container">
    <div className="outcomes outcomes--correct">
      Correct: {props.outcomes.correct}
    </div>
    <div className="outcomes outcomes--skip">
      Skipped: {props.outcomes.skip}
    </div>
    <div className="outcomes outcomes--wrong">
      Wrong: {props.outcomes.wrong}
    </div>
  </div>
);

export default Outcomes;