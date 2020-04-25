import React from 'react';
import './card-styles.scss';

const WordCard = (props) => (
  <div className={`word-card word-card--${props.color}`}>
    {props.name && (<div className="word-card__name">{props.name}</div>)}
    <div className="word-card__content">{props.content}</div>
  </div>
);

export default WordCard;