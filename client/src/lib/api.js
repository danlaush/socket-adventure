import socketIOClient from "socket.io-client";
const socketUrl = "https://a4b3aa16.ngrok.io";
const socket = socketIOClient(socketUrl);

const socketConnection = (config) => {
  const methods = {
    updateUsers: config.updateUsers,
    setIdentity: config.setIdentity,
    newMessage: config.newMessage,
  };

  socket.on("updateUsers", (users) => methods.updateUsers(users));
  socket.on("identity", (user) => methods.setIdentity(user));
  socket.on("newMessage", (message) => methods.newMessage(message));
};

const sendWelcome = (name) => {
  socket.emit("welcome", name);
};

const sendMessage = (message) => {
  socket.emit("message", message);
};

export { socketConnection, sendWelcome, sendMessage };
