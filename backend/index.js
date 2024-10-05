const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express();
const port = 8000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["POST", "GET"],
        credentials: true,
    }
});
app.use(cors());

app.get("/", (req, res) => {
    res.send('hello');
})

io.on('connection', (socket) => {
    console.log(`user connected with id ${socket.id}`)
    socket.on("disconnect", () => {
        console.log("disconnected user", socket.id)
    })

    socket.on("message", (data) => {
        // console.log("message :" + JSON.stringify(data))
        io.emit("message", data);
        
    })

})

server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})