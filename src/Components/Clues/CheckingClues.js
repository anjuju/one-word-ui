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
      console.log('removed clues - got new rows');
      this.setState({
        clues: data.clues
      })
    });
  }

  removeClue = (clueBundle, i) => {
    // const newClues = [...this.state.clues];
    // newClues.splice(i, 1);
    // this.setState({
    //   clues: newClues
    // });
    
    this.props.socket.emit('removeClue', { clue: clueBundle.clue });
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
        <button className="check-clues__finish" onClick={this.props.onFinish}>Finished</button>
      </div>
    )
  }
}

export default CheckingClues;