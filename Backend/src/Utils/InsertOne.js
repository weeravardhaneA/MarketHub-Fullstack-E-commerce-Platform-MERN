const InsertOne = async (collection, data) => {

  console.log("InsertOne Started");

  try
  {
    const result = await collection.create(data);
  }
  catch(err)
  {
    console.log("myErr InsertOne :=== " + err);
  }
  finally
  {
    console.log("InsertOne Ended");
  }
}

module.exports = InsertOne;