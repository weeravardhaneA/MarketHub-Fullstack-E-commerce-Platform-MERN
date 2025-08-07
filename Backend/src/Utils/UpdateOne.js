const UpdateOne = async (collection, filter, newDoc) => {

  console.log("========== UpdateOne Started ==========");

  try
  {
    const result = await collection.updateOne(filter, newDoc);

    if (result.matchedCount === 0)
    {
      console.log("No document found");
    }
    else if(result.modifiedCount === 0)
    {
      console.log("ℹDocument found but nothing was changed.");
    }
    else
    {
      console.log("Document updated successfully.");
    }
  }
  catch(err)
  {
    console.log("Err UpdateOne :=== " + err);
  }
  finally
  {
    console.log("========== UpdateOne Ended ==========");
  }
}

module.exports = UpdateOne;