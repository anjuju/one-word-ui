import React from 'react';


const instructions = "This is a collaborative game. One person from your team will try to guess a mystery word using only one-word clues given by the other team members. The other team members cannot discuss their clues. If players write the same clue, it will cancel out and the guesser won't be able to see it."

class SetUp extends React.Component {
  state = {
    name: ''
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  render() {
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
          <button className="setup__submit" onClick={()=>this.props.onSubmitName(this.state.name)}>Submit</button>
        </div>
        <div className="setup__start-game">
          When all of the players have entered their names, press Start Game.
          <button className="setup__start-game__button" onClick={this.props.onStartGame}>Start Game</button>
        </div>
      </section>
    )
  }


}

export default SetUp;