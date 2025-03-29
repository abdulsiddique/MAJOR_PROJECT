const Listing = require('./models/listing');

module.exports.isLoggedIn = (req,res,next)=>{
if(!req.isAuthenticated()){
    req.session.redirectUrl = req.originalUrl;
    req.flash('error','you must be signed in');
    return res.redirect('/login');

}
  next();
};

//
// middleware.js
module.exports.saveRedirectUrl = (req, res, next) => {
    // Save the URL the user was trying to access before login
    if (req.originalUrl && req.originalUrl !== "/login" && req.originalUrl !== "/signup") {
      req.session.redirectUrl = req.originalUrl;
    }
    next();
  };
  

//   module.exports.isowner = async(req,res,next)=>{
//     const { id } = req.params;
//     let listing = await Listing.findById(id);
//     if(!currUser && listing.owner.equals(res.locals.currUser._id)) {
//         req.flash('error', 'You do not have permission to do that');
//         return res.redirect(`/listings/${id}`);
//   }

// next();};

// module.exports.isOwner = async (req, res, next) => {
//   const { id } = req.params;
//   const listing = await Listing.findById(id);

//   if (!listing) {
//       req.flash('error', 'Listing not found');
//       return res.redirect('/listings');
//   }

//   if (!res.locals.currUser || !listing.owner.equals(res.locals.currUser._id)) {
//       req.flash('error', 'You do not have permission to do that');
//       return res.redirect(`/listings/${id}`);
//   }

//   next();
// };
module.exports.isowner = async (req, res, next) => {
  try {
      const { id } = req.params;
      const listing = await Listing.findById(id);

      if (!listing) {
          req.flash('error', 'Listing not found');
          return res.redirect('/listings');
      }

      if (!res.locals.currUser || !listing.owner.equals(res.locals.currUser._id)) {
          req.flash('error', 'You do not have permission to do that');
          return res.redirect(`/listings/${id}`);
      }

      next();
  } catch (error) {
      console.error(error); // Logs error for debugging
      req.flash('error', 'Something went wrong');
      return res.redirect('/listings');
  }
};
