import React from 'react';
import WordCard from './Cards/WordCard';

const ClueGiver = (props) => {
  const { name, color, completeSetup, activePlayer, activeColor, activeWord } = props;
  return (
    <div className="clue-giver__component">
      The word <span className={`active-player ${activeColor}`}>{activePlayer}</span> must guess is:
      <WordCard color={activeColor} content={activeWord}/>
    </div>
  );
}

export default ClueGiver;