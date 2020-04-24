const express = require("express");
const cors = require("cors");
const app = express();
const MongoClient = require("mongodb").MongoClient;

// Express middleware
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// Feel free to change port
const port = 8000;

let db;

MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    db = client.db("test");
    db.collection("testCollection");
    db.collection("testCollection").insertOne({
      name: "pastEntries",
      pastEntries: [],
    });
  })
  .catch((error) => console.error(error));

app.get("/entries", (req, res) => {
  db.collection("testCollection").findOne({ name: "pastEntries" }, function (
    err,
    result
  ) {
    if (err) throw err;
    console.log(result);
    res.send(result.pastEntries);
  });
});

app.post("/save", (req, res) => {
  db.collection("testCollection").updateOne(
    { name: "pastEntries" },
    { $push: { pastEntries: req.body } }
  );
  console.log("saved" + req.body);
  res.send("Successfully saved!");
});

app.listen(port, () => console.log(`App running on port ${port}`));
