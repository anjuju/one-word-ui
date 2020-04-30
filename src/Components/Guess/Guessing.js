import React from 'react';
import WordCard from '../Cards/WordCard';
import Outcomes from '../Cards/Outcomes';

const Guessing = (props) => (
  <div className="guessing__container">
    <div className="show-cards">
      {props.clues.map(clueBundle => (
        <WordCard key={clueBundle.name} name={clueBundle.player_name} color={clueBundle.color} content={clueBundle.clue} />
      ))}
    </div>
    <div className="guessing_btns">
      <button onClick={()=>props.onGuess('correct')} className="guessing__btn guessing__btn--correct">Correct</button>
      <button onClick={()=>props.onGuess('skip')} className="guessing__btn guessing__btn--skip">Skip</button>
      <button onClick={()=>props.onGuess('wrong')} className="guessing__btn guessing__btn--wrong">Wrong</button>
    </div>
    <Outcomes outcomes={props.outcomes} />
  </div>
);





export default Guessing;