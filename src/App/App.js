import React from 'react';
import './App.scss';
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SetUp from '../Components/SetUp';
import Waiting from '../Components/Guess/Waiting';
import GivingClues from '../Components/Clues/GivingClues';
import CheckingClues from '../Components/Clues/CheckingClues';
import Guessing from '../Components/Guess/Guessing';

import socketIOClient from 'socket.io-client';
import Outcomes from '../Components/Cards/Outcomes';
const socketEndPoint = 'localhost:8080/';
const socket = socketIOClient.connect(socketEndPoint); 

// const api = process.env.REACT_APP_ONE_WORD_API;

class App extends React.Component {
  state = {
    name: '',
    color: '',
    status: 'setting_up',
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
      { player_name: 'elizabeth', color: 'black', clue: 'testD'},
      { player_name: 'fran', color: 'yellow', clue: 'testF'},
    ],
    outcomes: {
      correct: 0,
      skip: 0,
      wrong: 0,
    },
    stats: [
      {round: 1, active_word: 'null', outcome: 'null'},
    ]
  }

  componentDidMount() {
    socket.on('proceedGivingClues', data => {
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
        status: 'giving_clues'
      }));
    });

    socket.on('sendingNewWord', data => {
      const { activeWord } = data;     
      this.setState(prevState => ({
        active: {
          ...prevState.active,
          activeWord
        }
      }));
    });

    socket.on('proceedCheckingClues', data => {
      this.setState({
        status: 'checking_clues',
        clues: data.clues
      });
    });

    socket.on('proceedGuessing', data => {
      this.setState({
        status: 'guessing',
        clues: data.clues
      });
    });

    socket.on('stats', data => {
      const { outcomes, stats } = data;
      this.setState({
        outcomes,
        stats
      });
    });

    socket.on('endingGame', () => {
      this.setState({
        status: "end_game"
      });
    });

    socket.on('startingNewGame', () => {
      this.setState({
        status: "setting_up"
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

  endGame = () => {
    socket.emit('endGame');
  }

  newGame = () => {
    const start = window.confirm('Start new game?');
    if (start) {
      socket.emit('startNewGame');
    }
  }

  render() {
    const { status, active, clues, outcomes, stats, name } = this.state;
        
    return (
        <div className="App__container">
          <header>
            <h1>One Word</h1>
          </header>
          <main>
          {(status !== "end_game" ?
            (status === "setting_up" || name === '' ?
              <SetUp socket={socket} onSubmitName={this.handleSubmitName} /> :
              (name &&
                (status !== "guessing" ?
                  (active.status ?
                    <Waiting/> :
                    (status === "giving_clues" ?
                      <GivingClues socket={socket} active={active} onSubmit={this.onClueSubmit} /> :
                      <CheckingClues socket={socket} clues={clues} />
                    )
                  ) :
                  <Guessing socket={socket} clues={clues} outcomes={outcomes} stats={stats} active={active} showGuessingBtns={active.status} />
                )
              )
            ) :
            <div className="end-game">
              <br/>
              <button onClick={this.newGame} className="end-game--new button--light">New Game</button>
              <Outcomes outcomes={outcomes} stats={stats} />             
            </div>
          )}
          </main>
          <footer>
            {(status !== "setting_up" && status !== "end_game") && <button onClick={this.endGame} className="end-game">End Game</button>}
          </footer>
        </div>
    );
  }
}

export default App;
