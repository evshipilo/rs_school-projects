import React from 'react'
import PropTypes from 'prop-types'

class LocationInfo extends React.Component {
  render() {
    return (
      <h4 className='white-text'>
        {this.props.currentLocationName}
      </h4>
    )
  }
}

LocationInfo.propTypes = {
  currentLocationName: PropTypes.string
}

export default LocationInfo
