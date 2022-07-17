const multer = require("multer");
const fs = require("fs/promises");
const old_fs = require("fs");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    let q_id = req.body.q_id || req.params.q_id;
    let prev_img = req.params.prev_img;

    try {
      //

      let exist = old_fs.existsSync(`public/images/${q_id}`);

      console.log(exist);

      if (!exist) {
        await fs.mkdir(`public/images/${q_id}`, { recursive: true });
      } //
      else {
        await fs.unlink(`public/images/${q_id}/${prev_img}`);
        console.log("previous Image is cleared");
      }

      //
    } catch (err) {
      console.log(err);
    }

    cb(null, `public/images/${q_id}`);
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
