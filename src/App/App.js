import React from 'react';
import './App.scss';

import SetUp from '../Components/SetUp';
// import Guesser from '../Components/Guesser';
// import ClueGiver from '../Components/ClueGiver';

/* Socket IO */
import socketIOClient from 'socket.io-client';
const socketEndPoint = 'http://localhost:8080/';

// Connect to the socket
const socket = socketIOClient(socketEndPoint); 

const api = process.env.REACT_APP_ONE_WORD_API;

class App extends React.Component {
  state = {
    name: '',
    color: '',
  }

  handleSubmitName = async (name, color) => {
    const response = await fetch(`${api}/player`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color })
    });
    console.log(response.body);

    // add socket.on for color choice

    this.setState({
      name,
      color
    });
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
