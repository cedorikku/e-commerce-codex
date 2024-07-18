const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.port || process.env.DB_PORT;

app.use(express.json(), express.static('public'));
require('./config/conf');

app.get('/', (res, req) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (error) => {
    if (error) res.status(500).send("Error serving the file");
  });
});

const controller = require('./controller/controllers')
app.put('/api/cart', controller.addToCart)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});