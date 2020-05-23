import React from 'react'
import PropTypes from 'prop-types'

class ChangeBackgroundButton extends React.Component {
  render() {
    return (
      <button
        style={{ backgroundImage: 'url("img/refresh.png")' }}
        className='waves-effect waves-light btn-flat btn-change-wallpaper btn-change-wallpaper'
        onClick={() => this.props.changeBackground()}
      >
      </button>
    )
  }
}

ChangeBackgroundButton.propTypes = {
  changeBackground: PropTypes.func
}

export default ChangeBackgroundButton
