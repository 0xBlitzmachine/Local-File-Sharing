require("dotenv").config();

const express = require("express");
const app = express();

const fileUtils = require("./utils/fileUtils");
const customConsole = require("./utils/customConsole");

// API

app.get("/", (_, res) => {
  const test = fileUtils.getDirectoryContent(
    process.env.FULL_PATH_TO_SERVE_FROM
  );
  res.send(test);
});

// fileUtils.validateExistensOfDirectory();

app.listen(
  process.env.PORT | 3000,
  process.env.HOSTNAME | "0.0.0.0",
  function () {
    customConsole.warn(
      `Server started! Listening at http://${process.env.HOSTNAME}:${process.env.PORT}`
    );

    customConsole.warn(
      `Name of shared folder (Uploading/Downloading): ${process.env.FOLDERNAME}/`
    );
  }
);
