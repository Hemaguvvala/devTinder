const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup",async (req,res) => {
//Creating a new instance of the User model
const user = new User({
  firstName: "Vinod",
  lastName: "Kumar",
  emailId: "kumar@gmail.com",
  password: "kumar@123",
});
try{
  await user.save();
  res.send("User added successfully");
 
}catch(err){
  res.status(400).send("Error sending the User:" + err.message);
}

});

connectDB()
  .then(()=>{
    console.log("Database connection established");
    app.listen(3000, ()=>{
      console.log("Server is successfully listening on port 3000");
  });
   })
  .catch((err) =>{
   console.error(err ,"Database cannot be connected!!");
   });
