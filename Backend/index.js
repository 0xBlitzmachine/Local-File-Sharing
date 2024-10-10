// Import Express and initialize it.
const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()

// Properties
const host = "0.0.0.0"
const port = 3000
const filesLocation = path.join(__dirname, "files")


const getDirectoryContent = (dirPath) => {
    // Check for content 
    // Loop trough content and see if it is a file or another directory
    // Repeat for every sub directory
    // Return the file structure as JSON for the frontend.
}

// API

app.get("/", (_, res) => {
    res.send(path.join(__dirname, "files"))
})

try {
    if (!fs.existsSync(filesLocation)) {
        fs.mkdir(filesLocation, { recursive: true}, (err) => { if (err) throw err })
        console.warn("LocalFileSharing: No direction for file storage .. creating new one.")
    }

    app.listen(port, host, () => {
       console.log(`LocalFileSharing: Backend-Server listening at http://${host}:${port} ...`)
   })
} catch (error) {
   console.log(error)
}