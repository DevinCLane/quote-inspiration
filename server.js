const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const URI = process.env.mongoConnectionString;
const PORT = 3000;

MongoClient.connect(URI)
    .then((client) => {
        const db = client.db("star-wars-quotes");
        const quotesCollection = db.collection("quotes");

        app.set("view engine", "ejs");

        app.use(express.urlencoded({ extended: true }));
        app.use(express.static("public"));
        app.use(express.json());

        app.get("/", (req, res) => {
            quotesCollection
                .find()
                .toArray()
                .then((results) => {
                    res.render("index.ejs", { quotesCollection: results });
                })
                .catch((error) => console.error(error));
        });

        app.post("/quotes", (req, res) => {
            quotesCollection
                .insertOne(req.body)
                .then((result) => res.redirect("/"))
                .catch((error) => console.error(error));
        });

        app.put("/quotes", (req, res) => {
            quotesCollection
                .findOneAndUpdate(
                    { name: req.body.name },
                    {
                        $set: {
                            name: req.body.name,
                            quote: req.body.quote,
                        },
                    },
                    { upsert: true }
                )
                .then((result) => console.log(result))
                .catch((error) => console.error(error));
        });

        app.delete("/quotes", (req, res) => {
            quotesCollection
                .deleteOne({ name: req.body.name })
                .then((result) => {
                    res.json(`Deleted Darth vader's quote`);
                })
                .catch((error) => console.error(error));
        });

        app.listen(3000, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.error(error));
