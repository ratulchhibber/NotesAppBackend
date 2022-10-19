const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Note = require('./model/Note');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
//extended true -> Allows nested objects
//extended false -> Does not allow nested objects
app.use(bodyParser.json());

const password = encodeURIComponent("");

mongoose.connect(`mongodb+srv://ratulchhibber:${password}@cluster0.wcdbqsz.mongodb.net/notesdb`)
    .then(function () {
        // Home Route (/)
        app.get("/", function (request, response) {
            response.send("HomePage");
        });

        const noteRouter = require('./routes/Note');
        app.use("/notes", noteRouter);
    });



app.listen(5055, function () {
    console.log("Server started, Port: 5055");
});