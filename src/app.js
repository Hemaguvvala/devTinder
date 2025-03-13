const express = require("express");

const app = express();
const {userAuth, adminAuth} = require("./middlewares/auth");
// Handle Auth Middleware for all GET, PUT,.... requests
app.use("/admin", adminAuth);

app.get("/user",userAuth,(req,res)=>{
  // Check if the request is authorized
    res.send("user Data Sent") 
  })
app.get("/admin/getAllData",(req,res)=>{
// Check if the request is authorized
  res.send("All Data Sent") 
})

app.get("/admin/deleteUser",(req,res)=>{
  res.send("Delete a User")
})

app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000");
});