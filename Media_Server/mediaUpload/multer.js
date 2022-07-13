const multer = require("multer");
const fs = require("fs/promises");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      //

      // firstly make the specific folder ans then save the image
      await fs.mkdir(`public/images/${req.body.q_id}`);

      //
    } catch (err) {
      console.log(err);
    }

    cb(null, `public/images/${req.body.q_id}`);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

module.exports = upload;
