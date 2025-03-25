const User = require('../models/user'); 

module.exports.signupform = (req, res) => {
    res.render('users/signup');};

module.exports.signup = async(req, res) => {
    let { username, email, password } = req.body;
    console.log(req.body);
    const newUser = new User({ email, username });
    const registeredUser =  await User.register(newUser,password)
    console.log(registeredUser);

    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to wanderlust");
        res.redirect("/listings");
    });
    // req.flash("success", "Welcome to wanderlust");
    // res.redirect("/listings");
    


};

module.exports.loginform = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) =>  {
    req.flash("success", "Welcome back!");
    let redirectUrl = req.session.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = async(req, res) => {
    (req, res,next) => {
        req.logout((err)=>{
            if(err){
           return  next(err);
            }
    
    
        req.flash("success", "Goodbye!");
        res.redirect("/listings");
    }   );
    };  };


