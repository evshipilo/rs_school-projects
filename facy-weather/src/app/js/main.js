import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import M from 'materialize-css/dist/js/materialize.min'
import '../css/style.scss'

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["render"] }] */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dayTime: 'day',
      yearTime: 'summer',
      backgroundImgSrc: null
    }
    this.setBackgroundImage = this.setBackgroundImage.bind(this)
  }

  async setBackgroundImage () {
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
  }

  async componentDidMount() {
    await this.setBackgroundImage()
  }

  render() {
    return (
      <div
        className='container'
        style={{ backgroundImage: `url(${this.state.backgroundImgSrc})` }}
      >
        <ChangeBackgroundButton changeBackground={this.setBackgroundImage}/>
      </div>
    )
  }
}

class ChangeBackgroundButton extends React.Component {
  render() {
    return (
      <button
        className='btn'
        onClick={() => this.props.changeBackground()}
      >
        <i className="material-icons">refresh</i>
      </button>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('.root'))
