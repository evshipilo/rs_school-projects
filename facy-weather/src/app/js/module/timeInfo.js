import React from 'react'
import PropTypes from 'prop-types'

const dayEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const dayRu = ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт']
const dayBe = ['Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб']
const monthEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const monthRu = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
const monthBe = ['Студзеня', 'Лютага', 'Сакавiка', 'Красавiка', 'Мая', 'Чэрвеня', 'Лiпеня', 'Жнiвеня', 'Верасня', 'Кастрычнiка', 'Лiстапада', 'Снежня']

class TimeInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    const d = new Date()
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000)
    const nd = new Date(utc + (1000 * this.props.timeOffsetSec))
    this.setState({ date: nd })
  }

  render() {
    let day
    switch (this.props.currentLanguage) {
      case 'ru': day = dayRu[this.state.date.getDay()]
        break
      case 'be': day = dayBe[this.state.date.getDay()]
        break
      default: day = dayEn[this.state.date.getDay()]
    }
    let month
    switch (this.props.currentLanguage) {
      case 'ru': month = monthRu[this.state.date.getMonth()]
        break
      case 'be': month = monthBe[this.state.date.getMonth()]
        break
      default: month = monthEn[this.state.date.getMonth()]
    }
    if (!this.props.load && this.props.latitude) {
      return (

        <div className='time-info'>
          <span>{day}</span>
          <span>{this.state.date.getDate()}</span>
          <span>{month}</span>
          <span className='time'>{this.state.date.toLocaleTimeString()}</span>
        </div>

      )
    }
    return null
  }
}

TimeInfo.propTypes = {
  timeOffsetSec: PropTypes.number,
  currentLanguage: PropTypes.string,
  load: PropTypes.bool,
  latitude: PropTypes.number
}

export default TimeInfo
