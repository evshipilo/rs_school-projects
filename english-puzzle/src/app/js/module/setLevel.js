import React from 'react'
import PropTypes from 'prop-types'

class SetLevel extends React.Component {
  render() {
    return (
      <div className='set-level'>
        <div className="input-field">
          <div className="diff">difficulty</div>
          <select defaultValue={this.props.difficulty}>
            <option value='0' onClick={() => this.props.setDifficulty(0)}>1</option>
            <option value='1' onClick={() => this.props.setDifficulty(1)}>2</option>
            <option value='2' onClick={() => this.props.setDifficulty(2)}>3</option>
            <option value='3' onClick={() => this.props.setDifficulty(3)}>4</option>
            <option value='4' onClick={() => this.props.setDifficulty(4)}>5</option>
            <option value='5' onClick={() => this.props.setDifficulty(5)}>6</option>
          </select>
        </div>
        <div className="input-field">
          <div className="diff">page</div>
          <select defaultValue={this.props.pageNumber}>
            <option value='0' onClick={() => this.props.setPageNumber(0)}>1</option>
            <option value='1' onClick={() => this.props.setPageNumber(1)}>2</option>
            <option value='2' onClick={() => this.props.setPageNumber(2)}>3</option>
            <option value='3' onClick={() => this.props.setPageNumber(3)}>4</option>
            <option value='4' onClick={() => this.props.setPageNumber(4)}>5</option>
            <option value='5' onClick={() => this.props.setPageNumber(5)}>6</option>
            <option value='6' onClick={() => this.props.setPageNumber(6)}>7</option>
            <option value='7' onClick={() => this.props.setPageNumber(7)}>8</option>
            <option value='8' onClick={() => this.props.setPageNumber(8)}>9</option>
            <option value='9' onClick={() => this.props.setPageNumber(9)}>10</option>
          </select>
        </div>

      </div>
    )
  }
}

SetLevel.propTypes = {
  setDifficulty: PropTypes.function,
  setPageNumber: PropTypes.function,
  difficulty: PropTypes.number,
  pageNumber: PropTypes.number
}

export default SetLevel
