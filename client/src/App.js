import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    endpoint: 'ws://localhost:5000',
    fetched: ''
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({
          fetched: res.myString
        })
      })
      .catch(err => {
        console.log('error fetching data', err)
      })

    // if user is running mozilla then use it's built-in WebSocket
    // window.WebSocket = window.WebSocket || window.MozWebSocket

    // const connection = new WebSocket('ws://127.0.0.1:3000')
    const socket = socketIOClient(this.state.endpoint);
  }

  callApi = async () => {
    const fetchedRes = await fetch('/api/hello')
    const data = await fetchedRes.json()

    if (fetchedRes.status !== 200) throw Error(data.message);

    return data;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. {this.state.fetched}
        </p>
      </div>
    );
  }
}

export default App;
