const app = require("../app");
const db = require("../config");
const { mkdir } = require("fs/promises");
const dotenv = require("dotenv");
require("../helpers");
dotenv.config({ path: "./config/.env" });

const { UPLOAD_DIR } = process.env;
const { PORT } = process.env || 3001;

db.then(() => {
  app.listen(PORT, async () => {
    await mkdir(UPLOAD_DIR, { recursive: true });
    console.log(`Server running. API port: ${PORT}`.brightBlue.bold);
  });
}).catch((err) => {
  console.log(`Server not running.Error: ${err.message}`.red.bold);
});
