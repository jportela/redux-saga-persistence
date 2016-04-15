import React from 'react';
import { DragSource } from 'react-dnd';

const imageSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x,
      y: props.y,
      viewportWidth: props.viewportWidth,
      viewportHeight: props.viewportHeight
    };
  },
  endDrag(props, monitor) {
    var item = monitor.getItem();
    let x = item.x + monitor.getSourceClientOffset().x - monitor.getInitialSourceClientOffset().x;
    let y = item.y + monitor.getSourceClientOffset().y - monitor.getInitialSourceClientOffset().y;

    if (x < 0) {
      x = 0;
    }
    if (x > item.viewportWidth - 100) {
      x = item.viewportWidth - 100;
    }

    if (y < 0) {
      y = 0;
    }
    if (y > item.viewportHeight - 100) {
      y = item.viewportHeight - 100;
    }

    props.moveImage({
      id: item.id,
      x: x,
      y: y
    });
  }
};

function collect(connect) {
  return {
    connectDragSource: connect.dragSource()
  };
}

class Image extends React.Component {
  constructor() {
    super();
    this.handleImageMove = this.handleImageMove.bind(this);
  }

  handleImageMove() {
    this.props.moveImage({
      id: this.props.id,
      x: this.props.x,
      y: this.props.y
    });
  }

  render() {
    const { connectDragSource, x, y } = this.props;

    const styles = {
      transform: `translate3d(${x}px, ${y}px, 0)`,
      background: this.props.color
    };
    return connectDragSource(<div
      className='viewport-image'
      style={styles} />
    );
  }
}

Image.propTypes = {
  id: React.PropTypes.number,
  color: React.PropTypes.string,
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  viewportWidth: React.PropTypes.number,
  viewportHeight: React.PropTypes.number,
  moveImage: React.PropTypes.func,
  connectDragSource: React.PropTypes.func.isRequired
};

export default DragSource('IMAGE', imageSource, collect)(Image);
