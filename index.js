const express=require("express");
const mongoose=require("mongoose");
const userRouter=require("./Routes/user");
const app=express();
mongoose.connect("mongodb+srv://Harsha:harsha%401234@cluster0.ohltzw6.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true},()=>{
    console.log("connected to database");
})
// mongoose.connect("mongodb://localhost:27017/todo",()=>{
//     console.log("connected to dbs");
// })
//  app.get("/",(req,res)=>{
//     res.send("hello")
//  });
 app.use("/",userRouter);
 app.get("*",(req,res)=>{
    res.send("page not found")
 })

 app.listen(5000,()=>{
    console.log("server is up at port 5000");
 })