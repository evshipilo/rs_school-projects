import React from 'react'
import PropTypes from 'prop-types'

class SwitcherCF extends React.Component {
  constructor(props) {
    super(props)
    this.switchRef = React.createRef()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const sw = this.switchRef.current
    sw.classList.toggle('on')
  }

  render() {
    return (
      <button
        className='waves-effect waves-light btn-flat btn-switcher'
        onClick={() => {
          this.props.tempToggle()
          this.handleClick()
        }}
      ><span className='switcher-background' ref={this.switchRef}> </span>
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
