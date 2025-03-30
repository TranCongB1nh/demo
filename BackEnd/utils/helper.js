require('dotenv').config()
const secretKey = process.env.SECRET_KEY
const fs = require('fs').promise
const jwt = require('jsonwebtoken')

function createBearerToken(userID) {
    const payLoad = {
      id: userID,
    };
    const options = { expiresIn: '30m' }
    return jwt.sign(payLoad, secretKey, options)
  }

function verifyBearerToken (token) {
    try {
        const decoded = jwt.verify(token, secretKey)
        return {success: true, data: decoded}
    } catch (error) {
        return {success: false, error: error.message}
    }
}

async function readJSONFile(path) {
    try {
        const jsonString = await fs.readFile(path, 'utf8')
        return JSON.parse(jsonString)
    } catch (error) {
        console.error(`Failed to read file ${path}`, error)
        throw new Error('File read fail')
    }
}

async function writeJSONFile(path, data) {
    try {
        await fs.writeFile(path, JSON.stringify(
            data,
            null,
            2)
        )
    } catch (error) {
        console.error(`Failed to write file ${path}`, error)
        throw new Error('File write fail')
    }
}

module.exports = {
    createBearerToken,
    verifyBearerToken,
    readJSONFile,
    writeJSONFile
}