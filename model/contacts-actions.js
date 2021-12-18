const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactPath = path.join(__dirname, "contacts.json");

class Contacts {
  readContent = async () => {
    try {
      const content = await fs.readFile(contactPath, "utf8");
      const result = JSON.parse(content);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  };

  listContacts = async () => {
    const contacts = await this.readContent();
    return contacts;
  };

  getById = async (contactId) => {
    const contacts = await this.readContent();
    const [contact] = contacts.filter((contact) => contact.id === contactId);
    return contact;
  };

  removeContact = async (contactId) => {
    const contacts = await this.readContent();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      const [result] = contacts.splice(index, 1);
      await fs.writeFile(
        path.join(contactPath),
        JSON.stringify(contacts, null, 2)
      );
      return result;
    }
    return null;
  };

  addContact = async ({ name, email, phone }) => {
    const contacts = await this.readContent();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(
      path.join(contactPath),
      JSON.stringify(contacts, null, 2)
    );
    return newContact;
  };

  updateContact = async (contactId, body) => {
    const contacts = await this.readContent();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      const updatedContact = { id: contactId, ...contacts[index], ...body };
      contacts[index] = updatedContact;
      await fs.writeFile(
        path.join(contactPath),
        JSON.stringify(contacts, null, 2)
      );
      return updatedContact;
    }
    return null;
  };
}

module.exports = new Contacts();
