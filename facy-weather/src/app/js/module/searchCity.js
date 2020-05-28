import React from 'react'
import PropTypes from 'prop-types'

const searchEn = ['Search city', 'SEARCH']
const searchBe = ['Пошук горада', 'ЗНАЙСЦI']
const searchRu = ['Поиск города', 'НАЙТИ']

const SpeechRecognition = window.SpeechRecognition ||
  window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

class SearchCity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityName: null
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.speechToText = this.speechToText.bind(this)
    this.stopRecognition = this.stopRecognition.bind(this)
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.props.showNewCity(this.state.cityName)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  speechToText() {
    const lang = this.props.currentLanguage === 'en' ? 'en-US' : 'ru-RU'
    if (!this.props.recognition) {
      recognition.continuous = true
      recognition.lang = lang
      recognition.interimResults = false
      recognition.maxAlternatives = 1
      let count = 0

      recognition.start()
      recognition.onend = () => {
        recognition.start()
      }
      recognition.onresult = (event) => {
        // this.setState({ cityName: event.results[0][0].transcript })
        this.props.showNewCity(event.results[count][0].transcript)
        console.log('-> event.results', count, event.results[count][0].transcript)
        count += 1
      }
    } else this.stopRecognition()
  }

  // eslint-disable-next-line class-methods-use-this
  stopRecognition() {
    if (recognition) {
      recognition.stop()
      recognition.onend = function() { recognition.stop() }
    }
  }

  render() {
    let currArr
    if (this.props.currentLanguage === 'ru') currArr = searchRu
    if (this.props.currentLanguage === 'en') currArr = searchEn
    if (this.props.currentLanguage === 'be') currArr = searchBe

    return (
      <div className='input-wrapper'>

        <input onChange={(evt) => { this.setState({ cityName: evt.target.value }) }}
          onKeyDown={this.handleKeyDown}
          placeholder={currArr[0]}
          className='searchCity'
        />
        <button
          className='waves-effect waves-light btn-flat searchCity-btn'
          onClick={() => this.props.showNewCity(this.state.cityName)}>
          {currArr[1]}
        </button>
        { this.props.recognition ? (
          <img className='speak-btn speak-on'
            src="img/speak.png"
            alt="speak"
            onClick={() => {
              this.speechToText()
              this.props.recognitionToggle()
            }}
          />
        ) : (
          <img className='speak-btn'
            src="img/speak.png"
            alt="speak"
            onClick={() => {
              this.speechToText()
              this.props.recognitionToggle()
            }}
          />
        )
        }
      </div>
    )
  }
}

SearchCity.propTypes = {
  currentLanguage: PropTypes.string,
  showNewCity: PropTypes.func,
  recognition: PropTypes.bool,
  recognitionToggle: PropTypes.func
}

export default SearchCity
