const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contactsList = await listContacts();
        console.log(contactsList);
        break;
      } catch (error) {
        throw new Error(`Contacts not found`);
      }

    case "get":
      try {
        const user = await getContactById(id);
        console.log(user);
        break;
      } catch (error) {
        throw new Error(`User with id=${id} not found`);
      }

    case "add":
      try {
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
      } catch (error) {
        throw new Error(`Contact do not add`);
      }
      break;

    case "remove":
      try {
        const updateContactsList = await removeContact(id);
        console.log(updateContactsList);
      } catch (error) {
        throw new Error(`Contacts list do not update`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
