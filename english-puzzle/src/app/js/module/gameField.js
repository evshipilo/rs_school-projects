import React from 'react'
import PropTypes from 'prop-types'

class GameField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      sentences: null
    }
    this.setWidth = this.setWidth.bind(this)
    this.getItemStyle = this.getItemStyle.bind(this)
    this.setNumOfChars = this.setNumOfChars.bind(this)
  }

  setWidth() {
    this.setState({
      width: window.getComputedStyle(document.querySelector('.card'))
        .width.split('px')[0]
    })
  }

  setNumOfChars(sentence) {
    if (sentence) {
      return sentence
        .replace(/\s/g, '').length
    }
    return null
  }

  getItemStyle(word, sentence) {
    const widthToOneChar = this.state.width / this.setNumOfChars(sentence)
    const curWidth = word.length * widthToOneChar
    return {
      boxSizing: 'border-box',
      border: '1px solid white',
      color: 'white',
      textAlign: 'center',
      userSelect: 'none',
      padding: '0',
      margin: '0',
      width: `${curWidth}px`,
      background: 'green',
      height: '40px'
    }
  }

  componentDidMount() {
    this.setWidth()
    window.addEventListener('resize', this.setWidth)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.continuer !== prevProps.continuer) {
      const sent = this.props.wordsData.map((it) => it.textExample)
      this.setState({ sentences: sent })
    }
  }

  render() {
    let items
    if (this.state.sentences) {
      const currSentences = this.state.sentences.slice(0, this.props.numOfSentence + 1)
      items = currSentences.map((it, num) => <div key={num}>{
        it.split(' ').map((item, number) => <div
          className='game-field-word'
          key={`${num}${number}`}
          style={this.getItemStyle(item, it)}
        >{item}</div>)
      } </div>)
    }

    return (
      <div className="card grey lighten-4">
        {items}
        {this.props.children}
      </div>
    )
  }
}

GameField.propTypes = {
  children: PropTypes.object,
  wordsData: PropTypes.array,
  continuer: PropTypes.bool,
  numOfSentence: PropTypes.number
}

export default GameField
