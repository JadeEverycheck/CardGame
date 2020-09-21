import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HallOfFame, { FAKE_HOF } from './HallOfFame'
import shuffle from 'lodash.shuffle';
import PropTypes from 'prop-types'

const HIDDEN_SYMBOL = 0;
const VISUAL_PAUSE_MSECS = 750;

const Card = ({ card, feedback, index, onClick }) => (
  <div className={`card ${feedback}`} onClick={() => onClick(index)}>
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
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

const GuessCount = ({ guesses }) => <div className="guesses">{guesses}</div>

GuessCount.propTypes = {
  guesses: PropTypes.number.isRequired,
}

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'

class App extends React.Component {
  state = {
    cards : this.generateCards(),
    guesses : 0,
    currentPair : [],
    matchedCardIndices : [],
  }

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

  handleCardClick = (index) => {
    const {currentPair} = this.state
    if (currentPair.length === 2) {
      return
    }
    if (currentPair.length === 0) {
      this.setState({currentPair : [index]})
      return 
    }
    this.handleNewPairClosedBy(index)
  }

  handleNewPairClosedBy(index) {
    const {cards, currentPair, guesses,matchedCardIndices} = this.state
    const newPair = [currentPair[0], index]
    const newGuesses = guesses + 1
    const matched = cards[newPair[0]] === cards[newPair[1]]
    this.setState({currentPair : newPair, guesses:newGuesses})
    if (matched) {
      this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
  }

  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)
    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }
    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }
    return indexMatched ? 'visible' : 'hidden'
  }

  render() {
    const {cards, guesses, matchedCardIndices} = this.state
    const won = matchedCardIndices.length === cards.length
    return (
      <div className="memory">
        <GuessCount guesses={guesses} />
        {cards.map((card, index) => (
        	<Card 
        		card={card} 
        		feedback= {this.getFeedbackForCard(index)}
            index = {index}
        		key={index}
        		onClick={this.handleCardClick} />
        ))}
		{won && (<p>'Coucou' <HallOfFame entries={FAKE_HOF} /> </p>)}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

