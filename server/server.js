const http=require('http');
const express=require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();
// const roomsRouter = require('./routes/rooms');
const res = require('express/lib/response');
// const {Ball,Player}=require('./client/ball')
console.log(`server.js loaded ${Date.now()}`);



const app=express();
const server=http.createServer(app);
module.exports.server = server;

app.set('view engine','ejs');
app.use("/",express.static("client"));


// app.get("/", async function (req,res){ 
//     res.sendFile("/client/welcome/welcome.html",{root:path.join(__dirname,"../")});
// })
app.use("/practice", async function(req,res){
    res.sendFile("/client/practice/index.html", {root:path.join(__dirname,"../")});
});


// app.use('/room',roomsRouter)

// required only to run the file once
// const stopwatch_ = require("./stopwatch.js");
// const constants_ = require("../client/constants.js");


// const websocket=require('./websocket.js');

// console.log(websocket);
server.on('error', (err) => {
    console.error('Server error:', err);
});
const port=process.env.PORT ?? 8000;
server.listen(port,()=>{
    console.log("server listening on port ",port);
});
