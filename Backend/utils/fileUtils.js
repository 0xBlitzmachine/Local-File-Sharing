const customConsole = require("./customConsole");
const fs = require("fs");
const path = require("path");

class FileUtils {
  // Read the .env file and decide the path to use.
  static #FILES_PATH = function () {
    return process.env.SERVE_FROM_ROOT
      ? path.join(__dirname, "..", process.env.FOLDERNAME)
      : process.env.FULL_PATH_TO_SERVE_FROM;
  };

  static isServingFromRoot = process.env.SERVE_FROM_ROOT === "true" ? true : false
  static filesPath = FileUtils.#FILES_PATH()

  static getDirectoryContent(dir = this.filesPath) {
    try {
      const content = fs.readdirSync(dir).map((file) => {
        const fullPath = path.join(dir, file);

        // Better pass full bytes and convert it @Frontend
        const size = fs.statSync(fullPath).size;

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
    } catch (err) {
      customConsole.error(err);
      return null;
    }
  }

  // When using your own entire Path like /User/blitz/Downloads and you add a not existing path to it,
  // it will create those folders.
  static validateExistensOfDirectory() {
    try {
      if (!fs.existsSync(this.filesPath)) {
        fs.mkdirSync(this.filesPath, { recursive: true }, (err) => {
          if (err) throw err;
          customConsole.warn("Set directory not found! Creating new one.");
          return true;
        });
      }
      return true;
    } catch (err) {
      customConsole.error(err);
      return false;
    }
  }
}

module.exports = FileUtils;
