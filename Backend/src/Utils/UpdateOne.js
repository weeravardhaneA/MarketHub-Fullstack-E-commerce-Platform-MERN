const UpdateOne = async (collection, filter, newDoc) => {

  await collection.updateOne(filter, newDoc);

}

module.exports = UpdateOne;