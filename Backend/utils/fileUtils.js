const customConsole = require("./customConsole")
const fs = require("fs")
const path = require("path")

class FileUtils {
    static getDirectoryContent(dirPath) {
        const content = fs.readdirSync(dirPath).map((file) => {
            const fullPath = path.join(dirPath, file)
    
            return fs.statSync(fullPath).isDirectory()
            ? { name: file, type: "directory", content: this.getDirectoryContent(fullPath) } 
            : { name: file, type: "file"}
        })

        return content
    }

    static validateExistensOfDirectory(dirPath) {
        try {
            if (!fs.existsSync(dirPath)) {
                fs.mkdir(dirPath, { recursive: true }, (err) => { if (err) throw err })
                customConsole.warn("Set directory not found! Creating new one.")
            }
        } catch (err) {
            customConsole.error(err)
        }
    }
}

module.exports = FileUtils