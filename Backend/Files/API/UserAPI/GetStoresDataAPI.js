const express = require("express");
const router = express.Router();

const VerifyToken = require("../../Middlewares/VerifyToken");
const FindMany = require("../../Functions/FindMany");
const UsersCollection = require("../../Collections/UsersCollection");

router.get("/", VerifyToken, async (req, res) => {

  console.log("= = = = = get-stores-data API started = = = = =");

  try
  {
    const filter = {role: "seller"}
    const sellerArray = await FindMany(UsersCollection, filter)
    console.log("This is sellerArray::: ", sellerArray);

    const storesArray = sellerArray.map(item => item.stores).flat();
    // map eke agata flat() dana ekama thamai kelinma flaatMap function eken karanne.
    console.log("this is the storesArray::: ", storesArray);

    return res.json({code: 3, storesArray, message: "all stores data gatherd and sent to the frontend"})
  }
  catch(err)
  {
    console.log("myErr get-stores-data API :=== " + err);
    return res.json({code: 4, message: "Unexpected Error"})
  }
  finally
  {
    console.log("= = = = = get-stores-data API ended = = = = =");
  }

})

module.exports = router;