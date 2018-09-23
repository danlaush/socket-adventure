const express = require('express')()
const http = require('http').Server(express);
const io = require('socket.io')(http)

const port = process.env.PORT || 5000

io.on('connection', connection => {
  console.log(new Date(), '- new connection', connection.id)

  // message listener
  connection.on('message', message => {
    if(message.type === 'utf8') { // check if its a string
      // process message
    }
  })

  // close listener
  connection.on('disconnect', _ => {
    console.log(new Date(), '- connection closed', connection.id)
  })
})

express.get('/api/hello', (req, res) => {
  res.send({
    myString: 'lolwut'
  })
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  express.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  express.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// \ô/ CORS errors begone!
// https://github.com/socketio/socket.io/issues/2850#issuecomment-386624121
http.listen(port, () => {
  console.log(`Listening on port ${port}`)
})