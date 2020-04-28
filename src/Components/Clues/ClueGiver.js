import React from 'react';
import WordCard from '../Cards/WordCard';


class ClueGiver extends React.Component {
  
  state = {
    clue: '',
    submitted: false
  }

  handleChange = (e) => {
    this.setState({
      clue: e.target.value
    });
  }

  submitClue = () => {
    this.setState({
      submitted: true
    });
    this.props.onSubmit(this.state.clue);
  }
  
  render() {
    const { activePlayer, activeColor, activeWord } = this.props.active;
    return (
      <div className="clue-giver__component">
        <div className="clue-giver__active-word">
          The word <span className={`active-player--${activeColor}`}>{activePlayer}</span> must guess is:
          <WordCard color={activeColor} content={activeWord}/>
        </div>
        <div className="clue-giver__clue">
          Clue: 
          <input type="text" onChange={this.handleChange}/>
          <button className="clue-giver__clue-submit" onClick={this.submitClue}>
            Submit 
          </button>
          {this.state.submitted && (<p className="clue-giver__submitted">&#10004;</p>)}
        </div>
      </div>
    );
  }
}

export default ClueGiver;