// import the libraries
const express = require("express");
const bodyParser = require("body-parser");

// import the functions
const corsProtection = require("./Protection/corsOption");
const upload = require("./mediaUpload/multer");

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

// server static files to the client
app.use(express.static("public"));

// *****************************
// routes start here
// *****************************
app.get("/", (req, res) => {
  res.send("media Server");
});

app.post("/media", upload.single("imageFile"), (req, res) => {
  console.log(req.body);
  res.json("Seccesfully uploaded");
});

// *****************************
// listen the port
// *****************************
app.listen(port, () => {
  console.log(`Media Server running at`);
  console.log(`http://localhost:${port}/`);
});
