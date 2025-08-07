const express = require("express");
const VerifyToken = require("../../Middlewares/VerifyToken");
const CompanyDetailsModel = require("../../Models/CompanyDetailsModel");
const UpdateOne = require("../../Utils/UpdateOne");
const InsertOne = require("../../Utils/InsertOne");
const router = express.Router();

router.post("/", VerifyToken, async (req, res) => {

  console.log("= = = UpdateDetails = = =");

  try
  {
    const {FormDataArray} = req.body;

    console.log(FormDataArray);

    for(const item of FormDataArray) {

      const filter = {name: item.name}
      const data = {$set: {value: item.value}}
      await UpdateOne(CompanyDetailsModel, filter, data)

    }

    return res.json({code: 3, message: "updated"})

  }
  catch(err)
  {
    console.log("Err :=== " + err);
    return res.json({code: 4, message: "failed to update"})
  }
  finally
  {
    console.log("= = = UpdateDetails = = =");
  }

})

module.exports = router;