//init express project
const express = require('express');
const app = express();

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

})

app.all("*", (req, res) => {
    res.status(404);
    res.send("Not Found");
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});