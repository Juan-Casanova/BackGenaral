const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");
const uploadCloud = require("../helpers/cloudinary");

//const sendWelcomeMail = require('../helpers/mailer').sendWelcomeMail;
//const sendTemplate = require('../helpers/mailer').sendTemplate;

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    //console.log(req.user);
    return next();
  } else {
    res.json({ message: "no tienes permiso" });
  }
}

router.post('/facebook/login', 
passport.authenticate('facebook-token'),
 (req,res)=>{
    res.json(req.user)
})

router.get("/logout", (req, res, next) => {
  req.logout();
  res.send("cerrado");
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.json(req.user);
});

router.get("/profile", isAuthenticated, (req, res, next) => {
    res.json(req.user);
  });
  

//1 crear la ruta post (recibe)
//2 necesitamos chear las contraseñas que coincidan
//3 crear al usuario en la db
router.post("/signup", (req, res, next) => {
  User.register(req.body, req.body.password)
    .then(user => {
      res.json(user);
    })
    .catch(e => next(e));
});

module.exports = router;