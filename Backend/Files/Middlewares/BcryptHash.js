const bcrypt = require("bcrypt")

const BcryptHash = async (password) => {

  console.log("BcryptHash Started");

  try
  {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return hashedPassword;
  }
  catch(err)
  {
    console.log("myErr BcryptHash :=== " + err);
  }
  finally
  {
    console.log("Bcrypt Ended");
  }

}

module.exports = BcryptHash;