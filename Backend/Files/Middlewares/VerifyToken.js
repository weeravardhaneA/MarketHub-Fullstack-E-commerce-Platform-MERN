const jwt = require("jsonwebtoken")
const util = require("util");
const VerifyJwt = util.promisify(jwt.verify)

const GenerateToken = require("./GenerateToken");




const VerifyToken = async (req, res, next) => {

  console.log("VerifyToken Started");

  try
  {
    const token = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;

    try
    {
      await VerifyJwt(token, process.env.TOKEN_KEY)

      next();
    }
    catch(err)
    {
      try
      {
        await VerifyJwt(refreshToken, process.env.REFRESH_TOKEN_KEY)

        const obj = {refreshToken}
        const newToken = GenerateToken(obj, process.env.TOKEN_KEY, "300s")
        res.cookie("token", newToken, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          maxAge: 5 * 60 * 1000
        })

        next();
      }
      catch(err)
      {
        return res.json({code: 1, message: "both tokens are expired"})
      }
    }
  }
  catch(err)
  {
    console.log("myErr VerifyToken :=== " + err);
    return ({code: 2, message: "VerifyToken Unexpected error"})
  }
  finally
  {
    console.log("VerifyToken Ended");
  }

}

module.exports = VerifyToken;