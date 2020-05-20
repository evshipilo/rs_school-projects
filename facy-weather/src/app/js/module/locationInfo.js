import React from 'react'
import PropTypes from 'prop-types'

class LocationInfo extends React.Component {
  render() {
    return (
      <h3 className='white-text location-info'>
        {this.props.currentLocationName}
      </h3>
    )
  }
}

LocationInfo.propTypes = {
  currentLocationName: PropTypes.string
}

export default LocationInfo
