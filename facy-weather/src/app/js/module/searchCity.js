import React from 'react'
import PropTypes from 'prop-types'

const searchEn = ['Search city', 'SEARCH']
const searchBe = ['Пошук горада', 'ЗНАЙСЦI']
const searchRu = ['Поиск города', 'НАЙТИ']

class SearchCity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityName: null
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.props.showNewCity(this.state.cityName)
    }
  }

  render() {
    let currArr
    if (this.props.currentLanguage === 'ru') currArr = searchRu
    if (this.props.currentLanguage === 'en') currArr = searchEn
    if (this.props.currentLanguage === 'be') currArr = searchBe

    return (
      <div className='input-wrapper'>

        <input onChange={(evt) => { this.setState({ cityName: evt.target.value }) }}
          onKeyDown={this.handleKeyDown}
          placeholder={currArr[0]}
          className='searchCity'
        />
        <button
          className='waves-effect waves-light btn-flat searchCity-btn'
          onClick={() => this.props.showNewCity(this.state.cityName)}>
          {currArr[1]}
        </button>
        { this.props.recognition ? (
          <img className='speak-btn speak-on'
            src="img/speak.png"
            alt="speak"
            onClick={() => this.props.recognitionToggle()}
          />
        ) : (
          <img className='speak-btn'
            src="img/speak.png"
            alt="speak"
            onClick={() => this.props.recognitionToggle()}
          />
        )
        }
      </div>
    )
  }
}

SearchCity.propTypes = {
  currentLanguage: PropTypes.string,
  showNewCity: PropTypes.func,
  recognition: PropTypes.bool,
  recognitionToggle: PropTypes.func
}

export default SearchCity
