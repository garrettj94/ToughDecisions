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
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

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
    origin: ["http://localhost:3000", "https://toughdecisions.herokuapp.com/"]
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
  socket.on("question-created", (isQuestion1, question) => {
    if (question === "") return;
    if (isQuestion1) {
      if (question1 !== "")return;
      question1 = question;
      io.emit("question-created-server", isQuestion1, question);
    } else {
      if (question2 !== "")return;
      question2 = question;
      io.emit("question-created-server", isQuestion1, question);
    }
    if (question1 !== "" && question2 !== "") startGame();
  });

  socket.on("vote", (isQuestion1) => {
    if (!inGame) return;
    if (isQuestion1) {
      vote1++;
    } else {
      vote2++;
    }
    io.emit("vote-update", vote1, vote2);
  });

  socket.on("start-game", () => {
    if (question1 !== "") {
      socket.emit("question-created-server", true, question1);
    }
    if (question2 !== "") {
      socket.emit("question-created-server", false, question2);
    }
    socket.emit("vote-update", vote1, vote2);
    return;
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
    io.emit("timer-update", secondsLeft - 1);
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
  io.emit("timer-update", 20);
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
      inGame = false;
      io.emit("next-question");
      console.log('next-question');
      clearInterval(timer);
    }
  }, 1000);

}