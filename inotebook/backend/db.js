const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/inotebook';

const connectToMongo = () => {
  console.log("Attempting to connect to MongoDB...");
  
  mongoose.connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
};

module.exports = connectToMongo;
