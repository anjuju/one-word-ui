import React from 'react';
import './App.scss';
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SetUp from '../Components/SetUp';
import Waiting from '../Components/Guess/Waiting';
import GivingClues from '../Components/Clues/GivingClues';
import CheckingClues from '../Components/Clues/CheckingClues';
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
    allCluesGiven: false,
    readyToGuess: false,
    active: {
      status: false,
      activePlayer: 'angelica',
      activeColor: 'teal',
      activeWord: 'test'
    },
    clues: [
      { player_name: 'angelica', color: 'red', clue: 'testA'},
      { player_name: 'bob', color: 'pink', clue: 'testA'},
      { player_name: 'cathy', color: 'blue', clue: 'testinnnnggggC'},
      { player_name: 'dylan', color: 'purple', clue: 'testD'},
      { player_name: 'elizabeth r', color: 'black', clue: 'testD'},
      { player_name: 'fran', color: 'yellow', clue: 'testF'},
    ],
    outcomes: {
      correct: 0,
      skip: 0,
      wrong: 0,
    },
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
        completeSetup: true,
        allCluesGiven: true,
        clues: data.clues
      });
    });

    socket.on('sendingClues', data => {
      this.setState({
        completeSetup: true,
        readyToGuess: true,
        clues: data.clues
      });
    });

    socket.on('outcomes', data => {
      const { outcomes } = data;
      this.setState({
        outcomes
      });
    });
  }

  handleSubmitName = (name, color) => {
      socket.emit('submitSetUp', { name, color });

      this.setState({
        name,
        color
      });
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
  
  updateCorrect = (outcome) => {
    socket.emit('updateCorrect', { outcome });
    this.handleStartRound();
  }

  render() {
    const { completeSetup, active, allCluesGiven, readyToGuess, outcomes } = this.state;
        
    return (
        <div className="App__container">
          <header>
            <h1>One Word</h1>
          </header>
          <main>
          {(!completeSetup ?
            <SetUp socket={socket} onSubmitName={this.handleSubmitName} onStartJoinGame={this.handleStartOrJoinGame}  /> :    
            (!readyToGuess ?
              (active.status ?
                <Waiting /> :
                (!allCluesGiven ?
                  <GivingClues socket={socket} active={this.state.active} getNewWord={this.handleGetNewWord} onSubmit={this.onClueSubmit} onProceed={this.handleOntoClueChecking}/> :
                  <CheckingClues socket={socket} clues={this.state.clues} onRemove={this.removeClue} onFinish={this.onFinishChecking}/>
                )
              ) :
              <Guessing clues={this.state.clues} onGuess={this.updateCorrect} outcomes={outcomes} />
            )
          )}
          </main>
          <footer>
          </footer>
        </div>
    );
  }
}

export default App;
