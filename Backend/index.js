require("dotenv").config();

const app = require("express")();

const path = require("path");
const fileUtils = require("./utils/fileUtils");
const customConsole = require("./utils/customConsole");

// API
/*
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
*/

// TESTING
app.get("/files/:filename", (req, res) => {


  // TESTING
  console.log(path.join(__dirname, process.env.FOLDERNAME, "root", req.params.filename))
  res.download(path.join(process.env.FOLDERNAME, "root", req.params.filename), function (err) {
    if (err) customConsole.error(err)
  })

  /*
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
  */
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
} else {
  customConsole.error(
    "Couldnt validate the existens of directory using the set path"
  );
}
