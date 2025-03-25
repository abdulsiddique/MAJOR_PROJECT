const express = require("express");
const router = express.Router();
const {listingSchema} = require("../schema.js");
const Review = require("../models/review.js");



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




router.post("/:id/reviews",async (req,res)=>{
const listings = await listing.findById(req.params.id);
 const newReview = new Review(req.body.review);

    listings.reviews.push(newReview);

     await newReview.save();


    await listing.save();
    console.log("new review saved ");
    console.log("new review saved ");

});




router.delete("/:reviewId" ,async(req,res)=>{
let {id , reviewId} = req.params;
await Listing.findByIdAndUpdate(id, { $pull: {reviews: reviewId}});
await Review.findByIdAndDelete(reviewId);
res.redirect(`/listings/${id}`);

});

module.exports = router;