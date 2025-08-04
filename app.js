require('dotenv').config();

const express = require('express');

const PORT = 3001;

const app = express();

// database connection
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@test-cluster.zd4zpe4.mongodb.net/${process.env.DB_NAME}`;
mongoose.connect(dbURI)
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// routes
//('*') = all the routes