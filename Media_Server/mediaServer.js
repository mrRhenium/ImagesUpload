// import the libraries
const express = require("express");
const bodyParser = require("body-parser");

// import the functions
const corsProtection = require("./Protection/corsOption");

// declare the variables
const app = express();
const port = 8000;

// *****************************
// using middleware
// *****************************

// body parser parse the upcoming json body
app.use(bodyParser.json());
//cors protection
app.use(corsProtection);

// *****************************
// routes start here
// *****************************
app.get("/", (req, res) => {
  res.send("media Server");
});

app.post("/images", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

// *****************************
// listen the port
// *****************************
app.listen(port, () => {
  console.log(`Media Server listening on port no ${port}`);
});
