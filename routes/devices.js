const express = require('express');
const router = express.Router();
const socket = require('socket.io');
const User = require('../models/users');
const Device = require('../models/devices');
const { db } = require('../models/devices');

let values = [1,2,3,4,5,6,7];
const io = socket(express().listen(9000));

// router.get('/', function(req, res, next) {
//     setInterval(()=> {
//         values.push(values[values.length-1] + 11)
//     },3000);
//     let valLength  =values.length;
//     res.render('devices', { title: 'devices' });
//     io.sockets.on('connection' , (socket) => {
//         io.emit("firstdata", {dataval:values})
//         setInterval(() => {
//             if(values.length != valLength){
//                 io.emit("data", {dataval:values[valLength]}) 
//                 valLength = values.length;
//                 }
//         },100)
        
//     })
//   });

  router.route('/register')
  .get((req,res,next) => {
    if(req.isAuthenticated() == false)
    return res.redirect('/users/login')
    res.statusCode = 200;
    res.render('device_register',{user: req.user.firstname});
  })
  .post((req,res,next) => {
    if(req.isAuthenticated() == false)
    return res.redirect('/users/login')
    Device.create(req.body)
    .then( device => {
        if(device != null){
        User.updateOne({_id :req.user._id},{$push: { devices: device._id}})
        .then( user => {
          db.createCollection(device._id.toString())
          .then( () => {
            res.statusCode = 200;
            res.send(device);
          })
        })
        }
    },err => next(err))
    .catch(err => next(err));
  });

    router.post('/delete/:idd',async (req,res,next) => {
      res.send(req.params.idd);
      if(req.isAuthenticated() == false)
    return res.redirect('/users/login')
    await Device.findByIdAndDelete(req.params.idd)
    await User.updateOne({_id :req.user._id},{$pull: { devices: req.params.idd}});
    res.send("Successful")
    });



  
  
  module.exports = router;