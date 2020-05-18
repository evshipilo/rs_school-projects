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
    this.getBackgroundImage = this.getBackgroundImage.bind(this)
  }

  async getBackgroundImage () {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${this.state.dayTime},${this.state.yearTime}&client_id=36fevMXWtK0E8TRgKchz8t-R_jmbo9kmBVuf8pD-2mk`

    const res = await fetch(url)
    const data = await res.json()
    const imgUrl = data.urls.regular
    const resImg = await fetch(imgUrl)
    console.log(resImg)
    const blob = await resImg.blob()
    const image = new Image()
    image.src = URL.createObjectURL(blob)
    console.log(image.src)
    this.setState({ backgroundImgSrc: image.src })
  }

  // https://images.unsplash.com/photo-1559075479-e8da6f6fc3fb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNTYwNH0
  async componentDidMount() {
    await this.getBackgroundImage()
  }

  render() {
    return (
      <Container src={this.state.backgroundImgSrc}/>
    )
  }
}

class Container extends React.Component {
  render() {
    return (
      <div
        className='container'
        style={{ backgroundImage: `url(${this.props.src})` }}
      >sdcsdc</div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('.root'))
