import React from 'react'
import PropTypes from 'prop-types'
import Description from './description'

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
    this.createText = this.createText.bind(this)
  }

  createText() {
    let temp,
      appTemp,
      windSpd,
      rh,
      code

    if (this.props.currentWeather) {
      code = this.props.currentWeather.data[0].weather.code
      temp = this.props.celsius ? Math.round(this.props.currentWeather.data[0].temp)
        : Math.round(this.props.currentWeather.data[0].temp * 9 / 5 + 32)
      appTemp = this.props.celsius ? Math.round(this.props.currentWeather.data[0].app_temp)
        : Math.round(this.props.currentWeather.data[0].app_temp * 9 / 5 + 32)
      windSpd = Math.round(this.props.currentWeather.data[0].wind_spd)
      rh = Math.round(this.props.currentWeather.data[0].rh)

      const textRu = `Температура воздуха сейчас ${temp} градусов.
      Ощущается как ${appTemp} градусов.
      ${Description[code][1]}.
      Ветер ${windSpd} метров в секунду.
      Влажность ${rh} процентов.`

      const textBe = `Тэмпература паветра зараз ${temp} градусау.
      Адчуваецца як ${appTemp} градусау.
      ${Description[code][3]}.
      Вецер ${windSpd} метрау за секунду.
      Вильготнасць ${rh} адцоткау.`

      const textEn = `Air temperature is now ${temp} degrees.
      Feels like ${appTemp} degrees.
      ${Description[code][0]}.
      Wind ${windSpd} meters per second.
      Humidity is ${rh} percent.`

      if (this.props.currentLanguage === 'en') return textEn
      if (this.props.currentLanguage === 'ru') return textRu
      if (this.props.currentLanguage === 'be') return textBe
    }
    return 'no data'
  }

  // eslint-disable-next-line class-methods-use-this
  textToSpeech() {
    const utterThis = new SpeechSynthesisUtterance(this.createText())
    if (this.props.currentLanguage === 'en') utterThis.lang = 'en-US'
    if (this.props.currentLanguage === 'ru') utterThis.lang = 'ru-RU'
    if (this.props.currentLanguage === 'be') utterThis.lang = 'ru-RU'
    this.setState({ speech: true })
    synth.speak(utterThis)
    utterThis.onend = () => {
      this.setState({ speech: false })
    }
  }

  // eslint-disable-next-line class-methods-use-this
  stopSpeech() {
    synth.cancel()
    this.setState({ speech: false })
  }

  speechHandle() {
    if (!this.state.speech) this.textToSpeech()
    else this.stopSpeech()
  }

  componentDidUpdate(prevProps) {
    if (this.props.speakSynth === true && prevProps.speakSynth === false) {
      this.textToSpeech()
      this.props.speakToggle(false)
    }
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
  celsius: PropTypes.bool,
  speakSynth: PropTypes.bool,
  speakToggle: PropTypes.func
}

export default Speak
