const express = require("express");
const cors = require("cors");
const server = express();
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

server.use(logger);
server.use(express.json());
server.use(cors());

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(errorHandler);

module.exports = server;

//custom middleware

function logger(req, res, next) {
  console.log(
    `${new Date().toLocaleTimeString()}: ${req.method} Request to ${
      req.originalUrl
    }`
  );
  next();
}

function errorHandler(err, req, res, next) {
  res.status(err.code).send(err.message);
}
