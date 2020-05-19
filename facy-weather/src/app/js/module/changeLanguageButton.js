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
          <li><a href="#!">English</a></li>
          <li><a href="#!">Русский</a></li>
          <li><a href="#!">Белорусский</a></li>
        </ul>
      </div>
    )
  }
}

ChangeLanguageButton.propTypes = {
  changeBackground: PropTypes.func
}

export default ChangeLanguageButton
