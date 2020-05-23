import React from 'react'
import PropTypes from 'prop-types'
import Description from './description'

const enW = ['FEELS LIKE:', 'WIND:', 'm/s', 'HUMIDITY:']
const ruW = ['ЧУВСТВУЕТСЯ КАК:', 'ВЕТЕР:', 'м/с', 'ВЛАЖНОСТЬ:']
const beW = ['АДЧУВАЕЦЦА ЯК:', 'ВЕЦЕР:', 'м/с', 'ВIЛЬГОТНАСЦЬ:']

class CurrentWeather extends React.Component {
  render() {
    let feel,
      wind,
      ms,
      hum,
      temp,
      appTemp,
      desc,
      windSpd,
      rh,
      icon,
      src,
      code,
      num
    switch (this.props.currentLanguage) {
      case 'ru':
        [feel, wind, ms, hum] = ruW
        num = 1
        break
      case 'be':
        [feel, wind, ms, hum] = beW
        num = 2
        break
      default:
        [feel, wind, ms, hum] = enW
        num = 0
    }
    if (this.props.currentWeather) {
      code = this.props.currentWeather.data[0].weather.code
      desc = Description[code][num].toUpperCase()
      temp = Math.round(this.props.currentWeather.data[0].temp)
      appTemp = Math.round(this.props.currentWeather.data[0].app_temp)
      windSpd = Math.round(this.props.currentWeather.data[0].wind_spd)
      rh = Math.round(this.props.currentWeather.data[0].rh)
      icon = this.props.currentWeather.data[0].weather.icon
      if (icon === 'c01d') src = 'img/day.svg'
      if (icon === 'c01n') src = 'img/night.svg'
      if (icon === 'c02d') src = 'img/cloudy-day-1.svg'
      if (icon === 'c02n') src = 'img/cloudy-night-1.svg'
      if (icon === 'c03d') src = 'img/cloudy-day-3.svg'
      if (icon === 'c03n') src = 'img/cloudy-night-3.svg'
      if (icon === 'c04d') src = 'img/cloudy.svg'
      if (icon === 'c04n') src = 'img/cloudy.svg'
      if (icon[0] === 't') src = 'img/thunder.svg'
      if (icon[0] === 'd') src = 'img/rainy-7.svg'
      if (icon[0] === 'u') src = 'img/cloudy.svg'
      if (icon[0] === 'a') src = 'img/cloudy.svg'
      if (icon[0] === 'r' && icon[3] === 'd') src = 'img/rainy-3.svg'
      if (icon[0] === 'r' && icon[3] === 'n') src = 'img/rainy-6.svg'
      if (icon[0] === 'f' && icon[3] === 'd') src = 'img/rainy-3.svg'
      if (icon[0] === 'f' && icon[3] === 'n') src = 'img/rainy-6.svg'
      if (icon[0] === 's' && icon[3] === 'd') src = 'img/snowy-3.svg'
      if (icon[0] === 's' && icon[3] === 'n') src = 'img/snowy-6.svg'
    }
    if (this.props.currentWeather) {
      return (
        <div className='current-weather-wrapper'>
          <div className='current-weather'>
            <img className='current-weather-img' src={src} alt="svg"/>
            <div><p className='cur-temp'>{temp}</p><p className='cur-temp-deg'>°</p></div>
            <div className='current-weather-info'>
              <p>{desc}</p>
              <p>{feel} {appTemp}°</p>
              <p>{wind} {windSpd} {ms}</p>
              <p>{hum} {rh}%</p>
            </div>
          </div>
        </div>
      )
    } return null
  }
}

CurrentWeather.propTypes = {
  currentWeather: PropTypes.object,
  currentLanguage: PropTypes.string
}

export default CurrentWeather
