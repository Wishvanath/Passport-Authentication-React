var express = require('express');
var router = express.Router();
const db = require('../lib/dbcon');
const session = require('express-session');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var passport = require('passport');
/* GET home page. */
router.get('/',authenticationMiddleware(), function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// signup router 
router.post('/signup',function(req,res,next){
  const {body} = req;
  const{
    userName,
    userEmail,
    userPassword
  } = body;
  if(!userName){
    return res.send({
      success: false,
      message: "User name is empty"
    }) 
  }
  if(!userEmail){
    return res.send({
      success: false,
      message: "User email is empty"

    })
  }
  if(!userPassword){
    return res.send({
      success: false,
      message: "User password is empty"
    })
  }
  else{
    bcrypt.hash(userPassword, saltRounds, function(err, hash) {
      // write query to save the data into database
      const query = {
        text: `INSERT INTO public."user"(username, useremail, userpassword) VALUES ('${userName}','${userEmail}','${hash}');
  `    };
      db.query(query,function(err,result){
        if(err){
          console.log(err);
        }else{

          // write another query to save session in database
          const query={
            text:`select id from public.user where userEmail = '${userEmail}'`
          };
          db.query(query,function(err,result){
            if(err){
              console.log(err);
            }else{
              const user_id = result.rows[0];
              console.log(result.rows[0])
              req.login(user_id,function(err){
                res.redirect('/');
              });
              
            } 
          })

          
        }
      })
    });
       
  }// end of else
})


// login router 

router.post('/login', passport.authenticate('local',{
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect:'http://localhost:3000'
}));

















function checkLogin(req, res, next){
  if(req.session.email){
    return res.send({
      success: true,
      message: "You have logged in "
    })
 } else {
    var err = new Error("Not logged in!");
    console.log(req.session.user);
    next(err);  //Error, trying to access unauthorized page!
 }
}
router.get('/dash',checkLogin, function(req, res, next){
  return res.send({
    success:true,
    message: "You have successfully logged in"
  })
})

// logout router


router.get('/logout',function(req,res,next){
    // destroy the session which you have created in the login module
    req.session.destroy(function(err){
      if(err){
        console.log(err);
      }else{
        res.send({
          success: true,
          message: "Your Session is expired"
        })
      }
    })
})  

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  done(null, user_id);
 
});
// passport authentication middleware
function authenticationMiddleware(){
  return(req, res, next) => {
    console.log(`
      req.session.passport.user: ${JSON.stringify(req.session.passport)}
    `);
    if(req.isAuthenticated()){
      return res.send({
        success: true,
        message: "you are valid user"
      })
      
    }else{
      return res.send({
        success: false,
        message: "You are not valid user"
      })
      
    } 
    
  }
}
module.exports = router;
