const express = require("express");
const VerifyToken = require("../../Middlewares/VerifyToken");
const CompanyDetailsModel = require("../../Models/CompanyDetailsModel");
const UpdateOne = require("../../Utils/UpdateOne");
const router = express.Router();
const log = require("../../Utils/log");

router.post("/", VerifyToken, async (req, res) => {

  try
  {
    const {dataArray} = req.body;

    if(!Array.isArray(dataArray))
    {
      return res.status(400).json({message: "something went wrong"});
    }

    for(const item of FormDataArray) {
      const filter = {name: item.name};
      const data = {$set: {value: item.value}};
      await UpdateOne(CompanyDetailsModel, filter, data);
    }
    return res.status(200).json({message: "success"});

  }
  catch(err)
  {
    log("UpdatePrivatedetails failed : " + err);
    return res.status(500).json({message: "unexpected error"});
  }

})

module.exports = router;