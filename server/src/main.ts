const express = require('express');
const cors = require('cors');
const database = require('./db-connection');
const http = require('http');
const api = require('./queries');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());
app.use(api);

const router = express.Router();

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
