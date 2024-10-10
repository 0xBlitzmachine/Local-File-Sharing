// Import Express and initialize it.
const express = require("express")
const app = express()

// Import path and file utils
const fileUtils = require("./utils/fileUtils")
const path = require("path")

const fs = require("fs")

// Customizable user configuration
const hostconfig = require("./hostconfig.json")
const filesPath = path.join(__dirname, hostconfig.folderPathToServeFrom)



// API
app.get("/", (_, res) => {
    const test = fileUtils.getDirectoryContent(filesPath)
    res.send(test)
})

fileUtils.validateExistensOfDirectory(filesPath)

app.listen(hostconfig.port, hostconfig.hostname, () => {
    console.log(`LocalFileSharing: Backend-Server listening at http://${hostconfig.hostname}:${hostconfig.port} ...`)
})
