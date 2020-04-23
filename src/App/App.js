import React from 'react';
import './App.scss';

import SetUp from '../Components/SetUp';
// import Guesser from '../Components/Guesser';
// import ClueGiver from '../Components/ClueGiver';

class App extends React.Component {
  state = {
    name: '',
    color: '',
  }

  handleSubmitName = (name, color) => {
    this.setState({
      name,
      color
    })
  }

  handleStartGame = () => {

  }

  render() {
    return (
      <div className="App__container">
        <header>
          <h1>One Word</h1>
        </header>
        <main>
          <SetUp onSubmitName={this.handleSubmitName} onStartGame={this.handleStartGame}/>
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;
