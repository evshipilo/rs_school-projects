import React from 'react'
import PropTypes from 'prop-types'

const synth = window.speechSynthesis

class Speak extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      speech: false
    }
    this.textToSpeech = this.textToSpeech.bind(this)
    this.stopSpeech = this.stopSpeech.bind(this)
    this.speechHandle = this.speechHandle.bind(this)
  }

  // eslint-disable-next-line class-methods-use-this
  textToSpeech() {
    console.log('on')

    const utterThis = new SpeechSynthesisUtterance('привет, Даня! и Костя!')
    synth.speak(utterThis)
    utterThis.onend = () => {
      console.log('end')
      this.setState({ speech: false })
    }
  }

  // eslint-disable-next-line class-methods-use-this
  stopSpeech() {
    console.log('off')
    synth.cancel()
  }

  speechHandle() {
    if (!this.state.speech) this.textToSpeech()
    else this.stopSpeech()
    this.setState({ speech: !this.state.speech })
  }

  render() {
    if (this.state.speech) {
      return (
        <button
          className='waves-effect waves-light btn-flat btn-speaker speak-on'
          onClick={() => this.speechHandle()}
        >
          <img src="img/speakerWhite.png" alt="speaker"/>
        </button>
      )
    }
    return (
      <button
        className='waves-effect waves-light btn-flat btn-speaker'
        onClick={() => this.speechHandle()}
      >
        <img src="img/speakerWhite.png" alt="speaker"/>
      </button>
    )
  }
}

Speak.propTypes = {
  currentWeather: PropTypes.object,
  currentLanguage: PropTypes.string,
  celsius: PropTypes.bool
}

export default Speak
