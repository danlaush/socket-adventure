process.title = 'socket-server'

const path = require('path')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const escapeHtml = require('escape-html')

const port = process.env.PORT || 5000

const clients = []
const users = {}

const getUserById = id => users[id] || null;

// Array with some colors
const colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ]
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

const getPublicUsersList = () => Object.keys(users).map(id => users[id]).filter(user => !!user.name)

io.on('connection', connection => {
  console.log(new Date(), connection.id, '- new connection')
  const index = clients.push(connection) - 1;
  users[connection.id] = {}

  // send back chat history
  // if (history.length > 0) {
  //   connection.emit('history', history);
  // }

  connection.on('welcome',  name => {
    console.log(new Date(), `${connection.id} (${name}) - set name`)
    const thisUser = {
      name: escapeHtml(name),
      color: getRandomColor(),
    }
    users[connection.id] = thisUser
    
    console.log('updated users', users)
    connection.emit('identity', thisUser)
    connection.emit('updateUsers', getPublicUsersList())
    connection.broadcast.emit('updateUsers', getPublicUsersList())
  })

  // message listener
  connection.on('message', messageRaw => {
    const safeMessage = escapeHtml(messageRaw);
    const user = users[connection.id]
    const message = {
      content: safeMessage,
      ...user
    }
    console.log('message', message)
    connection.broadcast.emit('newMessage', message)
  })

  // close listener
  connection.on('disconnect', _ => {
    console.log(new Date(), `${connection.id} (${users[connection.id].name}) - connection closed`)
    clients.splice(index, 1)
    delete users[connection.id]
    connection.broadcast.emit('updateUsers', Object.keys(users).map(id => users[id]))
  })
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// \ô/ CORS errors begone! listen to the http server, not the express app
// https://github.com/socketio/socket.io/issues/2850#issuecomment-386624121
http.listen(port, () => {
  console.log(`${new Date()} Listening on port ${port}`)
})
