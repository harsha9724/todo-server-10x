const express=require("express");
const cors=require("cors");
const bodyparser=require("body-parser");
const users=require("../Models/user");
const route=express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
route.use(cors());
route.use(bodyparser());
var SECRET="harsha"


route.post('/signup', async (req, res) => {
    
    const { username, password } = req.body
    console.log(username,password)
    try {
        const data = await users.findOne({ username: username })
        if (data) {
            return res.status(500).json({
                message: "Email is already registered"
            })
        }

        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(400).json({ message: err.message })
            }

            const data = await users.create({
               username,
                password: hash
            })
            console.log(data)
            res.status(200).json({
                status: "success",
                message: "Registration Successful"
            })
        });


    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }

})
route.post("/login", async (req, res) => {
    const {username,password}=req.body;
    const userData = await users.findOne({ username: username });
    if (userData != null) {
      var result = await bcrypt.compare(password, userData.password);
      if (result) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 10) + 60 * 60,
            data: userData._id,
          },
        SECRET
        );
        res.status(200).json({
          Status: "Successful",
          token: token,
        });
      } else {
        res.status(400).json({
          status: "failed",
          message: "Wrong Password",
        });
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "No user Found",
      });
    }
  });
module.exports=route;