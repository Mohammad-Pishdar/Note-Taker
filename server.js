const express = require("express");
const fs = require("fs");
const path = require("path");
const notesData = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(notesData);
});

app.post("/api/notes", (req, res) => {

    const newNote = req.body;

    console.log(newNote);

    notesData.push(newNote);

    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {

    const chosen = req.params.id;

    return res.status(200);
});





app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
});