const getCollection = async (db, name) => {
  const client = await db;
  const collection = client.db().collection(name);
  return collection;
};

module.exports = { getCollection };
