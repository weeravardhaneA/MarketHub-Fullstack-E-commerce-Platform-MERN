const FindOne = async (collection, filter) => {

  console.log("FindOne Started");

  try
  {
    const result = await collection.findOne(filter).lean();

    return result;
  }
  catch(err)
  {
    console.log("myErr FindOne :=== " + err);
  }
  finally
  {
    console.log("FindOne Ended");
  }

}

module.exports = FindOne;