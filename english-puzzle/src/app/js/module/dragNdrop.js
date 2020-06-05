import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const getItems = (count, offset = 0) => Array.from({ length: count }, (v, k) => k).map((k) => ({
  id: `item-${k + offset}`,
  content: `item ${k + offset}`
}))

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

/**
 * Moves an item from one list to another list.
 */
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
  width: '400px'
})

class DragNdrop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {
          id: 'item-0',
          content: 'I'
        },
        {
          id: 'item-1',
          content: 'love'
        },
        {
          id: 'item-2',
          content: 'you'
        },
        {
          id: 'item-3',
          content: 'much'
        }
      ],
      selected: [],
      droppable: 'items',
      droppable2: 'selected'
    }
    this.getList = this.getList.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.getItemStyle = this.getItemStyle.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler(index) {
    console.log('-> index', index)
    const sourceClone = Array.from(this.state.items)
    const destClone = Array.from(this.state.selected)
    const [removed] = sourceClone.splice(index, 1)
    destClone.splice(destClone.length, 0, removed)
    this.setState({ items: sourceClone })
    this.setState({ selected: destClone })

  }

  getList(id) { return this.state[this.state[id]] }

  getItemStyle(item, isDragging, draggableStyle) {
    const curWidth = item.content.length * 10
    return {
      color: 'white',
      textAlign: 'center',
      userSelect: 'none',
      padding: '0',
      margin: '0',
      width: `${curWidth}px`,
      background: isDragging ? 'green' : 'blue',
      ...draggableStyle
    }
  }

  onDragEnd(result) {
    const { source, destination } = result
    // dropped outside the list
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
              style={getListStyle(snapshot.isDraggingOver)}>
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
      </DragDropContext>
    )
  }
}

export default DragNdrop
