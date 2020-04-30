import React from 'react';
import WordCard from '../Cards/WordCard';
import Outcomes from '../Cards/Outcomes';

class Guessing extends React.Component {

  state = {
    outcomes: {
      correct: 0,
      skip: 0,
      wrong: 0,
    }
  }

  componentDidMount() {
    this.props.socket.on('outcomes', data => {
      const { outcomes } = data;
      this.setState({
        outcomes
      });
    });
  }

  updateOutcomes = (outcome) => {
    this.props.socket.emit('updateOutcomes', { outcome });
    this.props.socket.emit('startRound');
  }

  render() {
    return (
      <div className="guessing__container">
        <div className="show-cards">
          {this.props.clues.map(clueBundle => (
            <WordCard key={clueBundle.name} name={clueBundle.player_name} color={clueBundle.color} content={clueBundle.clue} />
          ))}
        </div>
        <div className="guessing_btns">
          <button onClick={()=>this.updateOutcomes('correct')} className="guessing__btn guessing__btn--correct">Correct</button>
          <button onClick={()=>this.updateOutcomes('skip')} className="guessing__btn guessing__btn--skip">Skip</button>
          <button onClick={()=>this.updateOutcomes('wrong')} className="guessing__btn guessing__btn--wrong">Wrong</button>
        </div>
        <Outcomes outcomes={this.state.outcomes} />
      </div>
    );
  }
} 





export default Guessing;