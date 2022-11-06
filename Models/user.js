const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{type:String},
    password:{type:String}
});

const user= new mongoose.model("users",userSchema);

module.exports=user;