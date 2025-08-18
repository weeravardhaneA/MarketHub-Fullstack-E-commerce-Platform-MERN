
const express = require("express");
const router = express.Router();

const UpdateOne = require("../../Utils/UpdateOne");
const VerifyToken = require("../../Middlewares/VerifyToken");
const UsersModel = require("../../Models/UsersModel");



router.post("/", VerifyToken, async (req, res) => {

  console.log("= = = = = store-create API Started = = = = =");

  try
  {
    const refreshToken = req.cookies.refreshToken;
    const {StoreName, StoreDescription, StoreImageUrl} = req.body;

    console.log("Data ", StoreName, StoreDescription, StoreImageUrl);

    const filter = {refreshToken}
    const data = {$push: {stores: {name: StoreName, description: StoreDescription, imageUrl: StoreImageUrl}}}
    await UpdateOne(UsersModel, filter, data);

    return res.json({code: 3, message: "Store Added"})
  }
  catch(err)
  {
    console.log("myErr store-create :=== " + err);
    return res.json({code: 4, message: "Unexpet Error"})
  }
  finally
  {
    console.log("= = = = = store-create API Ended = = = = =");
  }

})

module.exports = router;