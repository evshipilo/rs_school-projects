import React from 'react'
import ReactDOM from 'react-dom'
import M from 'materialize-css/dist/js/materialize.min'
import '../css/style.scss'
import DragNdrop from './module/dragNdrop'
import GameField from './module/gameField'
import SetLevel from './module/setLevel'
import BottomButtons from './module/bottomButtons'
import Translation from './module/translation'

/* eslint class-methods-use-this: [0] */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wordsData: null,
      difficulty: 0,
      pageNumber: 0,
      allInSelected: false,
      check: false,
      win: false,
      dontKnow: false,
      continuer: false,
      translation: null,
      numOfSentence: 0

    }
    this.getWordsData = this.getWordsData.bind(this)
    this.setDifficulty = this.setDifficulty.bind(this)
    this.setPageNumber = this.setPageNumber.bind(this)
    this.setAllInSelected = this.setAllInSelected.bind(this)
    this.setCheck = this.setCheck.bind(this)
    this.setWin = this.setWin.bind(this)
    this.setDontKnow = this.setDontKnow.bind(this)
    this.setContinue = this.setContinue.bind(this)
    this.setNumOfSentence = this.setNumOfSentence.bind(this)
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
      this.setState({ translation: null })
    } catch (e) {
      console.log('-> e', e)
      this.setState({ wordsData: null })
      this.setState({
        translation: 'cant fetch data, select difficulty &' +
          ' page and click GO!'
      })
    }
  }

  setNumOfSentence(data) {
    this.setState({ numOfSentence: data })
  }

  setContinue(bool) {
    this.setState({ continuer: bool })
  }

  setWin(bool) {
    this.setState({ win: bool })
  }

  setDontKnow(bool) {
    this.setState({ dontKnow: bool })
  }

  setDifficulty(diff) {
    this.setState({ difficulty: diff })
  }

  setPageNumber(page) {
    this.setState({ pageNumber: page })
  }

  setAllInSelected(bool) {
    this.setState({ allInSelected: bool })
  }

  setCheck(bool) {
    this.setState({ check: bool })
  }

  async componentDidMount() {
    M.AutoInit()
    await this.getWordsData(this.state.difficulty, this.state.pageNumber)
  }

  render() {
    return (
      <div className='container'>
        <div className="row">
          <div className="col m6 s12 set-level">
            <SetLevel
              setDifficulty={this.setDifficulty}
              setPageNumber={this.setPageNumber}
              difficulty={this.state.difficulty}
              pageNumber={this.state.pageNumber}
              getWordsData={this.getWordsData}
            />
          </div>
          <div className="col m6 s12 set-prompt">

          </div>

        </div>
        <div className="row">
          <div className="col s12 audio">

          </div>
          <div className="col s12 translation">
            <Translation
              translation={this.state.translation}
            />
          </div>
        </div>
        <div className="row">
          <GameField
            wordsData={this.state.wordsData}
            numOfSentence={this.state.numOfSentence}
            continuer={this.state.continuer}
          >
            <DragNdrop
              wordsData={this.state.wordsData}
              setAllInSelected={this.setAllInSelected}
              allInSelected={this.state.allInSelected}
              setCheck={this.setCheck}
              check={this.state.check}
              win={this.state.win}
              setWin={this.setWin}
              dontKnow={this.state.dontKnow}
              continuer={this.state.continuer}
              setContinue={this.setContinue}
              setNumOfSentence={this.setNumOfSentence}
            />
          </GameField>
        </div>
        <div className="row center bottom-buttons">
          <BottomButtons
            allInSelected={this.state.allInSelected}
            setCheck={this.setCheck}
            setDontKnow={this.setDontKnow}
            win={this.state.win}
            setContinue={this.setContinue}
          />
        </div>
      </div>

    )
  }
}

ReactDOM.render(<App/>, document.querySelector('.root'))
