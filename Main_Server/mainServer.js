// import the libraries
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// import the functions
const corsProtection = require("./protection/corsOption");
const Question = require("./model/Question");

// declare the variables
const port = 3000;

// connect the database
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/questionsDb")
  .then(() => {
    console.log(`Database connected Succesfully`);
  })
  .catch((err) => {
    console.log(err);
  });
//

// *****************************
// using middleware : start here
// *****************************

// parse the upcoming json body
app.use(bodyParser.json());

// parse the upcoming url body
app.use(bodyParser.urlencoded({ extended: false }));

// implement the cors property for protection
app.use(corsProtection);
//

// **********************************
// routes start here
// **********************************

app.get("/", async (req, res) => {
  res.send("main Server");
});

app.post("/upload", async (req, res) => {
  console.log(req.body);

  try {
    //

    const data = await Question.create(req.body);
    res.status(200).send(data);

    //
  } catch (err) {
    console.log(err);
  }
});

// **************************
// server listning here
// **************************
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
