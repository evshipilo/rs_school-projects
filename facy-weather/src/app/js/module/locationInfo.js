import React from 'react'
import PropTypes from 'prop-types'

class LocationInfo extends React.Component {
  render() {
    if (!this.props.load) {
      return (
        <h3 className='white-text location-info'>
          {this.props.currentLocationName}
        </h3>
      )
    }
    return null
  }
}

LocationInfo.propTypes = {
  currentLocationName: PropTypes.string,
  load: PropTypes.bool
}

export default LocationInfo
