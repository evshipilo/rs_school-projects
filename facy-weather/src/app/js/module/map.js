import React from 'react'
import PropTypes from 'prop-types'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'

// mapboxgl.accessToken =
// 'pk.eyJ1IjoiZXZnZW55YWFhIiwiYSI6ImNrYW1jeDZodTBraHYyem12amwyNHoxdTQifQ.uc0x_mxtExltc1E3I48hzw'

const mapEn = ['Latitude:', 'Longitude:']
const mapBe = ['Даўгата:', 'Шырата:']
const mapRu = ['Долгота:', 'Широта:']

const Map1 = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZXZnZW55YWFhIiwiYSI6ImNrYW1jeDZodTBraHYyem12amwyNHoxdTQifQ.uc0x_mxtExltc1E3I48hzw'
})

class Map extends React.Component {
  render() {
    let currArr
    if (this.props.currentLanguage === 'ru') currArr = mapRu
    if (this.props.currentLanguage === 'en') currArr = mapEn
    if (this.props.currentLanguage === 'be') currArr = mapBe
    if (this.props.latitude) {
      console.log('-> this.props.latitude, this.props.longitude', this.props.latitude, this.props.longitude)
      return (
        <Map1 className='map/box'
          style="mapbox://styles/mapbox/streets-v8"
          containerStyle={{
            height: '400px',
            width: '375px',
            webkitMaskImage: "url('img/Map.png')",
            webkitMaskSize: 'cover'
          }}
          center={[this.props.longitude, this.props.latitude]}
          zoom={[12]}
        />

      )
    }
    return null
  }
}

Map.propTypes = {
  currentLanguage: PropTypes.string,
  latitude: PropTypes.num,
  longitude: PropTypes.num,
  load: PropTypes.bool,
  map: PropTypes.object
}

export default Map
