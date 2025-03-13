const mongoose = require('mongoose');

const connectDB = async () => {
   await mongoose.connect(
    "mongodb+srv://NamasteNode:KJsS0iMhWMnPVQt1@namastenode.lmang.mongodb.net/devTinder"
    );
};


module.exports = connectDB;
