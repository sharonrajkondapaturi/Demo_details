const http = require('http')
const app = require("./server")

const port = process.env.PORT || 4000
const server = http.createServer(app)

server.listen(port, ()=>{
    console.log(`SERVER running ${port}`)
})