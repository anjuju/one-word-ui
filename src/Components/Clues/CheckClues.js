import React from 'react';
import WordCard from '../Cards/WordCard';

class CheckClues extends React.Component {
  state = {
    clues: []
  }

  componentDidMount() {
    this.setState({
      clues: this.props.clues
    })
  }

  removeClue = (clueBundle, i) => {
    const newClues = [...this.state.clues];
    newClues.splice(i, 1);
    this.setState({
      clues: newClues
    });
    this.props.onRemove(clueBundle.clue)
  }
 
  render() {
    return (
      <div className="check-clues__container">
        {this.state.clues.map((clueBundle, i) => (
          <div key={clueBundle.player_name} className="check-clues__clue">
            <WordCard name={clueBundle.name} color={clueBundle.color} content={clueBundle.clue} />
            <button className="check-clues__remove-btn" onClick={()=>this.removeClue(clueBundle, i)}>X</button>
          </div>
        ))}
        <button className="check-clues__finish" onClick={this.props.onFinish}>Finished</button>
      </div>
    )
  }
}

export default CheckClues;