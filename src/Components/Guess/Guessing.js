import React from 'react';
import WordCard from '../Cards/WordCard';
import Outcomes from '../Cards/Outcomes';

class Guessing extends React.Component {
  
  revealWord = (e) => {
    let confirmReveal = window.confirm('Are you sure you want to reveal the word?');

    if (confirmReveal) {
      const activeWord = document.getElementById('guessing__active-word');
      activeWord.style.display = 'block';
    }
  }

  updateOutcomes = (outcome) => {
    const nextRoundBtn = document.getElementById('guessing_next-round-btn')
    nextRoundBtn.style.display = 'block';
    nextRoundBtn.style.margin = '1vw auto';
    
    this.props.socket.emit('updateOutcomes', { outcome });
  }

  nextRound = () => {
    document.getElementById('guessing_next-round-btn').style.display = 'block';
    
    this.props.socket.emit('startRound');
  }
  
  render() {
    const { clues, outcomes, stats, active } = this.props;
    return (
      <div className="guessing__container">
        <span className={`active-player--${active.activeColor}`}>{active.activePlayer}</span>, please guess now (verbally)!
        <div className="guessing_btns">
          <button onClick={()=>this.updateOutcomes('correct')} className="guessing__btn guessing__btn--correct">Correct</button>
          <button onClick={()=>this.updateOutcomes('skip')} className="guessing__btn guessing__btn--skip">Skip</button>
          <button onClick={()=>this.updateOutcomes('wrong')} className="guessing__btn guessing__btn--wrong">Wrong</button>
        </div>
        <button onClick={this.nextRound} id="guessing_next-round-btn" className="button--light">Next Round</button>
        <div className="show-cards">
          {clues.map(clueBundle => (
            <WordCard key={clueBundle.player_name} name={clueBundle.player_name} color={clueBundle.color} content={clueBundle.clue} />
          ))}
        </div>
        <button onClick={this.revealWord} className="guessing__reveal-word">Reveal Word</button>
        <div id="guessing__active-word">
          <WordCard color={active.activeColor} content={active.activeWord} />
        </div>
        <Outcomes outcomes={outcomes} stats={stats} />
      </div>
    );
  }
  
} 





export default Guessing;