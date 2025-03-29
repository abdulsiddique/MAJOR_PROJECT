const express = require("express");
const router = express.Router();

const app = express();
const moongoose = require('mongoose');
const url= 'mongodb://127.0.0.1:27017/wanderlust';
const Listing = require('../models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsmate = require('ejs-mate');


const ExpressError = require('../utils/ExpressError.js');
// const { error } = require('./views/listings/error.ejs');
const {listingSchema ,reviewScehma} = require("../schema.js");
const Review = require("../models/review.js");
const listings = require("../routes/listing.js");
const alllistingcontroller = require("../controllers/listings.js");
const reviewcontroller = require('../controllers/Review.js');  
// // const multer = require('multer');
// const {storage} = require('../CloudConfig.js');
// const upload = multer({storage});







app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));





const {isLoggedIn, isowner} = require('../middleware.js');



router.get('/', alllistingcontroller.index);


router.get('/', async (req, res) => {
    const listings = await Listing.find();
    res.render('listings/index', {listings});
});






router.get('/new',isLoggedIn ,alllistingcontroller.renderNewForm);




// const valiadateListing =(req,res,next)=>{
//     let {erorr}= listingSchema.validate(req.body);
//     if(erorr){
//         let errMsg = erorr.details.map((el)=> el.message).join(",");
//         throw new ExpressError(400,errMsg);
//     } else{
//         next();
//     }
// };


// router.post('/',isLoggedIn, alllistingcontroller.createListing,upload.single('image'));
//  router.post('/', isLoggedIn, upload.single("listing[image]"), alllistingcontroller.createListing);


//  router.post('/',upload.single("listing[image]"),(req,res)=>{
//     res.send(req.body,req.file);});


router.get("/:id/edit",  isLoggedIn,alllistingcontroller.renderEditForm);



router.put("/:id",
    isLoggedIn,
    isowner, 
   alllistingcontroller.updateListing
);

router.delete("/:id",  isLoggedIn, alllistingcontroller.deleteListing);
    




router.post("/:id/reviews", async (req, res) => {
    // Ensure you're using the correct model name
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);  // Adding the review to the listing's reviews

    await newReview.save();  // Saving the new review to the database

    await listing.save();  // Saving the updated listing with the new review

    console.log("New review saved");
    res.status(200).send("Review added successfully");
});


// Search route for listings
router.get("/", async (req, res) => {
    try {
        const searchQuery = req.query.search; // Get search input

        let query = {}; // Default: show all listings
        if (searchQuery) {
            query = { title: new RegExp(searchQuery, "i") }; // Case-insensitive search
        }

        const listings = await Listing.find(query);
        res.render("listings/index", { listings, searchQuery });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching listings");
    }
});

module.exports = router;




router.post("/:id/reviews", isLoggedIn,async (req,res)=>{
const listings = await listing.findById(req.params.id);
 const newReview = new Review(req.body.review);

    listings.reviews.push(newReview);

     await newReview.save();


    await listing.save();
    console.log("new review saved ");
    console.log("new review saved ");

});




router.delete("/:id/reviews/:reviewId" ,reviewcontroller.destroyroute);


router.get("/:id", alllistingcontroller.showListing);




router.get("/api/search", async (req, res) => {
    try {
        const query = req.query.query;
        const listings = await Listing.find({
            title: { $regex: query, $options: "i" } // Case-insensitive search
        });

        res.json(listings);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;



module.exports = router;



// Search Route
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.json([]); // Return empty array if query is missing
        }

        // Search listings by title (case-insensitive)
        const listings = await Listing.find({ title: new RegExp(query, "i") });

        res.json(listings);
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});





// 🔹 API to Get Listings by Category
router.get("/api/listings", async (req, res) => {
    try {
        let query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }
        
        const listings = await Listing.find(query);
        res.json(listings);
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;


module.exports = router;
