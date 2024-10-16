require("dotenv").config()

const app = require("express")()
const fileUtils = require("./utils/fileUtils")
const path = require("path")

const filePath = path.join(__dirname, process.env.FOLDER_FROM_PATH_TO_SERVE)

// API
app.get("/", (_, res) => {
    const test = fileUtils.getDirectoryContent(filePath)
    res.send(test)
})

fileUtils.validateExistensOfDirectory(filePath)

app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`LocalFileSharing: Backend-Server listening at ${process.env.HOSTNAME}:${process.env.PORT}`)
    console.log(filePath)
})
