import React from 'react';

class Players extends React.Component {
  
  state = {
    players: []
  }

  componentDidMount() {
    this.props.socket.on('players', data => {
      const { players } = data;
      this.setState({
        players
      });
    });
  }
  
  render() {
    const { players } = this.state;
    const { status } = this.props;
    return (
      <div className="players__container">
        <div className="players__title">Players</div>
        {players.map(player => (
          <div key={player.player_name} className={`players__name active-player--${player.color}`}>
            {player.player_name}
            {(status === "giving_clues") && player.clue && <div className="players__check"> &#10004;</div>}
          </div>
        ))}
      </div>
    );
  }
  
  
};

export default Players;