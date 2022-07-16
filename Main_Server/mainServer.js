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

app.get("/upload", async (req, res) => {
  try {
    //

    const data = await Question.find({});

    if (data.length) {
      res.json(data);
    } //
    else {
      res.json({ message: "Database is empty" });
    }

    //
  } catch (err) {
    console.log(err);
  }
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

app.delete("/upload/:q_id", async (req, res) => {
  try {
    //

    let q_id = req.params.q_id;
    console.log(q_id);

    const del = await Question.deleteOne({ q_id: q_id });

    res.json({ message: "Question deleted" });

    //
  } catch (err) {
    console.log(err);
  }
});

// **************************
// routing ends here
// **************************

// **************************
// server listning here
// **************************
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
