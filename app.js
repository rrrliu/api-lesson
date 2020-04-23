const express = require('express');
// const axios = require('axios');
const app = express();

// Feel free to change port
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/states/:state', (req, res) => {
  axios.get("https://covidtracking.com/api/states/daily")
    .then(covidRes => {
			res.send(covidRes.data.filter(e => {
				e.state = state
			}) + state)
		})
		.catch(err => {
			res.send(err)
		})
});

app.listen(port, () => console.log(`App running on port ${port}`));