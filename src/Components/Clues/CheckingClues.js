import React from 'react';
import WordCard from '../Cards/WordCard';

class CheckingClues extends React.Component {
  state = {
    clues: []
  }

  componentDidMount() {  
    this.setState({
      clues: this.props.clues
    })
    this.props.socket.on('removingClues', data => {
      this.setState({
        clues: data.clues
      })
    });
  }

  removeClue = (clueBundle, i) => {
    this.props.socket.emit('removeClue', { clue: clueBundle.clue });
  }

  onFinishChecking = () => {
    this.props.socket.emit('finishCheckingClues');
  }
 
  render() {
    return (
      <div className="check-clues__container">
        Please remove any duplicate clues.
        <div className="show-cards">
          {this.state.clues.map((clueBundle, i) => (
            <div key={clueBundle.player_name} className="check-clues__clue">
              <WordCard name={clueBundle.player_name} color={clueBundle.color} content={clueBundle.clue} />
              <button className="check-clues__remove-btn" onClick={()=>this.removeClue(clueBundle, i)}>X</button>
            </div>
          ))}
        </div>
        <button className="check-clues__finish button--light" onClick={this.onFinishChecking}>Finished</button>
      </div>
    )
  }
}

export default CheckingClues;