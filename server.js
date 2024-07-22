const express = require('express');
const ejs = require('ejs');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;

app.use(express.json(), express.static('public'));

require('./config/conf');

app.set('view engine', 'ejs');

const setupRoutes = require('./routes/route'); 
setupRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
