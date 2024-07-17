const express = require('express');
const app = express();
const path = require('path');
const port = process.env.port || 8080;
const inventoryDB = "mongodb://localhost:27017/inventory";

const mongoose = require('mongoose');

mongoose.connect(inventoryDB);

mongoose.connection.on('connected', () => console.log(`App connected to a database: ${inventoryDB}`));
mongoose.connection.on('error', (error) => console.log(error.message));
mongoose.connection.on('disconnected', () => console.log(`App disconnected from the database: ${inventoryDB}`));

app.use(express.static('public'));

app.get('/', (res, req) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (error) => {
    if (error) res.status(500).send("Error serving the file");
  });
});

app.listen(port, () => {
  console.log(`App connected to http://localhost:${port}/`);
})