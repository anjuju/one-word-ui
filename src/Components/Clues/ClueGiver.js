import React from 'react';
import WordCard from '../Cards/WordCard';


class ClueGiver extends React.Component {
  
  state = {
    clue: ''
  }

  handleChange = (e) => {
    this.setState({
      clue: e.target.value
    });
  }
  
  render() {
    const { activePlayer, activeColor, activeWord } = this.props.state;
    return (
      <div className="clue-giver__component">
        <div className="clue-giver__active-word">
          The word <span className={`active-player ${activeColor}`}>{activePlayer}</span> must guess is:
          <WordCard color={activeColor} content={activeWord}/>
        </div>
        <div className="clue-giver__clue">
          Clue: 
          <input type="text" onChange={this.handleChange}/>
          <button className="clue-giver__clue-submit" onClick={()=>this.onSubmit(this.state.clue)}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default ClueGiver;