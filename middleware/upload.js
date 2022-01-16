const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

const { UPLOAD_DIR } = process.env;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      return cb(null, true);
    }
    cb(new Error("Wrong format file for avatar!"));
  },
});

module.exports = upload;
