import React from 'react';

const WordCard = (props) => (
  <div className={`word-card word-card--${props.color}`}>
    {props.name && <div className={`word-card__name active-player--${props.color}`}>{props.name}</div>}
    <div className="word-card__content">{props.content}</div>
  </div>
);

export default WordCard;