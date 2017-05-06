import React from 'react';
import PropTypes from 'prop-types';
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
  width: PropTypes.number,
  height: PropTypes.number,
  images: PropTypes.array,
  moveImage: PropTypes.func
};

export default Viewport;
