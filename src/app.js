const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //Creating a new instance of the User model

  try {

    const user = new User(req.body);
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error sending the User:" + err.message);
  }
});

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

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  console.log(JSON.stringify(data));
  try {

    const user = await User.findByIdAndUpdate({ _id: userId }, data,
       {returnDocument: "after"});
    console.log("User updated successfully", user)
    res.send("User updated successfully");
  } catch (err) {
    console.log("Error User updated successfully", err)

    res.status(400).send("Something went wrong!!");
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
