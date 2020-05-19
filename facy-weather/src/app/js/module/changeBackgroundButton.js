import React from 'react'
import PropTypes from 'prop-types'

class ChangeBackgroundButton extends React.Component {
  render() {
    return (
      <button
        className='waves-effect waves-teal btn-flat white-text'
        onClick={() => this.props.changeBackground()}
      >
        <i className="material-icons">refresh</i>
      </button>
    )
  }
}

ChangeBackgroundButton.propTypes = {
  changeBackground: PropTypes.func
}

export default ChangeBackgroundButton
