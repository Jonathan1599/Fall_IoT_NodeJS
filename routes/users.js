let express = require('express');
const bodyParser = require('body-parser');
let User = require('../models/users');
let router = express.Router();
var passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
router.use(bodyParser.urlencoded());
/* GET users listing. */
router.route('/')
.get( (req, res, next) => {
  res.end('<img width = 700px height =500px src="https://cdn.gamer-network.net/2018/usgamer/obi-wan-header.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/obi-wan-kenobi-arrives-in-star-wars-battlefront-2-in-november.jpg"><br><h1>HELLO THERE</h1></img>')
});

router.route('/login')
.get((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type','text/html');
  res.render('login');
})
.post(passport.authenticate('local', { failureRedirect: '/login' }),(req,res,next) => {
  res.send("congratulations");
})

router.route('/signup')
.get((req,res,next) => {
  res.statusCode = 200;
  res.render('signup')
});
router.get('/test',connectEnsureLogin.ensureLoggedIn(),(req,res,next) =>{
  res.send("logged in " + req.user.username);
})
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
