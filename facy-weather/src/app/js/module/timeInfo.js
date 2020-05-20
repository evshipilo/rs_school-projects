import React from 'react'
import PropTypes from 'prop-types'

const dayEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const dayRu = ['Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт', 'Вск']
const dayBe = ['Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб', 'Няд']

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
    if (this.props.timeOffsetSec !== 0) this.setState({ date: nd })
    else this.setState({ date: d })
  }

  render() {
    console.log('-> dayEn[this.state.date.getDay()]', dayEn[this.state.date.getDay()])
    // let day
    // switch (this.props.currentLanguage) {
    //   case 'en': day = dayEn[this.state.date.getDay()]
    //     break
    // }

    const day = dayEn[this.state.date.getDay()]
    console.log('-> this.state.date.getDay()', this.state.date.getDay())
    return (
      <div>{day}
        <h2 className='white-text'>{this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

TimeInfo.propTypes = {
  timeOffsetSec: PropTypes.number,
  currentLanguage: PropTypes.string
}

export default TimeInfo
