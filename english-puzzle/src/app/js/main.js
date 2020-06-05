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
      a: 0
    }
  }

  async componentDidMount() {
    M.AutoInit()
  }

  render() {
    return (
      <div className='container'>
        <div className='section'>
          <div className="row">
            <GameField>
              <DragNdrop/>
            </GameField>

          </div>
        </div>
      </div>

    )
  }
}

ReactDOM.render(<App/>, document.querySelector('.root'))
