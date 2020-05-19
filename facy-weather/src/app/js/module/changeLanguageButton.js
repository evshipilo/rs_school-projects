import React from 'react'
import PropTypes from 'prop-types'

class ChangeLanguageButton extends React.Component {
  render() {
    return (
      <div className='change-lang-wrapper'>
        <a className='dropdown-trigger waves-effect waves-teal btn-flat white-text'
          href='#'
          data-target='dropdown1'>
          Language ({this.props.currentLanguage})
        </a>
        <ul id='dropdown1' className='dropdown-content'>
          <li><a href="#!" value={'en'} onClick={() => this.props.setLanguage('en')}>
            English</a></li>
          <li><a href="#!" value={'ru'} onClick={() => this.props.setLanguage('ru')}>
            Русский</a></li>
          <li><a href="#!" value={'be'} onClick={() => this.props.setLanguage('be')}>
            Беларуская</a></li>
        </ul>
      </div>
    )
  }
}

ChangeLanguageButton.propTypes = {
  changeBackground: PropTypes.func,
  setLanguage: PropTypes.func,
  currentLanguage: PropTypes.string
}

export default ChangeLanguageButton
