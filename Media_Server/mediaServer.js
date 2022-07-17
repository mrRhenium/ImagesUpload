// import the libraries
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises");

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
// routing starts here
// *****************************
app.get("/", (req, res) => {
  res.send("media Server");
});

app.post("/media", upload.single("imageFile"), (req, res) => {
  console.log("post", req.body.q_id);
  res.json("Seccesfully uploaded");
});

app.put("/media/:q_id/:prev_img", upload.single("updated_img"), (req, res) => {
  console.log("put", req.params.q_id);
  res.json({ message: "image Updated" });
});

app.delete("/media/:q_id", async (req, res) => {
  try {
    //
    let q_id = req.params.q_id;
    console.log("delete", q_id);

    await fs.rm(`public/images/${q_id}`, { recursive: true });

    res.json({ message: "images deleted" });

    //
  } catch (err) {
    console.log(err);
  }
});

// *****************************
// routing ends here
// *****************************

// *****************************
// listen the port
// *****************************
app.listen(port, () => {
  console.log(`Media Server running at`);
  console.log(`http://localhost:${port}/`);
});
