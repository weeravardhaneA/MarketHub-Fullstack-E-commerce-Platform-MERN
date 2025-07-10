const express = require("express");
const router = express.Router();

// databases
const Users = require("../../Collections/UsersCollection");
const TempUsers = require("../../Collections/TempUsersCollection");

// functions
const NodeMailer = require("../../Middlewares/Nodemailer");
const InsertOne = require("../../Functions/InsertOne");
const FindOne = require("../../Functions/FindOne");
const GenerateToken = require("../../Middlewares/GenerateToken");
const DeleteOne = require("../../Functions/DeleteOne");
const BcryptHash = require("../../Middlewares/BcryptHash");



router.post("/", async (req, res) => {

  console.log("===== register API Started =====");

  try
  {
    const {data} = req.body;

    const filter = {email: data.email};
    const result = await FindOne(Users, filter);
    if(result)
    {
      return res.status(409).json({code: 1, message: "email already exist"})
    }

    NodeMailer(data.email, data.otp)

    const obj = {email: data.email}
    const token = GenerateToken(obj, process.env.TOKEN_KEY, "5m")
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 5 * 60 * 1000
    })
    data.token = token;

    data.password = await BcryptHash(data.password);

    console.log(data);

    await InsertOne(TempUsers, data);
  
    return res.status(200).json({code: 2, message: "data inserted to the temp database"})
  }
  catch(err)
  {
    console.log("myErr register API :=== " + err);
    return res.status(500).json({code: 3, message: "an Unexpected error occured"})
  }
  finally
  {
    console.log("===== register API Ended =====");
  }

})

// =======================================================================================

router.post("/otp-confirm", async (req, res) => {

  console.log("==========otp-confirm API Started ==========");

  try
  {
    const {otp} = req.body;
    const token = req.cookies.token;

    const filter1 = {token}
    const userObj = await FindOne(TempUsers, filter1);
    if(!userObj)
    {
      return res.status(404).json({code: 1, message: "User Doesn't found in TempUsers"})
    }
    // const plainUserObj = userObj.toObject();
    
    // if(plainUserObj.otp != otp)
    // {
    //   return res.status().json({code: 2, message: "OTP Doesn't match"})
    // }

    if(userObj.otp != otp)
    {
      return res.status().json({code: 2, message: "OTP Doesn't match"})
    }
        
    const obj = {token}
    const refreshToken = GenerateToken(obj, process.env.REFRESH_TOKEN_KEY, "10m");
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 10 * 60 * 1000
    })
    // plainUserObj.refreshToken = refreshToken;
    userObj.refreshToken = refreshToken;

    // delete plainUserObj.otp;
    // delete plainUserObj.token;
    // delete plainUserObj.createdAt;
    delete userObj.otp;
    delete userObj.token;
    delete userObj.createdAt;

  //  await InsertOne(Users, plainUserObj); 
  await InsertOne(Users, userObj);

    const filter2 = {token}
    await DeleteOne(TempUsers, filter2);

    return res.status(200).json({code: 3, message: "User added to the UsersCollection"})
  }
  catch(err)
  {
    console.log("myErr otp-confirm API :=== " + err);
    return res.status(500).json({code: 4, message: "Unexpected Error"})
  }
  finally
  {
    console.log("========== otp-confirm API Ended ==========");
  }

})


module.exports = router;