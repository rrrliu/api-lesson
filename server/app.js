const express = require("express");
const cors = require("cors");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());

// Feel free to change port
const port = 8000;

let db;

MongoClient.connect("mongodb://localhost:27017", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then((client) => {
    console.log("Connected to Database");
    db = client.db("entry");
  })
  .catch((error) => console.error(error));

app.get("/entries", (req, res) => {
  db.collection("entryCollection")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});

app.post("/save", (req, res) => {
  db.collection("entryCollection").insertOne(req.body);
  res.send("Successfully saved!");
});

app.listen(port, () => console.log(`App running on port ${port}`));
