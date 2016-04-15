import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import Viewport from '../components/Viewport';
import ControlPanel from '../components/ControlPanel';

export class App extends React.Component {

  render() {
    return (<div>
        <ControlPanel
          unsavedChanges={this.props.ui.unsavedChanges}
          createImage={this.props.actions.createImage}
          clearViewport={this.props.actions.clearViewport} />
        <Viewport
          width={600}
          height={600}
          images={this.props.viewport.images}
          moveImage={this.props.actions.moveImage}/>
      </div>
    );
  }
}

App.propTypes = {
  viewport: React.PropTypes.object,
  actions: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    viewport: state.viewport,
    ui: state.ui
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
