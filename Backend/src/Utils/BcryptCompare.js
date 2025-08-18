const bcrypt = require("bcrypt")

const BcryptCompare = (password, hash) => {

  console.log("BcryptCompare Started");

  try
  {
    const result = bcrypt.compare(password, hash);

    return result;
  }
  catch(err)
  {
    console.log("myErr BcryptCompare :=== " + err);
  }
  finally
  {
    console.log("BcryptCompare Ended");
  }

}

module.exports = BcryptCompare;