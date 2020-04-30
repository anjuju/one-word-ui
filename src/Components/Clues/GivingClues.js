import React from 'react';
import WordCard from '../Cards/WordCard';


class GivingClues extends React.Component {
  
  state = {
    clue: '',
    submitted: false,
    showGetNewWord: true
  }

  componentDidMount() {
    this.props.socket.on('removeGetNewWord', () => {
      this.setState({
        showGetNewWord: false
      });
    });
  }

  handleChange = (e) => {
    this.setState({
      clue: e.target.value
    });
  }

  submitClue = (e) => {
    const { clue } = this.state;
    if (clue !== '' && !clue.includes(' ')) {
      e.target.disabled = true;
      this.setState({
        submitted: true
      });
      this.props.onSubmit(clue);
    } else {
      alert('Please enter a one-word clue');
    }
  }

  handleGetNewWord = () => {
    this.props.socket.emit('getNewWord');
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
          <button className="clue-giver__clue-submit button--light" onClick={this.submitClue}>Submit</button>
        </div>
        {this.state.submitted ?
          (<div className="player-waiting">
            Please wait while the rest give their clues. <br/>
            <div className="lds-circle"><div></div></div><br/>
            <button onClick={this.props.onProceed} className="clue-giver__btn clue-giver__proceed">Then check clues</button>
          </div>) :
          (this.state.showGetNewWord &&
            <button className="clue-giver__btn clue-giver__new-word" onClick={this.handleGetNewWord}>This word is weird, gimme another</button>)
        }
      </div>
    );
  }
}

export default GivingClues;