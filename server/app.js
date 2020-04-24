const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const app = express();

// Express middleware
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// Feel free to change port
const port = 8000;

mongoose.connect("mongodb://localhost:27017", {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

db = mongoose.connection;
db.once('open', () => console.log("Connected to database."));
db.on('error', console.error.bind(console, 'connection error:'));

const Entry = mongoose.model('Entry', {
  state: String,
  days: Number
});

app.get("/entries", (req, res) => {
  Entry.find()
    .then(entries => res.send(entries))
});

app.post("/save", (req, res) => {
  const entry = new Entry(req.body)
  entry.save()
    .then(entry => res.send(`Saved ${entry} to database`));
});

app.listen(port, () => console.log(`App running on port ${port}`));
