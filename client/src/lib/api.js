import socketIOClient from 'socket.io-client'
const socketUrl = 'ws://localhost:5000'
const socket = socketIOClient(socketUrl)

const socketConnection = (config) => {
    const methods = {
        update: config.update,
        history: config.history
    }
    
    socket.on("update", data => methods.update(data))
    socket.on("history", data => methods.history(data))
}

const sendWelcome = (name) => {
    socket.emit('welcome', name)
}

export { 
    socketConnection,
    sendWelcome
}
