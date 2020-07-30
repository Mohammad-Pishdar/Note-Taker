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
    fs.readFile('./db/db.json', 'utf8', function (err, data) {
        res.json(JSON.parse(data));
    });

});

app.post("/api/notes", (req, res) => {

    const newNote = req.body;
    notesData.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(notesData), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });


    console.log(notesData);

    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {

    const chosen = req.params.id;
    console.log(chosen);

    fs.readFile('./db/db.json', 'utf8', function (err, data) {

        let jsonData = JSON.parse(data);

        for (let i = 0; i < jsonData.length; i++) {
            if (jsonData[i].id === chosen) {
                jsonData.splice(i, 1);
            }
        }

        console.log(jsonData);

        fs.writeFile('./db/db.json', JSON.stringify(jsonData), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });


    });
});





app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
});