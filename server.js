const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Note = require("./model/Note");
const bodyParser = require("body-parser");
const { handleError } = require("./error/error");

app.use(bodyParser.urlencoded({ extended: false }));
//extended true -> Allows nested objects
//extended false -> Does not allow nested objects
app.use(bodyParser.json());

app.use((req, res, next) => {
  const { method, path } = req;
  console.log(`New request to ${method} ${path}`);
  next();
});

const password = encodeURIComponent("Ratul@Mongodb01");

mongoose
  .connect(
    `mongodb+srv://ratulchhibber:${password}@cluster0.wcdbqsz.mongodb.net/notesdb`
  )
  .then(function () {
    app.get("/", function (request, response) {
      response.send("Homepage");
    });

    const noteRouter = require("./routes/Note");
    app.use("/notes", noteRouter);
    app.use(handleError);
  });

const PORT = process.env.PORT || 5055;
app.listen(PORT, function () {
  console.log(`Server started, Port: ${PORT}`);
});
