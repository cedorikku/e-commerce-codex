const express = require('express');
const app = express();
const path = require('path');
const port = process.env.port || 8080;
const storeDB = "mongodb://localhost:27017/household-items-store";

const mongoose = require('mongoose');

mongoose.connect(storeDB);

mongoose.connection.on('connected', () => console.log(`App connected to a database: ${storeDB}`));
mongoose.connection.on('error', (error) => console.log(error.message));
mongoose.connection.on('disconnected', () => console.log(`App disconnected from the database: ${storeDB}`));

app.use(express.static('public'));

app.get('/', (res, req) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (error) => {
    if (error) res.status(500).send("Error serving the file");
  });
});

app.listen(port, () => {
  console.log(`App connected to http://localhost:${port}/`);
})