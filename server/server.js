const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const socketIO = require('socket.io');
const http = require('http');
require('dotenv').config({ path: '../.env' });


const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

let httpServer = http.createServer(app);
let io = socketIO(httpServer, {
  cors: {
    origin: ["http://localhost:3000"]
  }
});



// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);


let question1 = "";
let question2 = "";
let vote1 = 0;
let vote2 = 0;
let inGame = false;
io.on("connection", socket => {
  // socket.join("answerQ.js");
  socket.on("question-created", (isQuestion1, question) => {
    if (isQuestion1) {
      question1 = question;
      socket.broadcast.emit("question-created-server", isQuestion1, question);
    } else {
      question2 = question;
      socket.broadcast.emit("question-created-server", isQuestion1, question);
    }
  });

  socket.on("vote", (isQuestion1) => {
    if (isQuestion1) {
      vote1++;
    } else {
      vote2++;
    }
    io.emit("vote-update", vote1, vote2);
  });

  socket.on("start-game", () => {
    if (inGame) return;
    io.emit("next-question");
    startGame();
  });

  socket.on("end-game", () => {

  });


});

const startGame = () => {
  inGame = true;
  let secondsLeft = 20;
  console.log("starting");
  const timer = setInterval(() => {
    secondsLeft--;
    console.log(secondsLeft);
    if (secondsLeft === 0) {
      console.log("ending");
      io.emit("end-question", vote1, vote2);
      console.log('end-question');
      clearInterval(timer);
      nextGame();
    }
  }, 1000);
};

const nextGame = () => {
  question1 = "";
  question2 = "";
  vote1 = 0;
  vote2 = 0;
  let secondsLeft = 5;
  console.log("Next game");
  const timer = setInterval(() => {
    console.log(secondsLeft);
    secondsLeft--;
    if (secondsLeft === 0) {
      io.emit("next-question");
      console.log('next-question');
      clearInterval(timer);
      startGame();
    }
  }, 1000);

}

// io.to("room1").emit("some event");

// // broadcast to a room from a given socket:
// io.on("connection", function(socket){
//   socket.to("some room").emit("some event");
// });

// io.on("connection", socket => {
//   socket.on("private message", (anotherSocketId, msg) => {
//     socket.to(anotherSocketId).emit("private message", socket.id, msg);
//   });
// });


// // broadcast data to each device / tab of a given user
// io.on("connection", async (socket) => {
//   const userId = await fetchUserId(socket);

//   socket.join(userId);

//   // and then later
//   io.to(userId).emit("hi");
// });
// // send notifications about a given entity
// io.on("connection", async (socket) => {
//   const projects = await fetchProjects(socket);

//   projects.forEach(project => socket.join("project:" + project.id));

//   // and then later
//   io.to("project:4321").emit("project updated");
// });

// const details = await fetchDetails();
// io.to("room2").emit("details", details);

// io.on("connection", socket => {
//   socket.on("disconnecting", () => {
//     console.log(socket.rooms); // the Set contains at least the socket ID
//   });

//   socket.on("disconnect", () => {
//     socket.rooms.size === 0
//   });
// });


// const rooms = io.of("/").adapter.rooms;
// const sids = io.of("/").adapter.sids;


// io.of("/").adapter.on("create-room", (room) => {
//   console.log(`room ${room} was created`);
// });

// io.of("/").adapter.on("join-room", (room, id) => {
//   console.log(`socket ${id} has joined room ${room}`);
// });