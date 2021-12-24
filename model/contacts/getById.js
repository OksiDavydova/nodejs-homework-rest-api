const { ObjectId } = require("mongodb");
const db = require("./db");
const { getCollection } = require("./getCollection");

const getById = async (contactId) => {
  const collection = await getCollection(db, "contacts");
  const id = ObjectId(contactId);
  const [result] = await collection.find({ _id: id }).toArray();
  return result;
};
module.exports = getById;
