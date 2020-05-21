import React from 'react'
import PropTypes from 'prop-types'

class ChangeLanguageButton extends React.Component {
  render() {
    return (
      <div className='change-lang-wrapper'>
        <a className='dropdown-trigger waves-effect waves-light btn-flat white-text btn-change-lang'
          href='#'
          data-target='dropdown1'>
          {this.props.currentLanguage} <img src="img/VectorStroke.png" alt=""/>
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
  setLanguage: PropTypes.func,
  currentLanguage: PropTypes.string
}

export default ChangeLanguageButton
