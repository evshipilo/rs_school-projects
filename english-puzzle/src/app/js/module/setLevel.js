import React from 'react'
import PropTypes from 'prop-types'

class SetLevel extends React.Component {
  render() {
    return (
      <div className='set-level'>
        <div className="input-field">
          <div className="diff">difficulty</div>
          <select defaultValue={this.props.difficulty}
            onChange={(e) => this.props.setDifficulty(e.target.value)}>
            <option value='0'>1</option>
            <option value='1'>2</option>
            <option value='2'>3</option>
            <option value='3'>4</option>
            <option value='4'>5</option>
            <option value='5'>6</option>
          </select>
        </div>
        <div className="input-field">
          <div className="diff">page</div>
          <select defaultValue={this.props.pageNumber}
            onChange={(e) => this.props.setPageNumber(e.target.value)}>
            <option value='0' >1</option>
            <option value='1' >2</option>
            <option value='2' >3</option>
            <option value='3' >4</option>
            <option value='4' >5</option>
            <option value='5' >6</option>
            <option value='6' >7</option>
            <option value='7' >8</option>
            <option value='8' >9</option>
            <option value='9' >10</option>
          </select>
        </div>
        <button className='btn-small go'
          onClick={() => this.props.getWordsData(this.props.difficulty, this.props.pageNumber)}
        >go!</button>
      </div>
    )
  }
}

SetLevel.propTypes = {
  setDifficulty: PropTypes.function,
  setPageNumber: PropTypes.function,
  getWordsData: PropTypes.function,
  difficulty: PropTypes.number,
  pageNumber: PropTypes.number
}

export default SetLevel
