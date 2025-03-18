const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true

    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid!");
            }
        }
    },
    photoUrl: {
        type: String
    },
    about: {
        type: String,
        default: "This is a default about of the user!"
    },
    skills: {
        type: [String]
    }

});

module.exports = mongoose.model("User", userSchema);
