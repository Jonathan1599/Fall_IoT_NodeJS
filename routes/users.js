let express = require('express');
const bodyParser = require('body-parser');
let User = require('../models/users');
let router = express.Router();
var passport = require('passport');
router.use(bodyParser.urlencoded());
/* GET users listing. */
router.route('/')
.get( function(req, res, next) {
  res.send('respond with a resource');
});

router.get('login')

router.route('/signup')
.get((req,res,next) => {
  res.statusCode = 200;
  res.render('signup')
});

router.post('/signupuser', (req,res, next) => {
  User.register(new User({username: req.body.username}),
  req.body.password,(err, user) => {
    if(err)
    {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else{
      if(req.body.firstname)
        user.firstname = req.body.firstname;
      if(req.body.lastname)
         user.lastname = req.body.lastname;
      user.save(( err, user) =>{
        if(err)
          {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/html');
            res.json({err: err});
            return ;
          }
        passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.redirect('/')
         });
       });
      }
    });
});

module.exports = router;
