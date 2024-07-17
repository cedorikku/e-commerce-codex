const express = require('express');
const app = express();
const path = require('path');
const port = process.env.port || 8080;
const mongo_url = "mongodb+srv://colAdmin:HudEMjjYEHQut6zX@db-cluster.q2r17kk.mongodb.net/?retryWrites=true&w=majority&appName=db-cluster;";

const mongoose = require('mongoose');

mongoose.connect(mongo_url)
.then(() => {
  mongoose.connection.on('connected', () => console.log(`App connected to a database: ${storeDB}`));
  mongoose.connection.on('disconnected', () => console.log(`App disconnected from the database: ${storeDB}`));

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
}).catch((error) => console.log(error.message));


app.use(express.static('public'));

app.get('/', (res, req) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (error) => {
    if (error) res.status(500).send("Error serving the file");
  });
});