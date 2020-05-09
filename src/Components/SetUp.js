import React from 'react';


const instructions = "This is a collaborative game. One person from your team will try to guess a mystery word using only one-word clues given by the other team members. The other team members cannot discuss their clues. If players write the same clue, they will cancel out and the guesser won't be able to see it. The game will end after 15 rounds."

const colors = ['red', 'hotPink', 'pink', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'black'];


class SetUp extends React.Component {
  state = {
    name: '',
    color: '',
    submitted: false,
    gameStarted: false
  }

  componentDidMount() {
    const { socket } = this.props;
    
    socket.on('removeColors', data => {
      //console.log('removing color', data.color);
      this.onRemoveColor(data.color);
    });
    socket.on('gameStarted', () => {
      this.setState({
        gameStarted: true
      });
    });
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  onColorSelection = (e) => {
    const color = e.target.classList.item(1).replace('setup__color--', '');
    this.setState({
      color
    });
  }

  onRemoveColor = (color) => {
    if (colors.includes(color) && document.getElementById(`choose-color-${color}`)) {
      document.getElementById(`choose-color-${color}`).disabled = true;
      document.getElementsByClassName(`setup__color setup__color--${color}`)[0].style.opacity = '0%';
    } else {
      console.log(color + ' not found');
    }
  }

  submitName = () => {
    const { name, color } = this.state;
    
    if (name !== '' && color !== '') {
  
    this.props.onSubmitName(this.state.name, this.state.color);
    
    this.setState({
      submitted: true
    });
    } else {
      alert('Please enter your name and choose a color.');
    }
  }

  handleStartOrJoinGame = (enter) => {
    this.props.socket.emit(enter);
  }

  render() {
    const { submitted, gameStarted } = this.state;
    return (
      <section className="setup__container">
        <section className="setup__instructions">
          <div className="setup__instructions--title">Instructions:</div>
          {instructions}
        </section>
        <div className="setup__name__container">
          <label className="setup__name__label">Name: 
            <input type="text" onChange={this.handleChange}/>
          </label>
          <div className="setup__color__container">
            Choose color:
            <div className="setup__color__row">
              <input id={`choose-color-${colors[0]}`} type="radio" name="color" className="setup_color__radio" /><label htmlFor={`choose-color-${colors[0]}`} onClick={this.onColorSelection} className={`setup__color setup__color--${colors[0]}`}></label>
              <input id={`choose-color-${colors[1]}`} type="radio" name="color" className="setup_color__radio" /><label htmlFor={`choose-color-${colors[1]}`} onClick={this.onColorSelection} className={`setup__color setup__color--${colors[1]}`}></label>
              <input id={`choose-color-${colors[2]}`} type="radio" name="color" className="setup_color__radio" /><label htmlFor={`choose-color-${colors[2]}`} onClick={this.onColorSelection} className={`setup__color setup__color--${colors[2]}`}></label>
              <input id={`choose-color-${colors[3]}`} type="radio" name="color" className="setup_color__radio" /><label htmlFor={`choose-color-${colors[3]}`} onClick={this.onColorSelection} className={`setup__color setup__color--${colors[3]}`}></label>
              <input id={`choose-color-${colors[4]}`} type="radio" name="color" className="setup_color__radio" /><label htmlFor={`choose-color-${colors[4]}`} onClick={this.onColorSelection} className={`setup__color setup__color--${colors[4]}`}></label>
            </div>
            <div className="setup__color__row">
              <input id={`choose-color-${colors[5]}`} type="radio" name="color" className="setup_color__radio" /><label htmlFor={`choose-color-${colors[5]}`}onClick={this.onColorSelection} className={`setup__color setup__color--${colors[5]}`}></label>
              <input id={`choose-color-${colors[6]}`} type="radio" name="color" className="setup_color__radio" /><label htmlFor={`choose-color-${colors[6]}`}onClick={this.onColorSelection} className={`setup__color setup__color--${colors[6]}`}></label>
              <input id={`choose-color-${colors[7]}`} type="radio" name="color" className="setup_color__radio" /><label htmlFor={`choose-color-${colors[7]}`}onClick={this.onColorSelection} className={`setup__color setup__color--${colors[7]}`}></label>
              <input id={`choose-color-${colors[8]}`} type="radio" name="color" className="setup_color__radio" /><label htmlFor={`choose-color-${colors[8]}`}onClick={this.onColorSelection} className={`setup__color setup__color--${colors[8]}`}></label>
              <input id={`choose-color-${colors[9]}`} type="radio" name="color" className="setup_color__radio" /><label htmlFor={`choose-color-${colors[9]}`}onClick={this.onColorSelection} className={`setup__color setup__color--${colors[9]}`}></label>
            </div>
          </div>
          {submitted ?
            (gameStarted ?
              <button className="setup__start-game__button button--light" onClick={()=>this.handleStartOrJoinGame('joinGame')}>Join Game</button> :
              (<div className="setup__start-game">
                When all of the players are ready, press: 
                <button className="setup__start-game__button button--light" onClick={()=>this.handleStartOrJoinGame('startRound')}>Start Game</button>
              </div>)
            ) :
            <button className="setup__submit" onClick={this.submitName}>Submit</button>
          }
        </div>
        
      </section>
    )
  }


}

export default SetUp;