const express = require("express");
const router = express.Router();
const Note = require("./../model/Note");

router.get("/", function (request, response, next) {
  try {
    if (request.params.something == "") {
      response.send("@Homepage");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/list/all", async function (request, response, next) {
  try {
    var notes = await Note.find();
    response.json(notes);
  } catch (err) {
    next(err);
  }
});

router.get("/list/:userid", async function (request, response, next) {
  try {
    var notes = await Note.find({ userid: request.params.userid });
    response.json(notes);
  } catch (err) {
    next(err);
  }
});

router.post("/add", async function (request, response, next) {
  await Note.deleteOne({ id: request.body.id });
  try {
    const newNote = new Note({
      id: request.body.id,
      userid: request.body.userid,
      title: request.body.title,
      content: request.body.content,
    });
    await newNote.save();
    response.json({ message: "New note created " + `${request.body.id}` });
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:id", async function (request, response, next) {
  try {
    await Note.deleteOne({ id: request.params.id });
    response.json({ message: "Note deleted " + `${request.params.id}` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
