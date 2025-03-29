const express = require("express");
const router = express.Router();
const Listing = require("../models/listing"); // Adjust the path if needed

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

module.exports = router;





router.get("/listings", async (req, res) => {
    try {
        let query = {};
        if (req.query.category) {
            query.category = req.query.category; // Ensure category exists in the DB
        }
        
        const listings = await Listing.find(query);
        res.json(listings);
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




// router.get("/listings", async (req, res) => {
//     try {
//         console.log("Incoming Request:", req.query); // Debugging Log
        
//         let query = {};
//         if (req.query.category) {
//             query.category = req.query.category; 
//         }
        
//         const listings = await Listing.find(query);
        
//         console.log("Found Listings:", listings); // Log results
        
//         res.json(listings);
//     } catch (error) {
//         console.error("Error fetching listings:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
router.get("/api/listings", async (req, res) => {
    try {
        const category = req.query.category;
        let listings;
        if (category) {
            listings = await Listing.find({ category });
        } else {
            listings = await Listing.find({});
        }
        if (listings.length === 0) {
            return res.status(404).json({ message: "No listings found" });
        }
        res.json(listings);
    } catch (err) {
        console.error("Error fetching listings:", err);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;

