import React, { Component, createRef } from "react";
import "./App.css";
import { socketConnection, sendWelcome, sendMessage } from "./lib/api";

class App extends Component {
  constructor(props) {
    super(props);

    socketConnection({
      updateUsers: (updateUsers) => {
        this.setState({ users: updateUsers });
      },
      newMessage: (message) => {
        this.setState({ messages: [...this.state.messages, message] });
        this.endOfMessages.current.scrollIntoView({ behavior: 'smooth' })
      },
      setIdentity: (userDetails) => {
        this.setState({ user: userDetails });
      },
    });

    this.state = {
      user: {},
      users: [],
      messages: [],
      message: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.endOfMessages = createRef();
  }

  componentDidMount() {
    const requestedName = prompt("What is your user name?");
    this.name = requestedName ? requestedName : "wander_one";

    sendWelcome(this.name);
  }

  callApi = async () => {
    const fetchedRes = await fetch("/api/hello");
    const data = await fetchedRes.json();

    if (fetchedRes.status !== 200) throw Error(data.message);

    return data;
  };

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    sendMessage(this.state.message);
    console.log("sent a message");
    this.setState({
      message: "",
      messages: [...this.state.messages, {
        content: this.state.message,
        ...this.state.user,
      }]
    });
    this.endOfMessages.current.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const { users, messages, message } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Chat</h1>
        </header>
        <ul>
          {users.map((user) => (
            <li style={{ color: user.color }}>{user.name}</li>
          ))}
        </ul>
        <div>
          {messages.map((message) => (
            <p style={{color: message.color}}>
              <strong>{message.name}:</strong> {message.content}
            </p>
          ))}
          <div ref={this.endOfMessages} />
        </div>
        <form className="Form" onSubmit={this.handleSubmit}>
          <input
            name="message"
            type="text"
            value={message}
            onChange={this.handleChange}
          />
          <button type="submit">&raquo;</button>
        </form>
      </div>
    );
  }
}

export default App;
