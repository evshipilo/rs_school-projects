import React from 'react'
import PropTypes from 'prop-types'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'

const mapEn = ['Latitude:', 'Longitude:']
const mapBe = ['Шырата:', 'Даўгата:']
const mapRu = ['Широта:', 'Долгота:']

const Map1 = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZXZnZW55YWFhIiwiYSI6ImNrYW1jeDZodTBraHYyem12amwyNHoxdTQifQ.uc0x_mxtExltc1E3I48hzw'
})

class Map extends React.Component {
  render() {
    let currArr,
      lat1,
      lat2,
      lat3,
      lng1,
      lng2,
      lng3
    if (this.props.currentLanguage === 'ru') currArr = mapRu
    if (this.props.currentLanguage === 'en') currArr = mapEn
    if (this.props.currentLanguage === 'be') currArr = mapBe
    if (this.props.dms) {
      [lat1, lat2,, lat3] = this.props.dms.lat.split(' ');
      [lng1, lng2,, lng3] = this.props.dms.lng.split(' ')
    }
    if (this.props.dms && this.props.latitude && !this.props.load) {
      console.log('-> this.props.latitude, this.props.longitude', this.props.latitude, this.props.longitude)
      return (
        <div className='map-container'>
          <Map1
            style="mapbox://styles/mapbox/streets-v8"
            movingMethod='jumpTo'
            containerStyle={{
              WebkitMaskImage: "url('img/Map.png')"
            }}
            center={[this.props.longitude, this.props.latitude]}
            zoom={[10]}
          ><Layer type="symbol" id="marker"
              layout={{
                'icon-image': 'marker-15',
                'icon-ignore-placement': true,
                'icon-anchor': 'bottom'
              }}>
              <Feature coordinates={[this.props.longitude, this.props.latitude + 0.005]} />
            </Layer>
          </Map1>
          <div className='geo-position'>
            <span>{currArr[0]} {lat1} {lat2} {lat3}</span><br/>
            <span>{currArr[1]} {lng1} {lng2} {lng3}</span>
          </div>
        </div>
      )
    }
    return null
  }
}

Map.propTypes = {
  currentLanguage: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  load: PropTypes.bool,
  map: PropTypes.object,
  dms: PropTypes.object
}

export default Map
