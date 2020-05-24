import React from 'react'
import PropTypes from 'prop-types'

const daysEn = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY']
const daysRu = ['ВОСКРЕСЕНЬЕ', 'ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ', 'ПОНЕДЕЛЬНИК', 'ВТОРНИК']
const daysBe = ['НЯДЗЕЛЯ', 'ПАНЯДЗЕЛАК', 'АЎТОРАК', 'СЕРАДА', 'ЧАЦВЕР', 'ПЯТНIЦА', 'СУБОТА', 'НЯДЗЕЛЯ', 'ПАНЯДЗЕЛАК', 'АЎТОРАК']

class Weather3day extends React.Component {
  constructor(props) {
    super(props)
    this.getIcon = this.getIcon.bind(this)
  }

  getIcon(num) {
    const { icon } = this.props.weather3day.data[num].weather
    if (icon === 'c01d') return 'img/day.svg'
    if (icon === 'c01n') return 'img/night.svg'
    if (icon === 'c02d') return 'img/cloudy-day-1.svg'
    if (icon === 'c02n') return 'img/cloudy-night-1.svg'
    if (icon === 'c03d') return 'img/cloudy-day-3.svg'
    if (icon === 'c03n') return 'img/cloudy-night-3.svg'
    if (icon === 'c04d') return 'img/cloudy.svg'
    if (icon === 'c04n') return 'img/cloudy.svg'
    if (icon[0] === 't') return 'img/thunder.svg'
    if (icon[0] === 'd') return 'img/rainy-7.svg'
    if (icon[0] === 'u') return 'img/cloudy.svg'
    if (icon[0] === 'a') return 'img/cloudy.svg'
    if (icon[0] === 'r' && icon[3] === 'd') return 'img/rainy-3.svg'
    if (icon[0] === 'r' && icon[3] === 'n') return 'img/rainy-6.svg'
    if (icon[0] === 'f' && icon[3] === 'd') return 'img/rainy-3.svg'
    if (icon[0] === 'f' && icon[3] === 'n') return 'img/rainy-6.svg'
    if (icon[0] === 's' && icon[3] === 'd') return 'img/snowy-3.svg'
    if (icon[0] === 's' && icon[3] === 'n') return 'img/snowy-6.svg'
    return null
  }

  render() {
    let
      temp1,
      temp2,
      temp3,
      icon1,
      icon2,
      icon3,
      currentArray

    if (this.props.weather3day) {
      temp1 = this.props.celsius ? Math.round(this.props.weather3day.data[1].temp)
        : Math.round(this.props.weather3day.data[1].temp * 9 / 5 + 32)
      temp2 = this.props.celsius ? Math.round(this.props.weather3day.data[2].temp)
        : Math.round(this.props.weather3day.data[2].temp * 9 / 5 + 32)
      temp3 = this.props.celsius ? Math.round(this.props.weather3day.data[3].temp)
        : Math.round(this.props.weather3day.data[3].temp * 9 / 5 + 32)
      icon1 = this.getIcon(1)
      icon2 = this.getIcon(2)
      icon3 = this.getIcon(3)
      if (this.props.currentLanguage === 'ru') currentArray = daysRu
      if (this.props.currentLanguage === 'en') currentArray = daysEn
      if (this.props.currentLanguage === 'be') currentArray = daysBe
    }
    if (this.props.weather3day && !this.props.load) {
      return (
        <div className='weather-3day-wrapper'>
          <div className="weather-3day">
            <p className='weather-3day-day'>{currentArray[this.props.dayOfWeek + 1]}</p>
            <p className='weather-3day-temp'>{temp1}°</p>
            <img src={icon1} alt="icon"/>
          </div>
          <div className="weather-3day">
            <p className='weather-3day-day'>{currentArray[this.props.dayOfWeek + 2]}</p>
            <p className='weather-3day-temp'>{temp2}°</p>
            <img src={icon2} alt="icon"/>
          </div>
          <div className="weather-3day">
            <p className='weather-3day-day'>{currentArray[this.props.dayOfWeek + 3]}</p>
            <p className='weather-3day-temp'>{temp3}°</p>
            <img src={icon3} alt="icon"/>
          </div>
        </div>
      )
    } return null
  }
}

Weather3day.propTypes = {
  weather3day: PropTypes.object,
  currentLanguage: PropTypes.string,
  dayOfWeek: PropTypes.number,
  celsius: PropTypes.bool,
  load: PropTypes.bool
}

export default Weather3day
