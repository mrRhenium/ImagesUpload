const express = require("express");
const app = express();
const port = 8000;
//

app.get("/", (req, res) => {
  res.send("media Server");
});

// listen the port
app.listen(port, () => {
  console.log(`Media Server listening on port no ${port}`);
});
