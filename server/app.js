const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())

// Feel free to change port
const port = 8000;

// Jank
const entries = []

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/entries', (req, res) => {
  res.send(entries);
  // TODO: Mongo shit
})

app.post('/save', (req, res) => {
  entries.push(req.body)
  // TODO: Mongo shit
  console.log('Saved ' + req.body)
  res.send('Successfully saved!');
})

app.listen(port, () => console.log(`App running on port ${port}`));