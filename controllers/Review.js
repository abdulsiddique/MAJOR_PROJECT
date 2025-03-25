const Listing = require('./listings');
const Review = require('../models/listing'); 


// module.exports.createReview = async (req, res) => {     
//     // Ensure you're using the correct model name
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);

//     listing.reviews.push(newReview);  // Adding the review to the listing's reviews

//     await newReview.save();  // Saving the new review to the database

//     await listing.save();  // Saving the updated listing with the new review

//     console.log("New review saved");
//     res.status(200).send("Review added successfully");

// };

module.exports.destroyroute = async(req,res)=>{
    let {id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);    }

    module.exports.createReview = async (req, res) => {
        try {
            const { id } = req.params;
            const listing = await Listing.findById(id);
            const review = new Review(req.body.review);
    
            // Ensure rating is at least 1
            if (review.rating < 1 || review.rating > 5) {
                req.flash('error', 'Invalid rating. Must be between 1 and 5.');
                return res.redirect(`/listings/${id}`);
            }
    
            listing.reviews.push(review);
            await review.save();
            await listing.save();
            req.flash('success', 'Review added!');
            res.redirect(`/listings/${id}`);
        } catch (e) {
            req.flash('error', e.message);
            res.redirect('/listings');
        }
    };
    