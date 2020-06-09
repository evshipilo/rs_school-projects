import React from 'react'
import PropTypes from 'prop-types'

class SetLevel extends React.Component {
  render() {
    return (
      <div className='set-level'>
        <a className='dropdown-trigger btn-small light-blue black-text lighten-5' href='#' data-target='dropdown1'>▼ level {`${this.props.difficulty + 1}`}</a>
        <ul id='dropdown1' className='dropdown-content'>
          <li><a key={10} href="#!" onClick={() => this.props.setDifficulty(0)}>1</a></li>
          <li><a key={20} href="#!" onClick={() => this.props.setDifficulty(1)}>2</a></li>
          <li><a key={30} href="#!" onClick={() => this.props.setDifficulty(2)}>3</a></li>
          <li><a key={40} href="#!" onClick={() => this.props.setDifficulty(3)}>4</a></li>
          <li><a key={50} href="#!" onClick={() => this.props.setDifficulty(4)}>5</a></li>
          <li><a key={60} href="#!" onClick={() => this.props.setDifficulty(5)}>6</a></li>
        </ul>
        <a className='dropdown-trigger btn-small light-green black-text lighten-5' href='#' data-target='dropdown2'>▼ page {`${this.props.pageNumber + 1}`}</a>
        <ul id='dropdown2' className='dropdown-content'>
          <li><a key={1} href="#!" onClick={() => this.props.setPageNumber(0)}>1</a></li>
          <li><a key={2} href="#!" onClick={() => this.props.setPageNumber(1)}>2</a></li>
          <li><a key={3} href="#!" onClick={() => this.props.setPageNumber(2)}>3</a></li>
          <li><a key={4} href="#!" onClick={() => this.props.setPageNumber(3)}>4</a></li>
          <li><a key={5} href="#!" onClick={() => this.props.setPageNumber(4)}>5</a></li>
          <li><a key={6} href="#!" onClick={() => this.props.setPageNumber(5)}>6</a></li>
          <li><a key={7} href="#!" onClick={() => this.props.setPageNumber(6)}>7</a></li>
          <li><a key={8} href="#!" onClick={() => this.props.setPageNumber(7)}>8</a></li>
          <li><a key={9} href="#!" onClick={() => this.props.setPageNumber(8)}>9</a></li>
          <li><a key={10} href="#!" onClick={() => this.props.setPageNumber(9)}>10</a></li>
        </ul>
        <button className='btn-small waves-effect go'
          onClick={() => this.props.getWordsData(this.props.difficulty, this.props.pageNumber)}
        >go!</button>
      </div>
    )
  }
}

SetLevel.propTypes = {
  setDifficulty: PropTypes.func,
  setPageNumber: PropTypes.func,
  getWordsData: PropTypes.func,
  difficulty: PropTypes.number,
  pageNumber: PropTypes.number
}

export default SetLevel
