

const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require('../middleware.js');
const usercontroller = require('../controllers/user.js');

router.get("/signup", usercontroller.signupform);


router.post("/signup", usercontroller.signup);






router.get("/login", usercontroller.loginform
);






router.post("/login", saveRedirectUrl,
     passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
}),usercontroller.login
);
    








router.get("/logout", usercontroller.logout
);



module.exports = router;