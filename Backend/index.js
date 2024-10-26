require("dotenv").config();

const app = require("express")();

const fileUtils = require("./utils/fileUtils");
const customConsole = require("./utils/customConsole");


// API
app.get("/files/", (_, res) => {
  const content = fileUtils.getDirectoryContent();

  if (!content) {
    res
      .statusCode(404)
      .json({ message: "Content is null. Check console for error." });
    return;
  } else if (content.length === 0) {
    res
      .statusCode(200)
      .json({ message: "Directory has no content!" });
    return;
  }

  res.send(content);
});

// Dont start the server if it cant serve from anywhere
if (fileUtils.validateExistensOfDirectory()) {
  app.listen(
    process.env.PORT | 3000,
    process.env.HOSTNAME | "0.0.0.0",
    () => {
      customConsole.error(fileUtils.isServingFromRoot)
      customConsole.warn(
        `Server started! Listening at http://${process.env.HOSTNAME}:${process.env.PORT}/files`
      );
    }
  );
} else {
  customConsole.error(
    "Couldnt validate the existens of directory using the set path"
  );
}
