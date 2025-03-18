const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require('./utills/validation');
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {

  try {
    //validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10, (err, hash) => {
      console.log(passwordHash);
    });
    //Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (isPasswordValid) {
      res.send("Login Successful!!");
    } else {
      throw new Error("Password is not Correct");
    }


  } catch (err) {
    res.status(400).send("Something went wrong!!");
  }
})

// GET user by email

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    if (!users) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }

    // if (users.length > 0) {
    //   res.send(users);
    // } else {
    //   res.status(404).send("User not found");
    // }

  } catch (err) {
    res.status(400).send("Something went wrong!!");
  }


})

//Feed API - GET /feed - get all the users from the DB

app.get("/feed", async (req, res) => {

  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong!!");
  }


})

app.delete("/user", async (req, res) => {

  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId)
    res.send("user deleted successfully")
  } catch (err) {
    res.status(400).send("Something went wrong!!");
  }

});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  const ALLOWED_UPDATES = [
    "photoUrl", "about", "gender", "age", "skills"
  ];
  const isUpdateAllowed = Object.keys(data).every(k =>
    ALLOWED_UPDATES.includes(k));

  if (!isUpdateAllowed) {
    throw new Error("Update not allowed");
  }
  if (data?.skills.length > 10) {
    throw new Error("Skills cannot be more than 10");
  }

  console.log(JSON.stringify(data));
  try {

    const user = await User.findByIdAndUpdate({ _id: userId }, data,
      {
        returnDocument: "after",
        runValidators: true
      });
    console.log("User updated successfully", user)
    res.send("User updated successfully");
  } catch (err) {
    console.log("Error User updated successfully", err)

    res.status(400).send("UPDATE FAILED:" + err.message);
  }

})

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.error(err, "Database cannot be connected!!");
  });
