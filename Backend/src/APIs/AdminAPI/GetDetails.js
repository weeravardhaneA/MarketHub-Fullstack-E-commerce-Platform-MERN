const express = require("express");
const VerifyToken = require("../../Middlewares/VerifyToken");
const FindMany = require("../../Utils/FindMany");
const CompanyDetailsModel = require("../../Models/CompanyDetailsModel");
const router = express.Router();

router.use("/", VerifyToken, async (req, res) => {

  console.log("= = = GetDetails = = =");

  try
  {
    const filter = {}
    const result = await FindMany(CompanyDetailsModel, filter)

    return res.json({code: 3, data: result})
  }
  catch(err)
  {
    console.log("Err :=== " + err);
    return res.json({code: 4, message: "data not found"})
  }
  finally
  {
    console.log("= = = GetDetails = = =");
  }

})

module.exports = router;