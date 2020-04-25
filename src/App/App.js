import React from 'react';
import './App.scss';

import SetUp from '../Components/SetUp';
import Waiting from '../Components/Guess/Waiting';
import ClueGiver from '../Components/Clues/ClueGiver';
import CheckClues from '../Components/Clues/CheckClues';
import Guessing from '../Components/Guess/Guessing';

import socketIOClient from 'socket.io-client';
import NumberCorrect from '../Components/Cards/NumberCorrect';
const socketEndPoint = 'http://localhost:8080/';
const socket = socketIOClient(socketEndPoint); 

// const api = process.env.REACT_APP_ONE_WORD_API;

class App extends React.Component {
  state = {
    name: '',
    color: '',
    completeSetup: false,
    active: {
      status: false
    },
    allCluesGiven: false,
    readyToGuess: false,
    numberCorrect: {
      correct: 0,
      skip: 0,
      wrong: 0,
    }
  }

  componentDidMount() {
    socket.on('startingGame', data => {
      console.log('starting game in react');
      const { activePlayer, activeColor, activeWord } = data;
      if (this.state.name === activePlayer) {
        console.log('setting active true');
        this.setState({
          active: {status: true}
        });
      }
      this.setState({
        completeSetup: true,
        active: {
          activePlayer,
          activeColor,
          activeWord
        }
      });
    });
    socket.on('checkClues', data => {
      this.setState({
        allCluesGiven: true,
        clues: data.clues
      });
    });
    socket.on('sendingClues', data => {
      this.setState({
        clues: data.clues,
        readyToGuess: true
      });
    });
    socket.on('numberCorrect', data => {
      const { numberCorrect } = data;
      this.setState({
        numberCorrect
      });
    });
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
    socket.emit('finishCheckingClues');
  }
  
  updateCorrect = (status) => {
    socket.emit('updateCorrect', { status })
  }

  render() {
    const { completeSetup, active, allCluesGiven, readyToGuess, numberCorrect } = this.state;
    return (
      <div className="App__container">
        <header>
          <h1>One Word</h1>
        </header>
        <main>
          {(!completeSetup ?
            <SetUp socket={socket} onSubmitName={this.handleSubmitName} onStartGame={this.handleStartGame}/> :    
            (active.status ? 
              <Waiting /> :
              (!allCluesGiven ?
                <ClueGiver active={this.state.active} onSubmit={this.onClueSubmit}/> :
                <CheckClues clues={this.state.clues} onRemove={this.removeClue} onFinish={this.onFinishChecking}/>
              )
            )
          )}
          {readyToGuess && <Guessing clues={this.state.clues} />}
          <NumberCorrect numberCorrect={numberCorrect} />
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;
