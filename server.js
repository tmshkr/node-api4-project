require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const server = express();
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

// server.use(logger);
server.use(express.json());
server.use(cors());

// Serve static files from the React app
server.use(express.static(path.join(__dirname, "client/build")));

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/is-heroku", (req, res) => {
  res.send(process.env.IS_HEROKU || "nope");
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

server.use(errorHandler);

module.exports = server;

//custom middleware

function logger(req, res, next) {
  console.log(
    `${new Date().toLocaleTimeString()}: ${req.method} ${req.originalUrl}`
  );
  next();
}

function errorHandler(err, req, res, next) {
  res.status(err.code).send(err.message);
}
