const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(process.env.mongoConnectionString, (err, client) => {});

app.listen(3000, () => {
    console.log("listening on port 3000");
});

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/quotes", (req, res) => {
    console.log(req.body);
});
