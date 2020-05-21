import React from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize.min'
import ChangeBackgroundButton from './module/changeBackgroundButton'
import ChangeLanguageButton from './module/changeLanguageButton'
import Preloader from './module/preloader'
import LocationInfo from './module/locationInfo'
import CurrentWeather from './module/currentWeather'
import Weather3day from './module/weather3day'
import '../css/style.scss'
import TimeInfo from './module/timeInfo'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["render"] }] */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dayTime: null,
      yearTime: null,
      backgroundImgSrc: null,
      load: true,
      latitude: null,
      longitude: null,
      currentWeather: null,
      weather3day: null,
      currentLocationCity: null,
      currentLocationName: null,
      currentLanguage: 'en',
      timeOffsetSec: 0
    }
    this.setBackgroundImage = this.setBackgroundImage.bind(this)
    this.getCurrentLocation = this.getCurrentLocation.bind(this)
    this.setLanguage = this.setLanguage.bind(this)
    this.getCurrentLocationName = this.getCurrentLocationName.bind(this)
    this.setDaytimeAndYeartime = this.setDaytimeAndYeartime.bind(this)
    this.getWeather3Days = this.getWeather3Days.bind(this)
    this.getWeatherCurrent = this.getWeatherCurrent.bind(this)
    this.getCurrentPosition = this.getCurrentPosition.bind(this)
  }

  async getWeather3Days() {
    const url = `https://api....weatherbit.io/v2.0/forecast/daily?&lat=${this.state.latitude}&lon=${this.state.longitude}&lang=${this.state.currentLanguage}&days=4&units=M&key=6a2809c12d8c4c5a8a8c623e5ff254ea`
    try {
      const res = await fetch(url)
      const data = await res.json()
      this.setState({ weather3day: data })
      console.log('-> data', data)
    } catch (e) {
      console.log('cant fetch data from weatherbit.io', e)
    }
  }

  async getWeatherCurrent(lang) {
    const url = `https://api.weatherbit.io/v2.0/current?&lat=${this.state.latitude}&lon=${this.state.longitude}&lang=${lang}&units=M&key=6a2809c12d8c4c5a8a8c623e5ff254ea`
    try {
      const res = await fetch(url)
      const data = await res.json()
      this.setState({ currentWeather: data })
      console.log('-> data', data)
    } catch (e) {
      console.log('cant fetch data from weatherbit.io', e)
    }
  }

  async setLanguage(language) {
    this.setState({ currentLanguage: language })
    await this.getCurrentLocationName(language)
    await this.getWeatherCurrent(language)
  }

  setDaytimeAndYeartime() {
    const d = new Date()
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000)
    const nd = new Date(utc + (1000 * this.state.timeOffsetSec))
    const month = nd.getMonth()
    const hour = nd.getHours()
    if (month === 11 || month === 0 || month === 1) this.setState({ yearTime: 'winter' })
    if (month === 2 || month === 3 || month === 4) this.setState({ yearTime: 'spring' })
    if (month === 5 || month === 6 || month === 7) this.setState({ yearTime: 'summer' })
    if (month === 8 || month === 9 || month === 10) this.setState({ yearTime: 'autumn' })
    if (hour >= 6 && hour < 10) this.setState({ dayTime: 'morning' })
    if (hour >= 10 && hour < 18) this.setState({ dayTime: 'day' })
    if (hour >= 18 && hour <= 23) this.setState({ dayTime: 'evening' })
    if (hour >= 0 && hour < 6) this.setState({ dayTime: 'night' })
  }

  async setBackgroundImage () {
    this.setDaytimeAndYeartime()
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${this.state.dayTime},${this.state.yearTime}&client_id=36fevMXWtK0E8TRgKchz8t-R_jmbo9kmBVuf8pD-2mk`
    console.log('-> url', url)
    try {
      const res = await fetch(url)
      const data = await res.json()
      const imgUrl = data.urls.regular
      const resImg = await fetch(imgUrl)
      const blob = await resImg.blob()
      const image = new Image()
      image.src = URL.createObjectURL(blob)
      this.setState({ backgroundImgSrc: image.src })
    } catch (e) {
      this.setState({ backgroundImgSrc: 'img/backgroundDefault.jpg' })
      console.log('cant fetch data from unsplash.com', e)
    }
    this.setState({ load: false })
  }

  async getCurrentLocationName(language) {
    const url =
    `https://api.opencagedata.com/geocode/v1/json?q=${this.state.latitude}+${this.state.longitude}&language=${language}&key=32701a01f2f8492cbefb817597782a12`
    try {
      const res = await fetch(url)
      const data = await res.json()
      const location = data.results[0].formatted
      let [country, city, city1] = location.split(',')
      if (city1.search(/[\d]/) !== -1) city = city1
      const cleanCity = city.replace(/[\d\s]/g, '')
      const cleanLocation = `${cleanCity}, ${country}`
      this.setState({ currentLocationCity: cleanCity })
      this.setState({ currentLocationName: cleanLocation })
      this.setState({ timeOffsetSec: data.results[0].annotations.timezone.offset_sec })
    } catch (e) {
      this.setState({ currentLocationName: 'location not found' })
      console.log('cant fetch data from api.opencagedata.com', e)
    }
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  async getCurrentLocation() {
    // const url = 'https://ipinfo..io/json?token=fa1d1815d7ab5c'
    try {
      // const res = await fetch(url)
      // const data = await res.json()
      // const currentLocation = data.loc
      // const [lat, long] = currentLocation.split(',')
      // this.setState({ latitude: lat })
      // this.setState({ longitude: long })
      const { coords } = await this.getCurrentPosition()
      this.setState({ latitude: coords.latitude })
      this.setState({ longitude: coords.longitude })
    } catch (e) {
      console.log('cant get geolocation', e)
    }
  }

  async componentDidMount() {
    this.setState({ load: true })
    await this.getCurrentLocation()
    await this.getWeather3Days(this.state.currentLanguage)
    await this.getWeatherCurrent(this.state.currentLanguage)
    await this.getCurrentLocationName(this.state.currentLanguage)
    await this.setBackgroundImage()
    M.AutoInit()
  }


  render() {
    return (
      <div
        className='container'
        style={{ backgroundImage: `url(${this.state.backgroundImgSrc})` }}
      >
        <Preloader load={this.state.load}/>
        <div className='background-black'>
          <div className="row navigation">
            <div className="col m6 s12 buttons">
              <ChangeBackgroundButton changeBackground={this.setBackgroundImage}/>
              <ChangeLanguageButton setLanguage={this.setLanguage}
                currentLanguage={this.state.currentLanguage}/>
            </div>
            <div className="col m6 s12 search center">6-columns (one-half)</div>
          </div>
          <div className='row'>
            <div className='col m6 s12 left-column'>
              <LocationInfo currentLocationName={this.state.currentLocationName}
              />
              <TimeInfo timeOffsetSec={this.state.timeOffsetSec}
                currentLanguage={this.state.currentLanguage}/>
              <CurrentWeather
                currentWeather={this.state.currentWeather}
                currentLanguage={this.state.currentLanguage}
              />
              <Weather3day
                weather3day={this.state.weather3day}
                currentLanguage={this.state.currentLanguage}
              />
            </div>
            <div className='col m6 s12 center'>
              sdfsdf
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('.root'))
