const express = require('express');
const cors = require('cors');
const database = require('./db-connection');
const http = require('http');
const api = require('./queries');

const app = express();
const router = express.Router();

app.use(api);

const port = 5001;

const server = http.createServer(app);

database.ping((error: Error) => {
  if (error) {
    console.error(error);
    throw new Error('Error in ping');
  }
  console.log('ping: ok');
});

server.listen(port, () => {
  console.log(`Server listen ${port} port`);
});
