# Socket Adventure

This is a project where I'm exploring some topics in web development by trying them out.

| **Brand new** | **Expanding existing** |
| --- | --- |
| Web sockets | React |
| Client and API on same repo & server | Express |
| Game loop |  |
| Game state reflected in Canvas based on socket data |  |

## Task list/ Roadmap

1. [x] Bootstrap React app
1. [x] Basic express server with a route behind /api and the react app served to all other routes
1. [x] Web socket connection [_Used socket.io_]
1. [x] Client receives state from web socket 
  - Can update manually on server and see reflected in client UI
  - Users enter the room and see connected members to the room
1. [x] Client pushes event to web socket and broadcast to room
  - [ ] Collect username via React UI
  - [x] Show list of members in the room
  - [ ] Show log of members joining and leaving the room
1. [x] Users can send messages to others present in the room
1. [ ] Design game loop for playing rock paper scissors with a user in the room
1. [ ] ...implement the game loop. Use of 🤘📄✂️ emoji preferred
1. [ ] Ensure slow internet or disconnections fail gracefully
1. [ ] Multiplayer? Tournament?

