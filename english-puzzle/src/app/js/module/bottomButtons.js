import React from 'react'
import PropTypes from 'prop-types'

class BottomButtons extends React.Component {
  render() {
    return (
      <div className='bottom-buttons-wrapper'>
        {this.props.allInSelected &&
        <button className='btn-small waves-effect waves-light hoverable red check'
          onClick={() => this.props.setCheck(true)}
        >check</button>
        }
        <button className='btn-small waves-effect waves-light hoverable orange check'
          onClick={() => this.props.setCheck(true)}
        >i dont know</button>
      </div>

    )
  }
}

BottomButtons.propTypes = {
  allInSelected: PropTypes.bool,
  setCheck: PropTypes.func
}

export default BottomButtons
