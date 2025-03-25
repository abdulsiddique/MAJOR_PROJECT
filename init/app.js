const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  // Add the owner field while formatting the data
  const formattedData = initData.data.map(item => ({
    ...item,
    image: item.image.url, // Storing the image URL
    owner: '67cc0af8157f48e4fb4a16f7' // Adding the owner field directly to the formatted data
  }));

  await Listing.insertMany(formattedData);
  console.log("Data was initialized with owner field.");
};

initDB();
