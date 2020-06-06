import React from 'react'
import ReactDOM from 'react-dom'
import M from 'materialize-css/dist/js/materialize.min'
import '../css/style.scss'
import DragNdrop from './module/dragNdrop'
import GameField from './module/gameField'

/* eslint class-methods-use-this: [0] */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wordsData: null,
      difficulty: 0,
      pageNumber: 0
    }
    this.getWordsData = this.getWordsData.bind(this)
  }

  async getWordsData(difficulty, pageNumber) {
    try {
      const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${pageNumber}&group=${difficulty}`
      const res = await fetch(url)
      const data = await res.json()
      data.sort((a, b) => {
        if (a.textExample.length > b.textExample.length) return 1
        if (a.textExample.length < b.textExample.length) return -1
        return 0
      })
      const dataSlice = data.slice(0, 10)
      dataSlice.forEach((it) => {
        const item = it
        item.textExample = item.textExample.replace(/(<b>)|(<\/b>)|([,.!?])/g, '')
      })
      console.log('-> dataSlice', dataSlice)
      this.setState({ wordsData: dataSlice })
    } catch (e) {
      console.log('-> e', e)
      this.setState({ wordsData: null })
    }
  }

  async componentDidMount() {
    M.AutoInit()
    await this.getWordsData(this.state.difficulty, this.state.pageNumber)
  }

  render() {
    return (
      <div className='container'>
        <div className='section'>
          <div className="row">
            <GameField>
              <DragNdrop
                wordsData={this.state.wordsData}
              />
            </GameField>

          </div>
        </div>
      </div>

    )
  }
}

ReactDOM.render(<App/>, document.querySelector('.root'))
