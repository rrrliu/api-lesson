const express = require('express');
const app = express();

// Feel free to change port
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => console.log(`App running on port ${port}`));