var express = require('express');
var router = express.Router()

/* GET users listing. */
.get('/', function(req, res, next) {
  res.send('respond with a resource');
})



.get('/login', (req,res,next) => {
  res.statusCode = 200;
  res.send("hello");
})

module.exports = router;
