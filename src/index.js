import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const HIDDEN_SYMBOL = 0;

const Card = ({ card, feedback, onClick }) => (
  <div className={`card ${feedback}`} onClick={() => onClick(card)}>
    <span className="symbol">
      {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
    </span>
  </div>
)

const GuessCount = ({ guesses }) => <div className="guesses">{guesses}</div>

class App extends React.Component {
	handleCardClick(card) {
	  console.log(card, 'clicked')
	}
  render() {
    return (
      <div className="memory">
        <GuessCount guesses={0} />
		<Card card="😀" feedback="hidden" onClick={this.handleCardClick} />
		<Card card="🎉" feedback="justMatched" onClick={this.handleCardClick} />
		<Card card="💖" feedback="justMismatched" onClick={this.handleCardClick} />
		<Card card="🎩" feedback="visible" onClick={this.handleCardClick} />
		<Card card="🐶" feedback="hidden" onClick={this.handleCardClick} />
		<Card card="🐱" feedback="justMatched" onClick={this.handleCardClick} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

