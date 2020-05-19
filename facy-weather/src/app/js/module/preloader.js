import React from 'react'
import PropTypes from 'prop-types'

class Preloader extends React.Component {
  render() {
    if (this.props.isLoad) {
      const loaderHeight = `${this.props.loaderHeight}px`
      return (
        <div className='loader-wrapper' style={{ height: loaderHeight }}
        >
          <div className="preloader-wrapper active">
            <div className="spinner-layer spinner-red-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      )
    } return (null)
  }
}

Preloader.propTypes = {
  isLoad: PropTypes.boolean,
  loaderHeight: PropTypes.number
}

export default Preloader
