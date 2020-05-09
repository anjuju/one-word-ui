import React from 'react';

class Outcomes extends React.Component {

  componentDidMount() {
    // sort stats
    this.props.stats.sort((a,b) => {
      return parseInt(a.round) - parseInt(b.round);
    });
  }

  showMoreStats = () => {
    document.getElementById('stats__more-btn').style.display = 'none';
    
    const moreStats = document.getElementById('stats__more-stats');
    moreStats.style.display = 'flex';
  }
  
  render() {
    const { outcomes, stats } = this.props;

    return (
      <div className="stats__container">
        <div className="stats__title">Stats:</div>
        <div className="outcomes__container">
          <div className="outcomes outcomes--correct">
            Correct: {outcomes.correct}
          </div>
          <div className="outcomes outcomes--skip">
            Skipped: {outcomes.skip}
          </div>
          <div className="outcomes outcomes--wrong">
            Wrong: {outcomes.wrong}
          </div>
        </div>
        <button onClick={this.showMoreStats} id="stats__more-btn">More Stats</button>
        <div id="stats__more-stats">
          <div className="stats__more-stats__row stats__more-stats__row--labels">
            <div className="stats__more-stats__round">Round</div>
            <div className="stats__more-stats__word">Word</div>
            <div className="stats__more-stats__outcome">Outcome</div>
          </div>
          {stats.map(roundBundle => {
            const { round, active_word, outcome } = roundBundle;

            let rowHeight;

            if (window.innerWidth > 1024) {
              (active_word.length > 34) ? rowHeight = 'long' : rowHeight = '';
            } else if (window.innerWidth > 500) {
              (active_word.length > 22) ? rowHeight = 'long' : rowHeight = '';
            } else {
              (active_word.length > 30) ? rowHeight = 'long' : rowHeight = '';
            }

            

            return (
              <div key={round} className={`stats__more-stats__row stats__more-stats__row--${rowHeight}`}>
                <div className="stats__more-stats__round">{round}</div>
                <div className="stats__more-stats__word">{active_word}</div>
                <div className="stats__more-stats__outcome">{outcome}</div>
              </div>
            )})  
          }
        </div>
      </div>
      
    );
  }
}
  

export default Outcomes;