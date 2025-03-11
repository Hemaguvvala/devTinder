const express = require("express");

const app = express();

app.use("/user",(req,res,next)=>{
  // Route Handler
  console.log("Handling the route user")
  //res.send("Route Handler")
  next();
  
},(req,res,next)=>{
  //route handler 2
  console.log("Handling the route user2")
 // res.send("Route Handler2")
  next();
},(req,res,next)=>{
  console.log("Handling the route user3")
  res.send("Route Handler3")
  //next()
})

app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000");
});