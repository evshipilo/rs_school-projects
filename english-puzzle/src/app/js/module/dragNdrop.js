import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// const getItems = (count, offset = 0) => Array.from({ length: count }, (v, k) => k).map((k) => ({
//   id: `item-${k + offset}`,
//   content: `item ${k + offset}`
// }))

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

const grid = 0

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  height: '40px',
  padding: grid,
  overflow: 'auto',
  width: '100%'
})

/* eslint class-methods-use-this: [0] */

class DragNdrop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      selected: [],
      droppable: 'items',
      droppable2: 'selected',
      width: 0,
      sentences: null,
      numOfSentence: 0,
      numOfChars: 0
    }
    this.getList = this.getList.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.getItemStyle = this.getItemStyle.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.setWidth = this.setWidth.bind(this)
    this.getListStyle2 = this.getListStyle2.bind(this)
    this.setItems = this.setItems.bind(this)
    this.setNumOfChars = this.setNumOfChars.bind(this)
    this.checkResult = this.checkResult.bind(this)
    this.getItemStyleSelected = this.getItemStyleSelected.bind(this)
    this.checkResult = this.checkResult.bind(this)
  }

  checkResult() {
    let result = true
    this.state.selected.forEach((item, index) => {
      if (+item.id !== index) result = false
    })
    return result
  }

  getListStyle2(isDraggingOver) {
    return {
      background: isDraggingOver ? 'lightblue' : 'lightgrey',
      display: 'flex',
      height: '40px',
      padding: grid,
      overflow: 'auto',
      width: '100%',
      top: `${this.state.numOfSentence * 40}px`
    }
  }

  setWidth() {
    this.setState({
      width: window.getComputedStyle(document.querySelector('.drop2'))
        .width.split('px')[0]
    })
  }

  setItems(sentence, number) {
    if (sentence) {
      const sentArr = sentence[number].split(' ')
      const items = sentArr.map((item, num) => ({
        id: `${num}`,
        content: `${item}`
      }))
      items.sort(() => (Math.random() - 0.5))
      console.log('-> items', items)
      return items
    }
    return null
  }

  setNumOfChars(sentence, number) {
    if (sentence) {
      return sentence[number]
        .replace(/\s/g, '').length
    }
    return null
  }

  componentDidMount() {
    this.setWidth()
    window.addEventListener('resize', this.setWidth)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.wordsData !== prevProps.wordsData) {
      const sent = this.props.wordsData.map((it) => it.textExample)
      this.setState({ sentences: sent })
      this.setState({ numOfSentence: 0 })
      this.setState({ numOfChars: this.setNumOfChars(sent, 0) })
      this.setState({ items: this.setItems(sent, 0) })
      this.setState({ selected: [] })
    }
    if (!this.state.items.length && this.state.selected.length &&
    !this.props.allInSelected) this.props.setAllInSelected(true)
    // if (this.state.items.length &&
    //   this.props.allInSelected) this.props.setAllInSelected(false)

    if (!prevProps.check && this.props.check) {
      this.checkResult()
    }
    if (!this.state.items.length && this.state.selected.length &&
      this.props.check && this.checkResult() && !this.props.win) {
      this.props.setWin(true)
      console.log('-')
    }
  }

  clickHandler(index) {
    console.log('-> this.state.sentences', this.state.sentences)
    console.log('-> this.state.items', this.state.items)
    const sourceClone = Array.from(this.state.items)
    const destClone = Array.from(this.state.selected)
    const [removed] = sourceClone.splice(index, 1)
    destClone.splice(destClone.length, 0, removed)
    this.setState({ items: sourceClone })
    this.setState({ selected: destClone })
  }

  getList(id) { return this.state[this.state[id]] }

  getItemStyle(item, isDragging, draggableStyle) {
    const widthToOneChar = this.state.width / this.state.numOfChars
    const curWidth = item.content.length * widthToOneChar
    return {
      boxSizing: 'border-box',
      outline: '1px solid white',
      color: 'white',
      textAlign: 'center',
      userSelect: 'none',
      padding: '0',
      margin: '0',
      width: `${curWidth}px`,
      background: isDragging ? 'lightgreen' : 'blue',
      ...draggableStyle
    }
  }

  getItemStyleSelected(index, item, isDragging, draggableStyle, check) {
    const widthToOneChar = this.state.width / this.state.numOfChars
    const curWidth = item.content.length * widthToOneChar
    let color
    if (!check) color = 'blue'
    else {
      color = index === +item.id ? 'green' : 'red'
    }
    return {
      boxSizing: 'border-box',
      outline: '1px solid white',
      color: 'white',
      textAlign: 'center',
      userSelect: 'none',
      padding: '0',
      margin: '0',
      width: `${curWidth}px`,
      background: isDragging ? 'lightgreen' : `${color}`,

      ...draggableStyle
    }
  }

  onDragEnd(result) {
    const { source, destination } = result
    if (!destination) {
      return
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      )
      let state = { items }
      if (source.droppableId === 'droppable2') {
        state = { selected: items }
      }
      this.setState(state)
    } else {
      const result1 = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      )
      this.setState({
        items: result1.droppable,
        selected: result1.droppable2
      })
    }
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div className='drop'
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}>
              {this.state.items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}>
                  {(provided1, snapshot1) => (
                    <div onClick={() => this.clickHandler(index)}
                      ref={provided1.innerRef}
                      {...provided1.draggableProps}
                      {...provided1.dragHandleProps}
                      style={this.getItemStyle(
                        item,
                        snapshot1.isDragging,
                        provided1.draggableProps.style
                      )}>
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="droppable2" direction="horizontal">
          {(provided, snapshot) => (
            <div className='drop2'
              ref={provided.innerRef}
              style={this.getListStyle2(snapshot.isDraggingOver)}>
              {this.state.selected.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}>
                  {(provided1, snapshot1) => (
                    <div
                      ref={provided1.innerRef}
                      {...provided1.draggableProps}
                      {...provided1.dragHandleProps}
                      style={this.getItemStyleSelected(
                        index,
                        item,
                        snapshot1.isDragging,
                        provided1.draggableProps.style,
                        this.props.check
                      )}>
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

DragNdrop.propTypes = {
  wordsData: PropTypes.object,
  setAllInSelected: PropTypes.function,
  allInSelected: PropTypes.bool,
  check: PropTypes.bool,
  setCheck: PropTypes.func,
  setWin: PropTypes.func,
  win: PropTypes.bool
}

export default DragNdrop
