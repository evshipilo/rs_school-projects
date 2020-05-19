import React from 'react'
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize.min'
import ChangeBackgroundButton from './module/changeBackgroundButton'
import ChangeLanguageButton from './module/changeLanguageButton'
import Preloader from './module/preloader'
import '../css/style.scss'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["render"] }] */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dayTime: 'day',
      yearTime: 'summer',
      backgroundImgSrc: null,
      isLoad: true,
      currentLocation: null,
      currentLanguage: 'En',
      height: window.innerHeight
    }
    this.setBackgroundImage = this.setBackgroundImage.bind(this)
    this.getCurrentLocation = this.getCurrentLocation.bind(this)
    this.updateHeight = this.updateHeight.bind(this)
  }

  updateHeight() {
    this.setState({ height: window.innerHeight })
  }

  async setBackgroundImage () {
  //  this.setState({ isLoad: true })
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${this.state.dayTime},${this.state.yearTime}&client_id=36fevMXWtK0E8TRgKchz8t-R_jmbo9kmBVuf8pD-2mk`
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
    // this.setState({ isLoad: false })
  }

  async getCurrentLocation() {
    const url = 'https://ipinfo.io/json?token=fa1d1815d7ab5c'
    // const url =
    // 'https://api.opencagedata.com/geocode/v1/json?q=55.1904+30.2049&key=32701a01f2f8492cbefb817597782a12'
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
    window.addEventListener('resize', this.updateHeight)
    await this.getCurrentLocation()
    await this.setBackgroundImage()
    // this.setState({ isLoad: false })
    M.AutoInit()
  }

  render() {
    return (
      <div
        className='container'
        style={{ backgroundImage: `url(${this.state.backgroundImgSrc})` }}
      >
        <Preloader isLoad={this.state.isLoad} loaderHeight={this.state.height}/>
        <div className='background-black'>
          <div className="row navigation">
            <div className="col m6 s12 buttons center">
              <ChangeBackgroundButton changeBackground={this.setBackgroundImage}/>
              <ChangeLanguageButton/>
            </div>
            <div className="col m6 s12 search center">6-columns (one-half)</div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('.root'))
