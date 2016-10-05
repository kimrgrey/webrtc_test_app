import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  fetchRooms,
  createRoom,
  createRoomSubmit,
  createRoomCancel
} from 'actions/rooms';

import Progress from 'components/Progress';
// import RoomsList from 'components/RoomsList';
import RoomsGrid from 'components/RoomsGrid';
import RoomsListEmptyBanner from 'components/RoomsListEmptyBanner';
import RoomDialog from 'components/RoomDialog';

import Styles from './Styles.css';

class RoomsPage extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  roomsView () {
    const { rooms } = this.props;

    // return rooms.length ? <RoomsList rooms={ rooms } /> : <RoomsListEmptyBanner />;
    if (rooms.length) {
        return (
          <RoomsGrid
            rooms={ rooms }
            onJoinRoom={ this.joinRoom }
          />
        );
    }
    else {
      return <RoomsListEmptyBanner />;
    }
  }

  // TODO: replace with action
  joinRoom = (roomId) => console.log('join room', roomId);

  roomDialog() {
    return (
      <RoomDialog
        open={ this.props.creatingRoom }
        onSubmit={ this.props.createRoomSubmit }
        onCancel={ this.props.createRoomCancel }
      />
    );
  }

  pageContent() {
    const { loading, rooms } = this.props;

    return loading ? <Progress /> : this.roomsView();
  }

  addRoomButton() {
    return (
      <FloatingActionButton
        className={ Styles.action_button }
        onTouchTap={ this.props.createRoom }
      >
        <ContentAdd />
      </FloatingActionButton>
    );
  }

  render() {
    return (
      <div className={ Styles.container }>
        { this.pageContent() }
        { this.addRoomButton() }
        { this.roomDialog() }
      </div>
    );
  }
}

const mapStateToProps = (state) => state.rooms;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchRooms,
    createRoom,
    createRoomSubmit,
    createRoomCancel,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsPage);
