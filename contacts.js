const uuid = require("uuid");
const fs = require("fs").promises;

const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8", (err) => {
    if (err) {
      throw err;
    }
  });
  const contactsList = JSON.parse(data);
  return contactsList;
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const user = contactsList.find((el) => el.id === contactId.toString());
  return user;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const filteredContacts = contactsList.filter(
    (el) => el.id !== contactId.toString()
  );
  console.log(`Contact ${contactId} removed from file`);
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 4));
  return filteredContacts;
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContact = { id: uuid.v1(), name, email, phone };
  contactsList.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 4), "utf8");
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
