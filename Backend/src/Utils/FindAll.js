const FindAll = async (collection) => {

  const result = await collection.find().lean();
  return result;

}

module.exports = FindAll;