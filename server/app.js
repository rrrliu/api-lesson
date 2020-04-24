const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Feel free to change port
const port = 8000;

// Express middleware
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => console.log(`App running on port ${port}`));