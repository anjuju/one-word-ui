import React from 'react';
import './App.scss';
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SetUp from '../Components/SetUp';
import Waiting from '../Components/Guess/Waiting';
import ClueGiver from '../Components/Clues/ClueGiver';
import CheckClues from '../Components/Clues/CheckClues';
import Guessing from '../Components/Guess/Guessing';
import NumberCorrect from '../Components/Cards/NumberCorrect';

import socketIOClient from 'socket.io-client';
const socketEndPoint = 'http://localhost:8080/';
const socket = socketIOClient(socketEndPoint); 

// const api = process.env.REACT_APP_ONE_WORD_API;

class App extends React.Component {
  state = {
    name: '',
    color: '',
    completeSetup: false,
    active: {
      status: false,
      activePlayer: 'angelica',
      activeColor: 'teal',
      activeWord: 'test'
    },
    allCluesGiven: false,
    readyToGuess: false,
    numberCorrect: {
      correct: 0,
      skip: 0,
      wrong: 0,
    },
    clues: [
      { player_name: 'angelica', color: 'red', clue: 'testA'},
      { player_name: 'bob', color: 'pink', clue: 'testA'},
      { player_name: 'cathy', color: 'blue', clue: 'testinnnnggggC'},
      { player_name: 'dylan', color: 'purple', clue: 'testD'},
      { player_name: 'elizabeth r', color: 'black', clue: 'testD'},
      { player_name: 'fran', color: 'yellow', clue: 'testF'},
    ]
  }

  componentDidMount() {
    socket.on('startingRound', data => {
      const { activePlayer, activeColor, activeWord } = data;
      
      if (this.state.name === activePlayer) {
        //console.log('setting active true');
        this.setState({
          active: { status: true }
        });
      } else {
        this.setState({
          active: { status: false }
        });
      }

      this.setState( prevState => ({
        active: {
          ...prevState.active,
          activePlayer,
          activeColor,
          activeWord,
        },
        completeSetup: true,
        allCluesGiven: false,
        readyToGuess: false,
      }));
    });
    socket.on('sendingWord', data => {
      const { activeWord } = data;     
      this.setState(prevState => ({
        active: {
          ...prevState.active,
          activeWord
        }
      }));
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

      this.setState({
        name,
        color
      });
    } else {
      alert('Please enter your name and choose a color.');
    }
  }
  
  handleStartRound = () => {
    socket.emit('startRound');
  }

  handleGetNewWord = () => {
    socket.emit('getNewWord');
  }

  onClueSubmit = (clue) => {
    socket.emit('submitClue', { name: this.state.name, color: this.state.color, clue });
  }

  handleOntoClueChecking = () => {
    socket.emit('ontoCheckingClues');
  }

  onFinishChecking = () => {
    socket.emit('finishCheckingClues');
  }
  
  updateCorrect = (status) => {
    socket.emit('updateCorrect', { status });
    this.handleStartRound();
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
            <SetUp socket={socket} onSubmitName={this.handleSubmitName} onStartGame={this.handleStartRound}/> :    
            (!readyToGuess ?
              (active.status ?
                <Waiting /> :
                (!allCluesGiven ?
                  <ClueGiver active={this.state.active} getNewWord={this.handleGetNewWord} onSubmit={this.onClueSubmit} onProceed={this.handleOntoClueChecking}/> :
                  <CheckClues socket={socket} clues={this.state.clues} onRemove={this.removeClue} onFinish={this.onFinishChecking}/>
                )
              ) :
              <Guessing clues={this.state.clues} onGuess={this.updateCorrect} />
            )
          )}
          </main>
          <footer>
            {readyToGuess && <NumberCorrect numberCorrect={numberCorrect} />}
          </footer>
        </div>
    );
  }
}

export default App;
