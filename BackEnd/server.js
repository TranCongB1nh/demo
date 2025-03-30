const createServer = require("http").createServer
const cors = require("cors")
const router = require("./router/index")
const hostname = "127.0.0.1"
const port = 5000
const express = require("express")
const { connectWithMongoClient, connectWithMongoose } = require("./mongodb")
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true
}));

connectWithMongoose()

const server = createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin','*')
    response.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS, PUT'
    )
    response.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    )

    if(request.method === 'OPTIONS') {
        response.writeHead(204)
        response.end()
        return 
    }
    router.run(request, response)
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})