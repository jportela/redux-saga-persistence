import React from 'react';
import { Button, ButtonGroup, Label } from 'react-bootstrap';

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
    const unsavedChanges = this.props.unsavedChanges ? <Label bsStyle="warning">Unsaved Changes</Label> : null;
    return (
    <div className="control-panel">
      <ButtonGroup>
        <Button bsStyle="primary" onClick={this.handleCreateImage}>Create</Button>
        <Button bsStyle="danger" onClick={this.handleClearViewport}>Clear</Button>
      </ButtonGroup>
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
