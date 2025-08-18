const express = require("express");
const router = express.Router();

const UsersModel = require("../../Models/UsersModel");
const TempUsersModelModel = require("../../Models/TempUsersModel");

const NodeMailer = require("../../Utils/Nodemailer");
const InsertOne = require("../../Utils/InsertOne");
const FindOne = require("../../Utils/FindOne");
const GenerateToken = require("../../Utils/GenerateToken");
const DeleteOne = require("../../Utils/DeleteOne");
const BcryptHash = require("../../Utils/BcryptHash");



router.post("/", async (req, res) => {

  console.log("===== register API Started =====");

  try
  {
    const {data} = req.body;

    const filter = {email: data.email};
    const result = await FindOne(UsersModel, filter);
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

    await InsertOne(TempUsersModelModel, data);
  
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
    const userObj = await FindOne(TempUsersModelModel, filter1);
    if(!userObj)
    {
      return res.status(404).json({code: 1, message: "User Doesn't found in TempUsersModelModel"})
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

  //  await InsertOne(UsersModel, plainUserObj); 
  await InsertOne(UsersModel, userObj);

    const filter2 = {token}
    await DeleteOne(TempUsersModelModel, filter2);

    return res.status(200).json({code: 3, message: "User added to the UsersModel"})
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