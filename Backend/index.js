require("dotenv").config()

const app = require("express")()
const fileUtils = require("./utils/fileUtils")
const customConsole = require("./utils/customConsole")

// API
app.get("/", (_, res) => {
    const test = fileUtils.getDirectoryContent(sharedDirectoryPath)
    res.send(test)
})


fileUtils.validateExistensOfDirectory(process.env.FOLDERNAME)

app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    customConsole.warn(`Server started! Listening at http://${process.env.HOSTNAME}:${process.env.PORT}`)
    customConsole.warn(`Name of shared folder (Uploading/Downloading): ${process.env.FOLDERNAME}/`)
})
