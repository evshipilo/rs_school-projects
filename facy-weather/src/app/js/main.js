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
import Map from './module/map'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["render"] }] */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recognition: false,
      celsius: true,
      dayOfWeek: null,
      dayTime: null,
      yearTime: null,
      backgroundImgSrc: null,
      load: true,
      dms: null,
      latitude: null,
      longitude: null,
      currentWeather: null,
      weather3day: null,
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
    this.onUnload = this.onUnload.bind(this)
    this.recognitionToggle = this.recognitionToggle.bind(this)
    this.containerRef = React.createRef()
  }

  tempToggle() {
    this.setState({ celsius: !this.state.celsius })
  }

  recognitionToggle() {
    this.setState({ recognition: !this.state.recognition })
  }

  async getWeather3Days() {
    if (this.state.latitude) {
      const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${this.state.latitude}&lon=${this.state.longitude}&lang=${this.state.currentLanguage}&days=4&units=M&key=6a2809c12d8c4c5a8a8c623e5ff254ea`
      try {
        const res = await fetch(url)
        const data = await res.json()
        this.setState({ weather3day: data })
      } catch (e) {
        console.log('cant fetch data from weatherbit.io', e)
      }
    }
  }

  async getWeatherCurrent(lang) {
    if (this.state.latitude) {
      const url = `https://api.weatherbit.io/v2.0/current?&lat=${this.state.latitude}&lon=${this.state.longitude}&lang=${lang}&units=M&key=6a2809c12d8c4c5a8a8c623e5ff254ea`
      try {
        const res = await fetch(url)
        const data = await res.json()
        this.setState({ currentWeather: data })
      } catch (e) {
        console.log('cant fetch data from weatherbit.io', e)
      }
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
    const [,,, southNorth] = this.state.dms.lat.split(' ')
    this.setState({ dayOfWeek: nd.getDay() })
    if (southNorth === 'N') {
      if (month === 11 || month === 0 || month === 1) this.setState({ yearTime: 'winter' })
      if (month === 2 || month === 3 || month === 4) this.setState({ yearTime: 'spring' })
      if (month === 5 || month === 6 || month === 7) this.setState({ yearTime: 'summer' })
      if (month === 8 || month === 9 || month === 10) this.setState({ yearTime: 'autumn' })
    }
    if (southNorth === 'S') {
      if (month === 11 || month === 0 || month === 1) this.setState({ yearTime: 'summer' })
      if (month === 2 || month === 3 || month === 4) this.setState({ yearTime: 'autumn' })
      if (month === 5 || month === 6 || month === 7) this.setState({ yearTime: 'winter' })
      if (month === 8 || month === 9 || month === 10) this.setState({ yearTime: 'spring' })
    }
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
      this.containerRef.current.animate([
        { opacity: '1' },
        { opacity: '0' }
      ], {
        duration: 1000,
        easing: 'ease-in',
        fill: 'forwards'
      })
      setTimeout(() => {
        this.setState({ backgroundImgSrc: image.src })
        this.containerRef.current.animate([
          { opacity: '0' },
          { opacity: '1' }
        ], {
          duration: 1000,
          easing: 'ease-in',
          fill: 'forwards'
        })
      }, 1000)
      // this.setState({ backgroundImgSrc: image.src })
    } catch (e) {
      this.setState({ backgroundImgSrc: 'img/backgroundDefault.jpg' })
      console.log('cant fetch data from unsplash.com', e)
    }
    this.setState({ load: false })
  }

  async getCurrentLocationName(language) {
    if (this.state.latitude) {
      const url =
        `https://api.opencagedata.com/geocode/v1/json?q=${this.state.latitude}+${this.state.longitude}&language=${language}&roadinfo=0&key=32701a01f2f8492cbefb817597782a12`
      try {
        const res = await fetch(url)
        const data = await res.json()
        let city
        if (data.results[0].components.village) city = data.results[0].components.village
        else if (data.results[0].components.town) city = data.results[0].components.town
        else if (data.results[0].components.city) city = data.results[0].components.city
        else city = data.results[0].components.county
        const { country } = data.results[0].components
        const location = `${city}, ${country}`
        if (country) {
          this.setState({ currentLocationName: location })
          this.setState({ timeOffsetSec: data.results[0].annotations.timezone.offset_sec })
          this.setState({ dms: data.results[0].annotations.DMS })
        } else {
          this.setState({ currentLocationName: 'location not found' })
        }
      } catch (e) {
        this.setState({ currentLocationName: 'location not found' })
        console.log('cant fetch data from api.opencagedata.com', e)
      }
    } else this.setState({ currentLocationName: 'location not found' })
  }

  async getCurrentPositionFromName(city) {
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=32701a01f2f8492cbefb817597782a12`
      const res = await fetch(url)
      const data = await res.json()
      if (data.results[0].geometry.lat && data.results[0].geometry.lng) {
        this.setState({ latitude: data.results[0].geometry.lat })
        this.setState({ longitude: data.results[0].geometry.lng })
        this.setState({ dms: data.results[0].annotations.DMS })
      } else {
        this.setState({ latitude: null })
        this.setState({ longitude: null })
        this.setState({ currentWeather: null })
        this.setState({ weather3day: null })
        this.setState({ dms: null })
        this.setState({ currentLocationName: 'location not found' })
      }
    } catch (e) {
      this.setState({ latitude: null })
      this.setState({ longitude: null })
      this.setState({ currentWeather: null })
      this.setState({ weather3day: null })
      this.setState({ currentLocationName: 'location not found' })
    }
  }

  // eslint-disable-next-line class-methods-use-this
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

  onUnload() {
    localStorage.setItem('celsius', this.state.celsius)
    localStorage.setItem('currentLanguage', this.state.currentLanguage)
  }

  async componentDidMount() {
    const cel = localStorage.getItem('celsius') === 'false'
    const lang = localStorage.getItem('currentLanguage') || 'en'
    this.setState({ load: true })
    this.setState({ celsius: !cel })
    this.setState({ currentLanguage: lang })
    await this.getCurrentLocation()
    await this.getWeather3Days(this.state.currentLanguage)
    await this.getWeatherCurrent(this.state.currentLanguage)
    await this.getCurrentLocationName(this.state.currentLanguage)
    await this.setBackgroundImage()
    M.AutoInit()
    window.addEventListener('beforeunload', this.onUnload)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload)
  }

  render() {
    return (
      <div
        className='container'
      >
        <div className='container-background' ref={this.containerRef}
          style={{ backgroundImage: `url(${this.state.backgroundImgSrc})` }}> </div>
        <Preloader load={this.state.load}/>
        <div className='background-black'>
          <div className="row navigation">
            <div className="col l6 m12 s12 buttons">
              <ChangeBackgroundButton changeBackground={this.setBackgroundImage}/>
              <ChangeLanguageButton setLanguage={this.setLanguage}
                currentLanguage={this.state.currentLanguage}/>
              <SwitcherCF
                tempToggle={this.tempToggle}
                celsius={this.state.celsius}
              />
            </div>
            <div className="col l6 m12 s12 search-col">
              <SearchCity
                currentLanguage={this.state.currentLanguage}
                showNewCity={this.showNewCity}
                recognitionToggle={this.recognitionToggle}
                recognition={this.state.recognition}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col l8 m12 s12 left-column'>
              <LocationInfo
                currentLocationName={this.state.currentLocationName}
                load={this.state.load}
              />
              <TimeInfo timeOffsetSec={this.state.timeOffsetSec}
                currentLanguage={this.state.currentLanguage}
                load={this.state.load}
                latitude={this.state.latitude}
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
            <div className='col l4 m12 s12 map-col'>
              <Map
                currentLanguage={this.state.currentLanguage}
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                load={this.state.load}
                dms={this.state.dms}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('.root'))
