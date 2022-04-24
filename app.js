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
const result = require("./result.json");
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

app.get("/try", (req, res) => {
	res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
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
    }

    res.send({error: "incorrect password"})
})

app.post("/admin/new", (req, res) => {
    var json = req.body;
    var question;
    var answers = [];
    var results = [];
    var id = 0;
    Object.keys(json).forEach(function (key) {
        if (key == "question") {
            question = json[key];
        } else {
            answers.push(json[key]);
            results.push({"id": id, "votes": 0});
            id += 1;
        }
    })

    if (answers.length === 0) {
        res.send({error: "no answers"})
    }

    // clear results
    fs.writeFile("./result.json", JSON.stringify(results), (err) => {
        if (err) {
            console.log(err)
            res.send({error: `error: ${err}`})
        }
    })
    fs.writeFile("./data.json", JSON.stringify({"question": question, "answers": answers}), (err) => {
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
