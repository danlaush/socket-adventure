# Socket Adventure

Learning to work with WebSockets. Currently, a chat room. Join the room, see who's online, and send messages to the group. I'd like to incorporate a game element, to learn more about the game loop and how to facilitate real-time interaction between people.

## Getting started

### Dev mode

```
yarn && yarn develop
```

This will run `yarn server` and `yarn client` concurrently. You may find it easier to run the two commands in different terminal tabs. You will also need to change `socketUrl` in `./client/src/lib/api.js` to `http://localhost:5000`. The ngrok URL was temporary to get it working across devies.

### Production

Not permanently online, as this is an experiment. To run locally but let other devices to connect to the server the whole thing must be run through ngrok. This lets users connect to the socket securely.

1. Start an ngrok tunnel to get its URL

`ngrok http 5000 -host-header="localhost:5000"`

2. Edit `socketUrl` in `./client/src/lib/api.js` with the above URL

3. Build and run:
```
cd client && yarn build
cd .. && NODE_ENV=production yarn server
```

## Learnings

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

