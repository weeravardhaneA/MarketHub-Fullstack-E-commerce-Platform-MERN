const express = require("express");
const router = express.Router();

const VerifyToken = require("../../Middlewares/VerifyToken");
const FindOne = require("../../Utils/FindOne");
const UsersModel = require("../../Models/UsersModel");



router.get("/logged-check", VerifyToken, async (req, res) => {

  console.log("===== logged-check API Started =====");
  
  const refreshToken = req.cookies.refreshToken;

  try
  {
    const filter = {refreshToken}
    const userObj = await FindOne(UsersModel, filter);
    res.cookie("role", userObj.role, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1 * 60 * 60 * 1000
    })

    return res.json({code: 3, message: "at least one token is valid, user can Loggin"})
  }
  catch(err)
  {
    console.log("myErr logged-check :=== " + err);
    return res.json({code: 4, message: "Unexpected error"})
  }
  finally
  {
    console.log("===== logged-check API Ended =====");
  }

})


router.get("/role-check", VerifyToken, async (req, res) => {

  console.log("= = = = = role-check API Started = = = = =");

  try
  {
    const role = req.cookies.role;

    if(role)
    {
      return res.json({code: 1, role, message: "role found"})
    }
    else
    {
      return res.json({code: 2, role, message: "role empty"})
    }
  }
  catch(err)
  {
    console.log("myErr role-check :=== " + err);
    return res.json({code: 3, message: "Unexpected Error"})
  }
  finally
  {
    console.log("= = = = = role-check API ended = = = = =");
  }

})


module.exports = router;