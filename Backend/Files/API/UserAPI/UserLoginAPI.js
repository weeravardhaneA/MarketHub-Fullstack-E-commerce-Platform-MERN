const express = require("express");
const VerifyToken = require("../../Middlewares/VerifyToken");
const FindOne = require("../../Functions/FindOne");
const Users = require("../../Collections/UsersCollection");
const BcryptCompare = require("../../Middlewares/BcryptCompare");
const GenerateToken = require("../../Middlewares/GenerateToken");
const router = express.Router();
const UpdateOne = require("../../Functions/UpdateOne")


router.post("/", async (req, res) => {

  console.log("===== login API Started =====");

  try
  {
    const {formData} = req.body;

    const filter = {email: formData.email}
    const userObj = await FindOne(Users, filter)
    if(!userObj)
    {
      return res.json({code: 1, message: "couldn't find a account with this email. register first"})
    }

    const result = await BcryptCompare(formData.password, userObj.password)
    if(result==true)
    {
      const obj ={id: userObj._id}
      const newToken = GenerateToken(obj, process.env.TOKEN_KEY, "10m")
      res.cookie("token", newToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 10 * 60 * 1000
      })
      const newRefreshToken = GenerateToken(obj, process.env.REFRESH_TOKEN_KEY, "1h")
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 1 * 60 * 60 * 1000
      })
      res.cookie("role", userObj.role, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 1 * 60 * 60 * 1000
      })
      const filter = {email: formData.email}
      const newDoc = {$set: {refreshToken: newRefreshToken}}
      await UpdateOne(Users, filter, newDoc)

      return res.json({code: 2, message: "password matched, user can login"})
    }
    else
    {
      return res.json({code: 3, message: "password incorrect"})
    }

  }
  catch(err)
  {
    console.log("myErr login API :=== " + err);
    return res.json({code: 4, message: "unexpected error"})
  }
  finally
  {
    console.log("===== login API Ended =====");
  }

})


module.exports = router;