import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {
  socketConnection,
  sendWelcome
} from './lib/api'

class App extends Component {

  constructor(props) {
    super(props)

    socketConnection({
      update: (update) => {
        console.log('got an update', update)
      },
      history: (history) => {
        console.log('got the history', history)
        
      }
    })

    this.state = {
      // fetched: '',
      name: ''
    }
  }

  componentDidMount() {
    const requestedName = prompt('What is your user name?')
    this.name = requestedName ? requestedName : 'wander_one'

    sendWelcome(this.name)
    
    // this.callApi()
    //   .then(res => {
    //     this.setState({
    //       fetched: res.myString
    //     })
    //   })
    //   .catch(err => {
    //     console.log('error fetching data', err)
    //   })
  }

  callApi = async () => {
    const fetchedRes = await fetch('/api/hello')
    const data = await fetchedRes.json()

    if (fetchedRes.status !== 200) throw Error(data.message);

    return data;
  }

  render() {
    // const { fetched } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button onClick={this.joinRoom}>Click</button> To get started, edit <code>src/App.js</code> and save to reload.
          {/* {fetched} */}
        </p>
      </div>
    );
  }
}

export default App;
