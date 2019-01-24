import React, { Component } from 'react';
import router from './router';
import io from 'socket.io-client';

import './reset.css';
import './App.css';

const socket = io('http://localhost:8005');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: ''
    }

    this.connectCb = this.connectCb.bind(this);
    this.eventCb = this.eventCb.bind(this);
    this.disconnectCb = this.disconnectCb.bind(this);
  }

  componentDidMount(){
    socket.on('connect', this.connectCb);
    socket.on('event', this.eventCb);
    socket.on('disconnect', this.disconnectDb);
  }

  connectCb(){
    alert('connect')
  }
  
  eventCb(data){
    this.setState({data});
    socket.emit('customEvent', 'test', data => alert(data))
  }

  disconnectCb(){
    alert('disconnect')
  }

  componentWillUnmount(){
    io.sockets.removeListener('connect', this.connectCb);
    io.sockets.removeListener('event', this.eventCb);
    io.sockets.removeListener('disconnect', this.disconnectCb);
  }

  render() {
    return (
      <div className="App">

          { router }
          {JSON.stringify(this.state.data)}

      </div>
    );
  }
}


export default App;
