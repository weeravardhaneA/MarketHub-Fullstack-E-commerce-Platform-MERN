const DeleteOne = async (collection, filter) => {

  console.log("DeleteOne Started");

  try
  {
    await collection.deleteOne(filter);
  }
  catch(err)
  {
    console.log("myErr DeleteOne :=== " + err);
  }
  finally
  {
    console.log("DeleteOne Ended");
  }

}

module.exports = DeleteOne;