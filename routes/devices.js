const express = require('express');
const router = express.Router();
const socket = require('socket.io');

const io = socket(express().listen(9000));
io.sockets.on('connection' , (socket) => {
    console.log(socket.id);
    io.emit("data", {dataval:"phat"} );
})

router.get('/', function(req, res, next) {
    res.render('devices', { title: 'devices' });
  });
  
  module.exports = router;