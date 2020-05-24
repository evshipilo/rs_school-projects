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
import SwitcherCF from './module/switcherCF'
import SearchCity from './module/searchCity'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["render"] }] */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      celsius: true,
      dayOfWeek: null,
      dayTime: null,
      yearTime: null,
      backgroundImgSrc: null,
      load: true,
      latitude: null,
      longitude: null,
      currentWeather: null,
      weather3day: null,
      // currentLocationCity: null,
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
    this.tempToggle = this.tempToggle.bind(this)
    this.getCurrentPositionFromName = this.getCurrentPositionFromName.bind(this)
    this.showNewCity = this.showNewCity.bind(this)
  }

  tempToggle() {
    this.setState({ celsius: !this.state.celsius })
  }

  async getWeather3Days() {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${this.state.latitude}&lon=${this.state.longitude}&lang=${this.state.currentLanguage}&days=4&units=M&key=6a2809c12d8c4c5a8a8c623e5ff254ea`
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
      console.log('-> data', data)
      this.setState({ currentWeather: data })
    } catch (e) {
      console.log('cant fetch data from weatherbit.io', e)
    }
  }

  async setLanguage(language) {
    this.setState({ currentLanguage: language })
    await this.getCurrentLocationName(language)
  }

  setDaytimeAndYeartime() {
    const d = new Date()
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000)
    const nd = new Date(utc + (1000 * this.state.timeOffsetSec))
    const month = nd.getMonth()
    const hour = nd.getHours()
    this.setState({ dayOfWeek: nd.getDay() })
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
    `https://api.opencagedata.com/geocode/v1/json?q=${this.state.latitude}+${this.state.longitude}&language=${language}&roadinfo=0&key=32701a01f2f8492cbefb817597782a12`
    try {
      const res = await fetch(url)
      const data = await res.json()
      let city
      if (data.results[0].components.village) city = data.results[0].components.village
      else if (data.results[0].components.town) city = data.results[0].components.town
      else city = data.results[0].components.city
      // const { city } = data.results[0].components
      const { country } = data.results[0].components
      const location = `${city}, ${country}`
      console.log('-> data.results[0].components', data.results[0].components)
      if (city) {
        // this.setState({ currentLocationCity: city })
        this.setState({ currentLocationName: location })
        this.setState({ timeOffsetSec: data.results[0].annotations.timezone.offset_sec })
      } else {
        this.setState({ currentLocationName: 'location not found' })
      }
    } catch (e) {
      this.setState({ currentLocationName: 'location not found' })
      console.log('cant fetch data from api.opencagedata.com', e)
    }
  }

  async getCurrentPositionFromName(city) {
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=32701a01f2f8492cbefb817597782a12`
      const res = await fetch(url)
      const data = await res.json()
      if (data.results.length === 0) {
        this.setState({ latitude: null })
        this.setState({ longitude: null })
        this.setState({ currentLocationName: 'location not found' })
      } else {
        this.setState({ latitude: data.results[0].geometry.lat })
        this.setState({ longitude: data.results[0].geometry.lng })
      }
    } catch (e) {
      this.setState({ latitude: null })
      this.setState({ longitude: null })
      this.setState({ currentLocationName: 'location not found' })
    }
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  async getCurrentLocation() {
    try {
      const { coords } = await this.getCurrentPosition()
      this.setState({ latitude: coords.latitude })
      this.setState({ longitude: coords.longitude })
    } catch (e) {
      console.log('cant get geolocation', e)
    }
  }

  async showNewCity(city) {
    this.setState({ load: true })
    await this.getCurrentPositionFromName(city)
    await this.getWeather3Days(this.state.currentLanguage)
    await this.getWeatherCurrent(this.state.currentLanguage)
    await this.getCurrentLocationName(this.state.currentLanguage)
    await this.setBackgroundImage()
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
              <SwitcherCF
                tempToggle={this.tempToggle}
              />
            </div>
            <div className="col m6 s12">
              <SearchCity
                currentLanguage={this.state.currentLanguage}
                showNewCity={this.showNewCity}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col m7 s12 left-column'>
              <LocationInfo
                currentLocationName={this.state.currentLocationName}
                load={this.state.load}
              />
              <TimeInfo timeOffsetSec={this.state.timeOffsetSec}
                currentLanguage={this.state.currentLanguage}
                load={this.state.load}
              />
              <CurrentWeather
                currentWeather={this.state.currentWeather}
                currentLanguage={this.state.currentLanguage}
                celsius={this.state.celsius}
                load={this.state.load}
              />
              <Weather3day
                weather3day={this.state.weather3day}
                currentLanguage={this.state.currentLanguage}
                dayOfWeek={this.state.dayOfWeek}
                celsius={this.state.celsius}
                load={this.state.load}
              />
            </div>
            <div className='col m5 s12 center'>
              sdfsdf
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('.root'))
