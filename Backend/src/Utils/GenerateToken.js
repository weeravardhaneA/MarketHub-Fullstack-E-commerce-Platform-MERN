const jwt = require("jsonwebtoken")

const GenerateToken = (obj, key, expireTime) => {

  console.log("GenerateToken Started");

  try
  {
    const token = jwt.sign(obj, key, {expiresIn: expireTime})
    return token;
  }
  catch(err)
  {
    console.log("myErr GenerateToken :=== " + err);
  }
  finally
  {
    console.log("GenerateToken Ended");
  }

}

module.exports = GenerateToken;