// const mongoose = require("mongoose");
// const review = require("./review");
// const { type } = require("os");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     url: String,
//     filename: String,

//      default:
//       "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//    set: (v) =>
//       v === ""
//         ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
//       : v,
//   },
//   price: Number,
//   location: String,
//   country: String,
//   reviews: [
//     {
//     type: Schema.Types.ObjectId,
//     ref:"Review",
//   },
//   ],

//   owner: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },

//   coordinates:{
//     type: [Number],
//     required: true
//   }
// });
// listingSchema.post("findOneAndDelete",async(listing)=>{
//   if(listing){
//     await review.deleteMany({_id:{$in: listing.review}})
//   }
// });
// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

// const mongoose = require("mongoose");
// const review = require("./review");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     url: {
//       type: String,
//       default:
//         "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//     },
//     filename: String,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   location: String,
//   country: String,
//   reviews: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Review",
//     },
//   ],
//   owner: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//   },
//   coordinates: {
//     type: [Number],
//     required: true,
//   },
//   geometry: {
//     type: { type: String, enum: ['Point'], required: true },
//     coordinates: { type: [Number], required: true }
//   }
  
// });

// // Middleware to delete associated reviews when a listing is deleted
// listingSchema.post("findOneAndDelete", async (listing) => {
//   if (listing) {
//     await review.deleteMany({ _id: { $in: listing.reviews } });
//   }
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;



const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    filename: String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: { 
      type: String, 
      enum: ['Point'], 
      default: 'Point', // Default to 'Point'
      required: true 
    },
    coordinates: { 
      type: [Number], 
      required: true 
    }
  }
});

// Middleware to delete associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
