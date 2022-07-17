const cors = require("cors");

const whiteList = ["http://127.0.0.1:5500"];

const corsOptionDelegate = (req, callback) => {
  let corsOptions;

  if (whiteList.indexOf(req.header("Origin")) !== -1) {
    //

    corsOptions = {
      origin: true,
      methods: ["DELETE", "PUT"],
    };
    callback(null, corsOptions);

    //
  } else {
    //

    corsOptions = {
      origin: false,
    };
    callback(null, corsOptions);

    //
  }

  //
};

module.exports = cors(corsOptionDelegate);
