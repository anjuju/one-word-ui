import React from 'react';
import WordCard from '../Cards/WordCard';
import Outcomes from '../Cards/Outcomes';

const Guessing = (props) => {
  const { clues, updateOutcomes, outcomes, active } = props;
  return (
    <div className="guessing__container">
      <span className={`active-player--${active.activeColor}`}>{active.activePlayer}</span>, please guess now (verbally)!
      <div className="show-cards">
        {clues.map(clueBundle => (
          <WordCard key={clueBundle.name} name={clueBundle.player_name} color={clueBundle.color} content={clueBundle.clue} />
        ))}
      </div>
      <div className="guessing_btns">
        <button onClick={()=>updateOutcomes('correct')} className="guessing__btn guessing__btn--correct">Correct</button>
        <button onClick={()=>updateOutcomes('skip')} className="guessing__btn guessing__btn--skip">Skip</button>
        <button onClick={()=>updateOutcomes('wrong')} className="guessing__btn guessing__btn--wrong">Wrong</button>
      </div>
      <Outcomes outcomes={outcomes} />
    </div>
  );
} 





export default Guessing;