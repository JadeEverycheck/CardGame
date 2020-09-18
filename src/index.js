import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HallOfFame, { FAKE_HOF } from './HallOfFame'
import shuffle from 'lodash.shuffle';
import PropTypes from 'prop-types'

const HIDDEN_SYMBOL = 0;

const Card = ({ card, feedback, onClick }) => (
  <div className={`card ${feedback}`} onClick={() => onClick(card)}>
    <span className="symbol">
      {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
    </span>
  </div>
)

Card.propTypes = {
  card: PropTypes.string.isRequired,
  feedback: PropTypes.oneOf([
    'hidden',
    'justMatched',
    'justMismatched',
    'visible',
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
}

const GuessCount = ({ guesses }) => <div className="guesses">{guesses}</div>

GuessCount.propTypes = {
  guesses: PropTypes.number.isRequired,
}

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'

class App extends React.Component {
  cards = this.generateCards()

  generateCards() {
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }

  handleCardClick(card) {
    console.log(card, 'clicked')
  }

  render() {
    const won = new Date().getSeconds() % 2 === 0
    return (
      <div className="memory">
        <GuessCount guesses={0} />
        {this.cards.map((card, index) => (
        	<Card 
        		card={card} 
        		feedback="visible"
        		key={index}
        		onClick={this.handleCardClick} />
        ))}
		{won && (<p>'Coucou' <HallOfFame entries={FAKE_HOF} /> </p>)}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

