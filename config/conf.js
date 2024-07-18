const mongoose = require('mongoose');
require('dotenv').config();
const mongo_url = 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@db-cluster.q2r17kk.mongodb.net/?retryWrites=true&w=majority&appName=codex-e-commerce';

mongoose.connect(mongo_url)
.then(() => console.log(`App connected to a database`))
.catch((error) => console.log(error.message));