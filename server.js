const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const uri = process.env.mongoConnectionString;
const port = 3000;

MongoClient.connect(uri)
    .then((client) => {
        const db = client.db("star-wars-quotes");
        const quotesCollection = db.collection("quotes");

        app.set("view engine", "ejs");

        app.use(express.urlencoded({ extended: true }));

        app.get("/", (req, res) => {
            quotesCollection
                .find()
                .toArray()
                .then((results) => {
                    res.render("index.ejs", { quotesCollection: results });
                    console.log(results);
                })
                .catch((error) => console.error(error));
        });

        app.post("/quotes", (req, res) => {
            quotesCollection
                .insertOne(req.body)
                .then((result) => res.redirect("/"))
                .catch((error) => console.error(error));
        });

        app.listen(3000, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => console.error(error));
