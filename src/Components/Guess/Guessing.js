import React from 'react';
import WordCard from '../Cards/WordCard';

const Guessing = (props) => (
  <div className="guessing__container">
    <div className="guessing__clue">
      {props.clues.map(clueBundle => (
        <WordCard key={clueBundle.name} name={clueBundle.name} color={clueBundle.color} content={clueBundle.clue} />
      ))}
    </div>
    <button onClick={()=>this.guess('correct')} className="guessing__btn guessing__btn--correct">Correct</button>
    <button onClick={()=>this.guess('skip')} className="guessing__btn guessing__btn--skip">Skip</button>
    <button onClick={()=>this.guess('wrong')} className="guessing__btn guessing__btn--wrong">Wrong</button>
    <button className="guessing__next-round" onClick={props.onNextRound}>Next round</button>
  </div>
);





export default Guessing;