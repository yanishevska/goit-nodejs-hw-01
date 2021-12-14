const chalk= require('chalk')
const { Command } = require('commander');
const{listContacts,addContact,getContactById,removeContact} = require('./contacts')

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


const invokeAction = async ({ action, id, name, email, phone }) => {
 
  switch (action) {
    case 'list':
      const contacts = await listContacts()
      console.table(contacts)
      break;

    case 'get':
      const contactById = await getContactById(id)
      const withId = (chalk.bold.cyanBright(`id: ${id}`))
      if (contactById) {
        console.log(chalk.green(`Found contact with ${withId}`));
        console.table(contactById);
        return
      }
      console.log(chalk.yellow(`Contact with ${withId} not found`));
      console.table(contactById);
        
      break;

    case 'add':
      const contact = await addContact(name, email, phone)
      console.log(chalk.green('Add new Contact'));
      console.table(contact);
      break;

    case 'remove':
      const removeContactById = await removeContact(id)
      if (removeContactById) {
        const withId = (chalk.bold.cyanBright(`id: ${id}`))
        console.log(chalk.green(`Contact with ${withId} removed`));
        console.table(removeContactById);
        return
      }
      console.log(chalk.yellow(`Contact with id: ${id} not removed`));
        
      break;

    default:
      console.warn(chalk.red('Unknown action type!'));
  }
}

invokeAction(argv).then(()=>console.log('Operation success'))
