//init express project
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authenticator = require('./Authenticator');


//For Forms
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(cors());

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));
app.use(authenticator)

const fs = require('fs');

const data = require("./data.json");
let result = require("./result.json");
const password = "password";

//get post create delete

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/questionnaire", (req, res) => {
    res.send(data)
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
    res.redirect("/Diagram.html")
})

app.get("/result", (req, res) => {
    res.send(result)
})

app.get("/adminlogin", (req, res) => {
    if (res.cookie.loggedIn != null) {
        res.send("already logged in")
    }
    res.render("adminlogin")
})

app.post("/adminlogin", (req, res) => {
    const inputtetPassword = req.body.password

    if (inputtetPassword === password) {
        console.log("the password is correct")
        res.cookie("loggedIn", true).redirect("/")
    } else
        res.send({error: "incorrect password"})
})

app.post("/admin/new", (req, res) => {
    var json = req.body;
    var question;
    var answers = [];
    result = [];
    var id = 0;
    Object.keys(json).forEach(function (key) {
        if (key === "question") {
            question = json[key];
        } else {
            answers.push(json[key]);
            result.push({"id": id, "votes": 0});
            id += 1;
        }
    })

    // clear results
    fs.writeFile("./result.json", JSON.stringify(result), (err) => {
        if (err) {
            console.log(err)
            res.send({error: `error: ${err}`})
        }
    })

    data.question = question;
    data.answers = answers;

    fs.writeFile("./data.json", JSON.stringify(data), (err) => {
        if (err) {
            console.log(err)
            res.send({error: `error: ${err}`})
        }
    })

    res.redirect("/admin")
})


app.get("/admin/new", (req, res) => {
    res.render("NewQuestionnaire")
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
