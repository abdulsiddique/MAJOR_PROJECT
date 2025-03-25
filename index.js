    require("dotenv").config();





const express = require('express');
const app = express();
const moongoose = require('mongoose');
// const url= 'mongodb://127.0.0.1:27017/wanderlust';
 const dbUrl = process.env.ATLASDB_URL;
const Listing = require('./models/listing');
 const path = require('path');
const methodOverride = require('method-override');
const ejsmate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
// const { error } = require('./views/listings/error.ejs');
const {listingSchema} = require("./schema.js");
const Review = require("./models/review.js");
const listings = require("./routes/listing.js");
const MongoStore = require('connect-mongo');
const  session = require('express-session');
const Flash = require('connect-flash'); 
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');


const ListingRouter = require('./routes/listing.js');  
const reviewRouter = require('./routes/reviews.js');
const userRouter = require('./routes/user.js');


app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.json()); // If you're sending JSON data


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));

// const session = require('express-session');


// Express-session setup
app.use(session({
    secret: 'yourSecret',  // Secret key for encryption
    resave: false,         // Don't save session if unmodified
    saveUninitialized: false  // Don't create a session until something is stored
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
const store = MongoStore.create({

    mongoUrl:dbUrl,
    crypto: {
        secret: process.env.SECRET
      },
      touchAfter: 24*3600,
});


const sessionOptions ={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    Cookie:{
        expires:Date.now() + 1000*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    },
}


// const store = MongoStore.create({

//     mongoUrl:dbUrl,
//     crypto: {
//         secret: "mysuersecretcode"
//       },
//       touchAfter: 24*3600,
// });


store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE ", err)
})

app.use(session(sessionOptions));
app.use(Flash());
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/listings",ListingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);



app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    next();

})
const reviews = require("./routes/reviews.js");


main().then(() => console.log('Database connected')).catch(err => console.log(err));

async function main() {
    await moongoose.connect(dbUrl);

}




app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


app.use((err,req,res,next)=>{
    let {statuscode = 500 , message="page not found"}= err;
    res.status(statuscode).send(message);
})


   // app.use((err,req,res,next)=>{
   //  let {statuscode = 500,message= "Something went wrong "}=err;
    // res.status(statuscode).render("error.ejs",{message})
  //});

app.get('/listings', async (req, res) => {
    const listings = await Listing.find();
    res.render('listings/index', {listings});
});
app.get('/testlistings', async (req, res) => {
  let listings = new listing({
      title: 'MY new Villa',
       description: 'test',
     price: 1000,
        location: 'Calanguate, goa',
        country: 'test',
        image:'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'

        });
        

listings = await listings.save();
console.log(listings);
res.send("sucessfull listings "); 
    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', async(req, res) => {
    const listings = await Listing.find();
    res.render('listings/index', {listings});
});

app.get('/listings/new', (req, res) => {
    res.render('listings/new');
});

const valiadateListing =(req,res,next)=>{
    let {erorr}= listingSchema.validate(req.body);
    if(erorr){
        let errMsg = erorr.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    } else{
        next();
    }
};


app.use("/listings",listings);

app.post('/listings', async (req, res, next) => {
//    let result=  listingSchema.validate(req.body);


  
    const listings = new Listing(req.body.listing);
    await listings.save();
    res.redirect("/listings");

       
        
    
} );

app.get("/listings/:id/edit",async (req, res) => {
    const { id } = req.params;
    const listings = await listing.findById(id);
    res.render('listings/edit', {listings});
});


app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}
);

app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect('/listings');
});



app.post("/listings/:id/reviews", async (req, res) => {
    // Ensure you're using the correct model name
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);  // Adding the review to the listing's reviews

    await newReview.save();  // Saving the new review to the database

    await listing.save();  // Saving the updated listing with the new review

    console.log("New review saved");
    res.status(200).send("Review added successfully");
});




app.post("/listings/:id/reviews",async (req,res)=>{
const listings = await listing.findById(req.params.id);
 const newReview = new Review(req.body.review);

    listings.reviews.push(newReview);

     await newReview.save();


    await listing.save();
    console.log("new review saved ");
    console.log("new review saved ");

});




app.delete("/listings/:id/reviews/:reviewId" ,async(req,res)=>{
let {id , reviewId} = req.params;
await Listing.findByIdAndUpdate(id, { $pull: {reviews: reviewId}});
await Review.findByIdAndDelete(reviewId);
res.redirect(`/listings/${id}`);

});
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
   // const listings = await listing.findById(id);
    if (!moongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID');
    }
    const listings = await Listing.findById(id).populate("reviews");
    if (!listings) {
        return res.status(404).send('Listing not found');
    }
    res.render('listings/show.ejs', {listings});
}
);

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

 //app.use((err,req,res,next)=>{
 //   res.send("Something went wrong ");
//});

// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({email:"que486@gmail.com",username:"sdd"});
//     let registeredUser  = await User.register(fakeUser,"chicken");


// })


 



if (!dbUrl) {
    console.error("MongoDB URL is undefined. Check your .env file!");
    process.exit(1);
}

const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

connectDB();





