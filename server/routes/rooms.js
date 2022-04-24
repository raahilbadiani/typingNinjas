const express = require('express');
// const { Game } = require('../game');
const { nanoid } = require('../utils');

const router = express.Router();


router.get('/create', (req,res)=>{
    console.log('[+] Create Room');
    while (io.sockets.adapter.rooms.has(roomName = nanoid(4))){
        console.log("collided ",roomName);
    }
    res.redirect(`${roomName}`);
})
router.get('/allrooms',(req,res)=>{
    let roomList = {};
    
    for(let [key,value] of io.sockets.adapter.rooms){
        if(key.length==4)
            roomList[key] = io.sockets.adapter.rooms.get(key).size;
    }
    res.json(roomList);
})
router.get('/joinany',(req,res)=>{
    for(let [key,value] of io.sockets.adapter.rooms){
        if(key.length==4)
            res.redirect(`${key}`);
    }
    res.redirect('/room/create');
})
router.get('/',(req,res)=>{
    console.log('[+] get rooms')
    res.send('hi')
})
router.get('/:roomName', async (req,res)=>{
    
    let roomName = req.params.roomName;
    // if(io.sockets.adapter.rooms.has(roomName)){
        res.render('../client/race/race',{roomName:roomName});
    // }else{
    //     res.redirect('/');
    // }
})


module.exports = router