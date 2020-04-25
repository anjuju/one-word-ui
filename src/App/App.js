import React from 'react';
import './App.scss';

import SetUp from '../Components/SetUp';
import Guesser from '../Components/Guesser';
import ClueGiver from '../Components/ClueGiver';

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
    completeSetup: false,
    activePlayer: false,
  }

  componentDidMount() {
    socket.on('startingGame', data => {
      console.log('name', this.state.name);
      console.log('starting game in react');
      if (this.state.name === data.activePlayer) {
        console.log('setting active true');
        this.setState({
          activePlayer: true
        });
      }
      this.setState({
        completeSetup: true,
        activeColor: data.activeColor,
        activeWord: data.activeWord
      });
    })
  }

  handleSubmitName = async (name, color) => {
    if (name !== '' && color !== '') {
      const response = await fetch(`${api}/player`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, color })
      });
  
      socket.emit('chooseColor', { color });
  
      this.setState({
        name,
        color
      });
    } else {
      alert('Please enter your name and choose a color.');
    }
  }

  handleStartGame = () => {
    socket.emit('startGame');
  }

  render() {
    const { name, color, completeSetup, activePlayer, activeColor } = this.state;
    return (
      <div className="App__container">
        <header>
          <h1>One Word</h1>
        </header>
        <main>
          {(completeSetup ?
          (activePlayer ? <Guesser/> : <ClueGiver state={this.state}/>) :
          <SetUp socket={socket} onSubmitName={this.handleSubmitName} onStartGame={this.handleStartGame}/>)}
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;
