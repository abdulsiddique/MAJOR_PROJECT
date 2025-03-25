const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//   await Listing.deleteMany({});

//   // Add the owner field while formatting the data
//   const formattedData = initData.data.map(item => ({
//     ...item,
//     image: item.image.url, // Storing the image URL
//     owner: '67cc0af8157f48e4fb4a16f7' // Adding the owner field directly to the formatted data
//   }));

//   await Listing.insertMany(formattedData);
//   console.log("Data was initialized with owner field.");
// };

// initDB();

const mongoose = require("mongoose");
const SampleModel = require("./models/SampleModel"); // Adjust based on your schema
const sampleData = require("./data.json"); // Load sample data

const mongoURI = "mongodb+srv://<USERmongodb+srv://abdulsiddique486:ruu2rlKALiXbkkcN@cluster0.2siv0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0NAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DB_NAME>?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB Atlas Connected!");

    // **Delete existing data**
    await SampleModel.deleteMany({});
    console.log("Existing data removed!");

    // **Insert new sample data**
    await SampleModel.insertMany(sampleData);
    console.log("Sample data inserted!");

    mongoose.connection.close(); // Close connection
  })
  .catch((err) => console.error("DB Connection Error:", err));
