import React from 'react';

export default class Image extends React.Component {
  constructor() {
    super();
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentWillUnmount() {

    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  // calculate relative position to the mouse and set dragging=true
  onMouseDown (e) {
    // only left mouse button
    if (e.button !== 0) {
      return;
    }

    this.initialPosition = {
      x: e.pageX - this.props.x,
      y: e.pageY - this.props.y
    };

    this.isDragging = true;
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseUp () {
    this.isDragging = false;
    window.removeEventListener('mousemove', this.onMouseUp);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove (e) {
    if (!this.isDragging) {
      return;
    }

    const maxX = this.props.viewportWidth - this.props.width;
    const maxY = this.props.viewportHeight - this.props.height;

    let x = boundPoint(e.pageX - this.initialPosition.x, 0, maxX);
    let y = boundPoint(e.pageY - this.initialPosition.y, 0, maxY);

    this.props.moveImage({
      id: this.props.id,
      x,
      y
    });
  }

  render() {
    const { x, y, width, height } = this.props;
    const styles = {
      width,
      height,
      transform: `translate3d(${x}px, ${y}px, 0)`,
      background: this.props.color
    };
    return (<div
      className='viewport-image'
      onMouseDown={this.onMouseDown}
      style={styles} />
    );
  }
}

Image.propTypes = {
  id: React.PropTypes.number,
  color: React.PropTypes.string,
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  viewportWidth: React.PropTypes.number,
  viewportHeight: React.PropTypes.number,
  moveImage: React.PropTypes.func
};

function boundPoint(x, minX, maxX) {
  if (x < minX) {
    return minX;
  }
  else if (x > maxX) {
    return maxX;
  }
  return x;
}
