const FindMany = async (collection, filter) => {

  console.log("FindOne Started");

  try
  {
    const result = await collection.find(filter).lean();

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

module.exports = FindMany;