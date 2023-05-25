const express = require('express'); //using this for request handling
const app = express();
//Getting http module
const http = require('http');
const path = require('path');

//Creating a http server and passing express as request handler
const server = http.createServer(app);


app.use('/', express.static(path.join(__dirname, 'public'))); // express used for mounting public  folder

const socketio = require('socket.io');
const io = socketio(server); //passing the server so created into socket

const users = {};

io.on('connection',(socket)=>{
    console.log(`Someone got connected  ${socket.id}`)

    socket.on('send-msg',(data)=>{
        console.log('Message',data);
        io.emit('rcvd-msg',{
            recieved_msg:data.msg,
            username:users[socket.id]
        });
    });

    socket.on('login',(data)=>{
        users[socket.id]=data.username;
    })

})


const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`server started at port ${port}`);
});