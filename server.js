const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const uri = process.env.mongoConnectionString;

MongoClient.connect(uri)
    .then((client) => {
        const db = client.db("star-wars-quotes");
        const quotesCollection = db.collection("quotes");

        app.listen(3000, () => {
            console.log("listening on port 3000");
        });

        app.use(express.urlencoded({ extended: true }));

        app.get("/", (req, res) => {
            res.sendFile(__dirname + "/index.html");
        });

        app.post("/quotes", (req, res) => {
            quotesCollection
                .insertOne(req.body)
                .then((result) => res.redirect("/"))
                .catch((error) => console.error(error));
        });
    })
    .catch((error) => console.error(error));
