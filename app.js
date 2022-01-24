const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const {
  VARIABLES_ENV: { FOLDER_AVATARS },
  HttpCode,
} = require("./utils");

const { authRouter, contactsRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
// folder for static
app.use(express.static(FOLDER_AVATARS));
app.use(cors());
app.use(express.json()); // body parser
app.use((req, res, next) => {
  app.set("lang", req.acceptsLanguages(["en", "ru"]));
  next();
});

// routes
app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

// page not found
app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
});

app.use((err, _req, res, _next) => {
  const ISE = HttpCode.INTERNAL_SERVER_ERROR;
  const statusCode = err.status || ISE;
  const status = statusCode === ISE ? "fail" : "error";

  res.status(statusCode).json({
    status: status,
    code: statusCode,
    message: err.message,
  });
});

module.exports = app;
