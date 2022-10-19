const express = require('express');
const router = express.Router();
const Note = require('./../model/Note');

router.get("/list/all", async function (request, response) {
    var notes = await Note.find();
    response.json(notes);
});

router.get("/list/:userid", async function (request, response) {
    var notes = await Note.find({ userid: request.params.userid });
    response.json(notes);
});

router.post("/add", async function (request, response) {
    await Note.deleteOne({ id: request.body.id });

    const newNote = new Note({
        id: request.body.id,
        userid: request.body.userid,
        title: request.body.title,
        content: request.body.content
    });
    await newNote.save();
    response.json({ message: "New note created " + `${request.body.id}` });
});

router.delete("/delete/:id", async function (request, response) {
    await Note.deleteOne({ id: request.params.id });
    response.json({ message: "Note deleted " + `${request.params.id}` });
});

module.exports = router;