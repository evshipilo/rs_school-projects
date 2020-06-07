import React from 'react'
import PropTypes from 'prop-types'

class BottomButtons extends React.Component {
  render() {
    return (
      <div className='bottom-buttons-wrapper'>
        {this.props.allInSelected && !this.props.win &&
        <button className='btn-small waves-effect waves-light hoverable red check'
          onClick={() => this.props.setCheck(true)}
        >check</button>
        }
        {!this.props.win &&
        <button className='btn-small waves-effect waves-light hoverable orange check'
          onClick={() => {
            this.props.setDontKnow(true)
            this.props.setCheck(true)
          }}
        >i dont know</button>}
        {this.props.win &&
        <button className='btn-small waves-effect waves-light hoverable blue check'
          onClick={() => {
            this.props.setDontKnow(false)
            this.props.setCheck(false)
            this.props.setContinue(true)
          }}
        >continue</button>}
      </div>

    )
  }
}

BottomButtons.propTypes = {
  allInSelected: PropTypes.bool,
  setCheck: PropTypes.func,
  setDontKnow: PropTypes.func,
  win: PropTypes.bool,
  setContinue: PropTypes.func
}

export default BottomButtons
