import React from 'react';
import WordCard from '../Cards/WordCard';

class CheckClues extends React.Component {
  
 
  render() {
    const { clues } = this.props;
    return (
      <div className="check-clues__container">
        {clues.map(clueBundle => (
          <div key={clueBundle.name} className="check-clues__clue">
            <WordCard name={clueBundle.name} color={clueBundle.color} content={clueBundle.clue} />
            <button className="check-clues__remove-btn" onClick={()=>this.props.onRemove(clueBundle.clue)}>Remove clue</button>
          </div>
        ))}
        <button className="check-clues__finish" onClick={this.props.onFinish}>Finished</button>
      </div>
    )
  }
}

export default CheckClues;