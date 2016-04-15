import React from 'react';

class ControlPanel extends React.Component {
  constructor() {
    super();
    this.handleCreateImage = this.handleCreateImage.bind(this);
    this.handleClearViewport = this.handleClearViewport.bind(this);
  }

  handleCreateImage() {
    this.props.createImage({
      x: 0,
      y: 0,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    });
  }

  handleClearViewport() {
    this.props.clearViewport();
  }

  render() {
    const unsavedChanges = this.props.unsavedChanges ? <span>You have unsaved changes!</span> : null;
    return (
    <div className='control-panel'>
      <button className='create-button' onClick={this.handleCreateImage}>Create</button>
      <button className='clear-button' onClick={this.handleClearViewport}>Clear</button>
      {unsavedChanges}
    </div>
    );
  }
}

ControlPanel.propTypes = {
  clearViewport: React.PropTypes.func,
  createImage: React.PropTypes.func,
  unsavedChanges: React.PropTypes.bool
};

export default ControlPanel;
