const customTag = "LocalFileSharing: "

class CustomConsole {
    static log(message) {
        console.log(customTag + message)
    }

    static warn(message) {
        console.warn(customTag + message)
    }

    static error(message) {
        console.error(customTag + message)
    }
}

module.exports = CustomConsole