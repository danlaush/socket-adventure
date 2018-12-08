import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    socketUrl: 'ws://localhost:5000',
    fetched: ''
  }

  componentDidMount() {
    const requestedName = prompt('What is your user name?');
    const name = requestedName ? requestedName : 'wander_one';
    
    this.callApi()
      .then(res => {
        this.setState({
          fetched: res.myString
        })
      })
      .catch(err => {
        console.log('error fetching data', err)
      })
    
    const socket = socketIOClient(this.state.socketUrl);

    socket.on("update", data => this.setState({ response: data }));
  }

  callApi = async () => {
    const fetchedRes = await fetch('/api/hello')
    const data = await fetchedRes.json()

    if (fetchedRes.status !== 200) throw Error(data.message);

    return data;
  }

  render() {
    const { fetched } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. {fetched}
        </p>
      </div>
    );
  }
}

export default App;
