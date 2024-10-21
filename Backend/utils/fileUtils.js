const customConsole = require("./customConsole");
const fs = require("fs");
const path = require("path");

class FileUtils {
  // Read the .env file and decide the path to use.
  static #FILES_PATH = function () {
    switch (process.env.SERVE_FROM_ROOT) {
      case "true":
        return path.join(__dirname, "..", process.env.FOLDERNAME);
      default:
        return process.env.FULL_PATH_TO_SERVE_FROM;
    }
  };

  static getDirectoryContent(dir = FileUtils.#FILES_PATH()) {
    const content = fs.readdirSync(dir).map((file) => {
      const fullPath = path.join(dir, file);

      // Converted to MB
      const size = fs.statSync(fullPath).size / 1048578;

      return fs.statSync(fullPath).isDirectory()
        ? {
            name: file,
            type: "Directory",
            size: size,
            fullpath: fullPath,
            content: this.getDirectoryContent(fullPath),
          }
        : { name: file, type: "File", size: size, fullpath: fullPath };
    });

    return content;
  }

  // When using your own entire Path like /User/blitz/Downloads and you add a not existing path to it,
  // it will create those folders.
  static validateExistensOfDirectory() {
    try {
      if (!fs.existsSync(FileUtils.#FILES_PATH())) {
        fs.mkdir(FileUtils.#FILES_PATH(), { recursive: true }, (err) => {
          if (err) throw err;
        });
        customConsole.warn("Set directory not found! Creating new one.");
      }
    } catch (err) {
      customConsole.error(err);
    }
  }
}

module.exports = FileUtils;
