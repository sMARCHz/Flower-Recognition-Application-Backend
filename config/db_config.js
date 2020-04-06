const mongoose = require('mongoose');
//const db = 'mongodb://127.0.0.1:27017/';
//const db = process.env.MongoDB_URL;
const db = 'mongodb+srv://server:flowey@flower1-b6hxe.mongodb.net/Flowey?retryWrites=true&w=majority';
const connectDB = async () => {
    try {
      await mongoose.connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
      console.log("MongoDB is Connected...");
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
};
module.exports = connectDB;