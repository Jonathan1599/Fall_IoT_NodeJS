const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const Devices = require('../models/devices');
const { db } = require('../models/devices');

router.use(bodyParser.json());
router.post('/:deviceId',async (req,res,next) => {
   // res.json(req.body.temperature)
    device = await Devices.findById(req.params.deviceId);
    if(device!=null)
    {   
        let collect = db.collection(device._id.toString());
        collect.insertOne(req.body)
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        res.send("Successful")
    }
})

module.exports = router;