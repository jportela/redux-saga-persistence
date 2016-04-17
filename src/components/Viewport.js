import React from 'react';
import Image from './Image';

class Viewport extends React.Component {

  renderImages() {
    return this.props.images.map(img => {
      return <Image
        key={`image-${img.id}`}
        id={img.id}
        x={img.x}
        y={img.y}
        width={img.width}
        height={img.height}
        color={img.color}
        viewportWidth={this.props.width}
        viewportHeight={this.props.height}
        moveImage={this.props.moveImage} />;
    });
  }

  render() {
    const images = this.renderImages();
    const styles = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`
    };
    return (
      <div
        className="viewport"
        style={styles}>
        {images}
      </div>
    );
  }
}

Viewport.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  images: React.PropTypes.array,
  moveImage: React.PropTypes.func
};

export default Viewport;
