import React from 'react';
import './App.scss';

import SetUp from '../Components/SetUp';
import Waiting from '../Components/Guess/Waiting';
import ClueGiver from '../Components/Clues/ClueGiver';
import CheckClues from '../Components/Clues/CheckClues';
import Guessing from '../Components/Guess/Guessing';

import socketIOClient from 'socket.io-client';
const socketEndPoint = 'http://localhost:8080/';
const socket = socketIOClient(socketEndPoint); 

// const api = process.env.REACT_APP_ONE_WORD_API;

class App extends React.Component {
  state = {
    name: '',
    color: '',
    completeSetup: false,
    active: false,
    allCluesGiven: false,
    readyToGuess: false,
  }

  componentDidMount() {
    socket.on('startingGame', data => {
      console.log('starting game in react');
      const { activePlayer, activeColor, activeWord } = data;
      if (this.state.name === activePlayer) {
        console.log('setting active true');
        this.setState({
          active: true
        });
      }
      this.setState({
        completeSetup: true,
        activePlayer,
        activeColor,
        activeWord
      });
    });
    socket.on('checkClues', data => {
      this.setState({
        allCluesGiven: true,
        clues: data.clues
      });
    })
  }

  handleSubmitName = async (name, color) => {
    if (name !== '' && color !== '') {
      // const response = await fetch(`${api}/player`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, color })
      // });
      socket.emit('submitSetUp', { name, color });
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

  onClueSubmit = (clue) => {
    socket.emit('submitClue', { name: this.state.name, clue });
  }

  removeClue = (clue) => {
    socket.emit('removeClue', { clue });
  }

  onFinishChecking = () => {
    this.setState({
      readyToGuess: true
    });
  }
  
  render() {
    const { completeSetup, active, allCluesGiven, readyToGuess } = this.state;
    return (
      <div className="App__container">
        <header>
          <h1>One Word</h1>
        </header>
        <main>
          {(!completeSetup ?
            <SetUp socket={socket} onSubmitName={this.handleSubmitName} onStartGame={this.handleStartGame}/> :    
            (active ? 
              <Waiting /> :
              (!allCluesGiven ?
                <ClueGiver state={this.state} onSubmit={this.onClueSubmit}/> :
                <CheckClues clues={this.state.clues} onRemove={this.removeClue} onFinish={this.onFinishChecking}/>
              )
            )
          )}
          {readyToGuess && <Guessing />}
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;
