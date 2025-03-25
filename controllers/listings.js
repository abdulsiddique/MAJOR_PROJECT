const Listing = require("../models/listing");
const moongoose = require('mongoose');
const nbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const baseClient = nbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
    const listings = await Listing.find({});
    res.render('listings/index.ejs', { listings });
};

module.exports.renderNewForm = (req, res) => {
    res.render('listings/new.ejs');
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    // const listings = await listing.findById(id);
     if (!moongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).send('Invalid ID');
     }
     const listings = await Listing.findById(id).populate("reviews").populate("owner");
     if (!listings) {
         return res.status(404).send('Listing not found');
     }
     res.render('listings/show.ejs', {listings});

     
 
};

 
    

    module.exports.createListing = async (req, res) => {
        try {
            console.log(req.body); // Debugging: Log the form data
            const listing = new Listing(req.body.listing);
            await listing.save();
            req.flash('success', 'Successfully created a new listing!');
            res.redirect(`/listings/${listing._id}`);
        } catch (e) {
            req.flash('error', e.message);
            res.redirect('/listings/new');
        }
    
  };
  



    


module.exports.renderEditForm = async (req, res,next) => {



        const { id } = req.params;
        const listings = await Listing.findById(id);

        if (!listings) {
            req.flash('error', 'Cannot find that listing!');
            return res.redirect('/listings');
        }
        res.render('listings/edit', {listings});
};

module.exports.updateListing = async (req, res) => {
    


    const { id } = req.params;
   


    await listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
};

// module.exports.deleteListing = async (req, res) => {
//     async (req, res) => {
//         const { id } = req.params;
//         await listing.findByIdAndDelete(id);
//         res.redirect('/listings');
//     }
// };

module.exports.deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndDelete(id); // ✅ Make sure "Listing" is properly referenced
        req.flash("success", "Listing deleted successfully!");
        res.redirect("/listings");
    } catch (e) {
        req.flash("error", "Failed to delete listing.");
        res.redirect("/listings");
    }
};
