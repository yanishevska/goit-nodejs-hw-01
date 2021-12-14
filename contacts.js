const fs = require('fs/promises')
const contactsPath = require('path')
const crypto = require('crypto') 

const readContent = async () => {
  const content = await fs.readFile(contactsPath.join(__dirname, 'db', 'contacts.json'), 'utf8')
  const result = JSON.parse(content)
  return result
}

const listContacts = async () => {
  return await readContent()
}

const getContactById = async (contactId) => {
  const contacts = await readContent()
  const [contactById] = contacts.filter((contact) => contact.id === contactId)
  return contactById
}

const removeContact = async (contactId) => {
  const contacts = await readContent()
  const removeContactById = contacts.filter((contact) => contact.id !== contactId)
  await fs.writeFile(
    contactsPath.join(__dirname, 'db', 'contacts.json'),
    JSON.stringify(removeContactById, null, 2),
  )
  return removeContactById
}


const addContact = async (name, email, phone) => {
  const contacts = await readContent()
  const newContacts = { name, email, phone, id: crypto.randomUUID() }
  contacts.push(newContacts)
  await fs.writeFile(
    contactsPath.join(__dirname, 'db', 'contacts.json'),
    JSON.stringify(contacts, null, 2),
  )
  return newContacts
}

module.exports = {listContacts,getContactById,removeContact,addContact}