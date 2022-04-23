//init express project
const express = require('express');
const app = express();

//For Forms
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));

const fs = require('fs');

const result = require("./result.json")

//get post create delete


app.get("/", (req, res) => {
    res.send({
        title: "Geld Für Kuchenbasar",
        answers: [
            "Spenden",
            "Mittag essen gegehn",
            "Bowlen"
        ]
    });
})

app.post("/answer", (req, res) => {
    const answer = req.body.answer;
    console.log(answer);
    if (result[answer] == null) {
        result[answer].votes = 1
    } else {
        result[answer].votes += 1
    }
    fs.writeFile("./result.json", JSON.stringify(result), (err) => {
        if (err) {
            console.log(err)
            res.send({error: `error: ${err}`})
        }
    })
    res.send({"status": "ok"})
})

app.get("/result", (req, res) => {
    res.send(result)
})

app.get("/adminlogin", (req, res) => {
    res.render("adminlogin")
})

app.get("/admin", (req, res) => {
    res.render("admin")
})

//404

app.all("*", (req, res) => {
    res.status(404);
    res.send("Not Found");
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});