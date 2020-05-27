import React from 'react'
import PropTypes from 'prop-types'

class SwitcherCF extends React.Component {
  render() {
    if (this.props.celsius) {
      return (
        <button
          className='waves-effect waves-light btn-flat btn-switcher'
          onClick={() => {
            this.props.tempToggle()
          }}
        ><span className='switcher-background' ref={this.switchRef}> </span>
        °С<span className='empty'> </span>°F
        </button>
      )
    }
    return (
      <button
        className='waves-effect waves-light btn-flat btn-switcher'
        onClick={() => {
          this.props.tempToggle()
        }}
      ><span className='switcher-background on'> </span>
        °С<span className='empty'> </span>°F
      </button>
    )
  }
}

SwitcherCF.propTypes = {
  tempToggle: PropTypes.func,
  celsius: PropTypes.bool
}

export default SwitcherCF
