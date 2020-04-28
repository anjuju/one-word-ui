import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './App';
// import SetUp from '../Components/SetUp';
import Waiting from '../Components/Guess/Waiting';
import ClueGiver from '../Components/Clues/ClueGiver';
import CheckClues from '../Components/Clues/CheckClues';
import Guessing from '../Components/Guess/Guessing';

const AppRouter = () => (
  <BrowserRouter>    
    <Switch>
      <Route path='/'>
        <App />
      </Route>
      <Route path='/waiting'>
        <Waiting />
      </Route> 
      <Route path='/clues'>
        <ClueGiver />
        {/* <ClueGiver active={this.state.active} onSubmit={this.onClueSubmit}/> */}
      </Route>
      <Route path='/clues/check'>
        <CheckClues />
        {/* <CheckClues clues={this.state.clues} onRemove={this.removeClue} onFinish={this.onFinishChecking}/> */}
      </Route>
      <Route path='/guessing'>
        <Guessing />
        {/* <Guessing clues={this.state.clues} onNextRound={this.handleStartRound} onGuess={this.updateCorrect} /> */}
      </Route>
    </Switch>
  </BrowserRouter>
);

export default AppRouter;