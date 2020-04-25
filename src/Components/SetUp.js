import React from 'react';


const instructions = "This is a collaborative game. One person from your team will try to guess a mystery word using only one-word clues given by the other team members. The other team members cannot discuss their clues. If players write the same clue, they will cancel out and the guesser won't be able to see it."

const colors = ['red', 'hotPink', 'pink', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'black'];


class SetUp extends React.Component {
  state = {
    name: '',
    color: '',
    removeColors: []
  }

  componentDidMount() {
    this.props.socket.on('removeColors', data => {
      let newRemoveColors = [...this.state.removeColors, data.color];
      this.setState({
        removeColors: newRemoveColors
      });
      console.log('removing color', data.color);
      this.onRemoveColor(data.color);
    });
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  onColorSelection = (e) => {
    const color = colors[parseInt(e.target.classList.item(1).replace('setup__color--', ''))-1];
    this.setState({
      color
    });
  }

  onRemoveColor = (color) => {
    let colorNum = colors.indexOf(color)+1;
    if (colorNum > 0) {
      document.getElementById(`choose-color-${colorNum}`).disabled = true;
      document.getElementsByClassName(`setup__color setup__color--${colorNum}`)[0].style.opacity = '0%';
    } else {
      console.log(color + 'not found');
    }
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
          <div className="setup__color__container">
            Choose color:
            {/* <div className="setup__color__row">
              <button onClick={this.onColorSelection} className="setup__color setup__color--red"></button>
              <button onClick={this.onColorSelection} className="setup__color setup__color--hotPink"></button>
              <button onClick={this.onColorSelection} className="setup__color setup__color--pink"></button>
              <button onClick={this.onColorSelection} className="setup__color setup__color--orange"></button>
              <button onClick={this.onColorSelection} className="setup__color setup__color--yellow"></button>
            </div>
            <div className="setup__color__row">
              <button onClick={this.onColorSelection} className="setup__color setup__color--green"></button>
              <button onClick={this.onColorSelection} className="setup__color setup__color--teal"></button>
              <button onClick={this.onColorSelection} className="setup__color setup__color--blue"></button>
              <button onClick={this.onColorSelection} className="setup__color setup__color--purple"></button>
              <button onClick={this.onColorSelection} className="setup__color setup__color--black"></button>
            </div> */}
            <div className="setup__color__row">
              <input id="choose-color-1" type="radio" name="color" className="setup_color__radio" /><label htmlFor="choose-color-1" onClick={this.onColorSelection} className="setup__color setup__color--1"></label>
              <input id="choose-color-2" type="radio" name="color" className="setup_color__radio" /><label htmlFor="choose-color-2" onClick={this.onColorSelection} className="setup__color setup__color--2"></label>
              <input id="choose-color-3" type="radio" name="color" className="setup_color__radio" /><label htmlFor="choose-color-3" onClick={this.onColorSelection} className="setup__color setup__color--3"></label>
              <input id="choose-color-4" type="radio" name="color" className="setup_color__radio" /><label htmlFor="choose-color-4" onClick={this.onColorSelection} className="setup__color setup__color--4"></label>
              <input id="choose-color-5" type="radio" name="color" className="setup_color__radio" /><label htmlFor="choose-color-5" onClick={this.onColorSelection} className="setup__color setup__color--5"></label>
            </div>
            <div className="setup__color__row">
              <input id="choose-color-6" type="radio" name="color" className="setup_color__radio" /><label htmlFor="choose-color-6" onClick={this.onColorSelection} className="setup__color setup__color--6"></label>
              <input id="choose-color-7" type="radio" name="color" className="setup_color__radio" /><label htmlFor="choose-color-7" onClick={this.onColorSelection} className="setup__color setup__color--7"></label>
              <input id="choose-color-8" type="radio" name="color" className="setup_color__radio" /><label htmlFor="choose-color-8" onClick={this.onColorSelection} className="setup__color setup__color--8"></label>
              <input id="choose-color-9" type="radio" name="color" className="setup_color__radio" /><label htmlFor="choose-color-9" onClick={this.onColorSelection} className="setup__color setup__color--9"></label>
              <input id="choose-color-10" type="radio" name="color" className="setup_color__radio"/><label htmlFor="choose-color-10" onClick={this.onColorSelection} className="setup__color setup__color--10"></label>
            </div>
          </div>
          <button className="setup__submit" onClick={()=>this.props.onSubmitName(this.state.name, this.state.color)}>Submit</button>
        </div>
        <div className="setup__start-game">
          When all of the players are ready, press: 
          <button className="setup__start-game__button" onClick={this.props.onStartGame}>Start Game</button>
        </div>
      </section>
    )
  }


}

export default SetUp;