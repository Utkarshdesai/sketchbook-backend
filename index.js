const express = require("express");
const http = require('http')
const { createServer } = require("http");
const {Server} = require('socket.io')
const cors = require('cors')

const app = express();
const isDev = app.settings.env === 'development'
const URL = isDev ? 'http://localhost:3000' : 'https://sketchboard-bice.vercel.app'
app.use(cors({origin: URL}))
const httpServer = createServer(app);

const io = new Server (httpServer , { cors: URL });

io.on('connection' , (socket) => {
   console.log('server is started')

   socket.on('beginPath' , (arg)=>{
    socket.broadcast.emit('beginPath', arg)
   })

   socket.on('drawLine', (arg) => {
    
     socket.broadcast.emit('drawLine', arg)
   })

    socket.on('changeConfig', (arg) => {
        
       socket.broadcast.emit('changeConfig', arg)
   })
})

httpServer.listen(8000, () => {
    console.log(`Socket.io server is running on port 4000`);
  });

app.listen(8004,()=>{
    console.log('welcome')
})