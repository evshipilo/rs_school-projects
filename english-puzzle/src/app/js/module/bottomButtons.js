import React from 'react'
import PropTypes from 'prop-types'

class BottomButtons extends React.Component {
  render() {
    return (
      <div className='bottom-buttons-wrapper'>
        {this.props.allInSelected &&
        <button className='btn-small waves-effect waves-light hoverable red'>check</button>
        }
      </div>

    )
  }
}

BottomButtons.propTypes = {
  allInSelected: PropTypes.bool
}

export default BottomButtons
