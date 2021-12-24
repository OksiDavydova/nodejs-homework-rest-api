const db = require("./db");
const { getCollection } = require("./getCollection");

const addContact = async (body) => {
  const collection = await getCollection(db, "contacts");
  const newContact = {
    favorite: false,
    ...body,
  };
  const result = await collection.insertOne(newContact);
  return result;
};

module.exports = addContact;
