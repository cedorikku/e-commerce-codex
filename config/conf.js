const mongoose = require('mongoose');
require('dotenv').config();
const mongo_url = 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@db-cluster.q2r17kk.mongodb.net/?retryWrites=true&w=majority&appName=db-cluster';

mongoose.connect(mongo_url)
.then('connected', () => console.log(`App connected to a database: ${storeDB}`))
.catch((error) => console.log(error.message));