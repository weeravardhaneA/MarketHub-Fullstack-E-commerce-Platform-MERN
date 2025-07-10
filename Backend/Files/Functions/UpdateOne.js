const UpdateOne = async (collection, filter, newDoc) => {

  console.log("========== UpdateOne Started ==========");

  try
  {
    await collection.updateOne(filter, newDoc);
  }
  catch(err)
  {
    console.log("myErr UpdateOne :=== " + err);
  }
  finally
  {
    console.log("========== UpdateOne Ended ==========");
  }
}

module.exports = UpdateOne;