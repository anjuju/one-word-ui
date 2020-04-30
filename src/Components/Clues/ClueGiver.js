import React from 'react';
import WordCard from '../Cards/WordCard';


class ClueGiver extends React.Component {
  
  state = {
    clue: '',
    submitted: false
  }

  componentDidMount() {
  }

  handleChange = (e) => {
    this.setState({
      clue: e.target.value
    });
  }

  submitClue = () => {
    const { clue } = this.state;
    if (clue !== '' && !clue.includes(' ')) {
      this.setState({
        submitted: true
      });
      this.props.onSubmit(clue);
    } else {
      alert('Please enter a one-word clue');
    }
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
          {!this.state.submitted ? 
          <button className="clue-giver__clue-submit" onClick={this.submitClue}>Submit</button> :
          <div className="clue-giver__submitted">&#10004;</div>
          }
        </div>
        {this.state.submitted ?
          (<div className="player-waiting">
            Please wait while the rest give their clues. <br/>
            <div class="lds-circle"><div></div></div><br/>
            <button onClick={this.props.onProceed} className="clue-giver__btn clue-giver__proceed">Then check clues</button>
          </div>) :
          <button className="clue-giver__btn clue-giver__new-word" onClick={this.props.getNewWord}>This word is weird, gimme another</button>
        }
        
      </div>
    );
  }
}

export default ClueGiver;