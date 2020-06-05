import React from 'react'
import PropTypes from 'prop-types'

class GameField extends React.Component {
  render() {
    return (
      <div className="card grey lighten-4">
        {this.props.children}
      </div>
    )
  }
}

GameField.propTypes = {
  children: PropTypes.object
}

export default GameField
