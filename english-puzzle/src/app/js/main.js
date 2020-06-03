import React from 'react'
import ReactDOM from 'react-dom'
import M from 'materialize-css/dist/js/materialize.min'
import '../css/style.scss'


/* eslint class-methods-use-this: ["error", { "exceptMethods": ["render"] }] */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }

  }


  async componentDidMount() {
    M.AutoInit()
  }

  componentWillUnmount() {
  }

  render() {
    return (
<div> <button className='btn waves-effect'>weoijd</button>
kjhbkjhbkjhbjkhb</div>
  )
  }
}

ReactDOM.render(<App/>, document.querySelector('.root'))
