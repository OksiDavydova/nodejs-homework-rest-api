const db = require("./db");
const { getCollection } = require("./getCollection");

const listContacts = async () => {
  const collection = await getCollection(db, "contacts");
  const result = await collection.find().toArray();
  return result;
};
module.exports = listContacts;
