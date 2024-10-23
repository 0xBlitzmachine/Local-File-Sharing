require("dotenv").config();

const app = require("express")();

// const path = require("path");
const fileUtils = require("./utils/fileUtils");
const customConsole = require("./utils/customConsole");

// API
/*
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
*/

app.get("/files", (_, res) => {
  const content = fileUtils.getDirectoryContent();

  if (!content) {
    res.send({ message: "Content is null. Check console for error." });
    return;
  } else if (content.length === 0) {
    res.send({ message: "Directory has no content!" });
    return;
  }

  res.send(content);
});

if (fileUtils.validateExistensOfDirectory()) {
  app.listen(
    process.env.PORT | 3000,
    process.env.HOSTNAME | "0.0.0.0",
    function () {
      customConsole.warn(
        `Server started! Listening at http://${process.env.HOSTNAME}:${process.env.PORT}/files`
      );
    }
  );
}
