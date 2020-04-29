import React from 'react';
import WordCard from '../Cards/WordCard';

const Guessing = (props) => (
  <div className="guessing__container">
    <div className="show-cards">
      {props.clues.map(clueBundle => (
        <WordCard key={clueBundle.name} name={clueBundle.player_name} color={clueBundle.color} content={clueBundle.clue} />
      ))}
    </div>
    <button onClick={()=>props.onGuess('correct')} className="guessing__btn guessing__btn--correct">Correct</button>
    <button onClick={()=>props.onGuess('skip')} className="guessing__btn guessing__btn--skip">Skip</button>
    <button onClick={()=>props.onGuess('wrong')} className="guessing__btn guessing__btn--wrong">Wrong</button>
  </div>
);





export default Guessing;