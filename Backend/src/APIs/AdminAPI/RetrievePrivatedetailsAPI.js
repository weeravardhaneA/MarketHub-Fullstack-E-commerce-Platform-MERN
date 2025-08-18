const express = require("express");
const VerifyToken = require("../../Middlewares/VerifyToken");
const FindAll = require("../../Utils/FindAll");
const CompanyDetailsModel = require("../../Models/CompanyDetailsModel");
const router = express.Router();
const log = require("../../Utils/log");

router.use("/", VerifyToken, async (req, res) => {

  try
  {

    const result = await FindAll(CompanyDetailsModel);
    return res.status(200).json({message: "success", data: result});
  
  }
  catch(err)
  {
    log("RetrievePrivatedetailsAPI failed : ", err);
    return res.status(500).json({message: "unexpected error"});
  }

})

module.exports = router;