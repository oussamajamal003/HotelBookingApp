const express = require("express");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
require("dotenv").config();

const app = express();
app.use(express.json());

const db = require("./config/db");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname);
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello Express</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});



