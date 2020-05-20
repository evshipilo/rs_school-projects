import React from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize.min'
import ChangeBackgroundButton from './module/changeBackgroundButton'
import ChangeLanguageButton from './module/changeLanguageButton'
import Preloader from './module/preloader'
import LocationInfo from './module/locationInfo'
import '../css/style.scss'
import TimeInfo from './module/timeInfo'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["render"] }] */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dayTime: 'day',
      yearTime: 'summer',
      backgroundImgSrc: null,
      load: true,
      currentLocation: null,
      currentLocationName: null,
      currentLanguage: 'en',
      timeOffsetSec: 0
    }
    this.setBackgroundImage = this.setBackgroundImage.bind(this)
    this.getCurrentLocation = this.getCurrentLocation.bind(this)
    this.setLanguage = this.setLanguage.bind(this)
    this.getCurrentLocationName = this.getCurrentLocationName.bind(this)
  }

  async setLanguage(language) {
    this.setState({ currentLanguage: language })
    await this.getCurrentLocationName(language)
  }

  async setBackgroundImage () {
  //  this.setState({ isLoad: true })
    const url = `https://api..unsplash.com/photos/random?orientation=landscape&per_page=1&query=${this.state.dayTime},${this.state.yearTime}&client_id=36fevMXWtK0E8TRgKchz8t-R_jmbo9kmBVuf8pD-2mk`
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
    const [lat, long] = this.state.currentLocation.split(',')
    const url =
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&language=${language}&key=32701a01f2f8492cbefb817597782a12`
    try {
      const res = await fetch(url)
      const data = await res.json()
      console.log('-> data', data.results[0].annotations.timezone.offset_sec)
      const location = data.results[0].formatted
      const [country, , city] = location.split(',')
      const cleanCity = city.replace(/\d/g, '')
      const cleanLocation = `${cleanCity}, ${country}`
      this.setState({ currentLocationName: cleanLocation })
      this.setState({ timeOffsetSec: data.results[0].annotations.timezone.offset_sec })
    } catch (e) {
      this.setState({ currentLocationName: null })
      console.log('cant fetch data from api.opencagedata.com', e)
    }
  }

  async getCurrentLocation() {
    const url = 'https://ipinfo.io/json?token=fa1d1815d7ab5c'
    try {
      const res = await fetch(url)
      const data = await res.json()
      const currentLocation = data.loc
      this.setState({ currentLocation })
    } catch (e) {
      this.setState({ currentLocation: 'Cant find current location' })
      console.log('cant fetch data from ipinfo.io', e)
    }
  }

  async componentDidMount() {
    this.setState({ load: true })
    await this.getCurrentLocation()
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
