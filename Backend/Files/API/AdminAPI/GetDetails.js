const express = require("express");
const VerifyToken = require("../../Middlewares/VerifyToken");
const FindMany = require("../../Functions/FindMany");
const CompanyDetailsCollection = require("../../Collections/CompanyDetailsCollection");
const router = express.Router();

router.use("/", VerifyToken, async (req, res) => {

  console.log("= = = GetDetails = = =");

  try
  {
    const filter = {}
    const result = await FindMany(CompanyDetailsCollection, filter)

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