const mongoose = require('mongoose')
require('dotenv').config()
const Customer = require('./model/customer.js')
const prompt = require('prompt-sync')()

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('What would you like to do?')
  console.log('1. Create a customer')
  console.log('2. View all customers')
  console.log('3. Update a customer')
  console.log('4. Delete a customer')
  console.log('5. quit')

  let nummber = await prompt('Number of action to run: ')

  if (nummber === '1') {
    const name = prompt('Enter the name: ')
    const age = prompt('Enter the age: ')
    await createCustomer(name, age)
  } else if (nummber === '2') {
    await findCustomer()
  } else if (nummber === '3') {
    await find()
    const id = prompt('Enter the id: ')
    const name = prompt('Enter the name: ')
    const age = prompt('Enter the age: ')

    await updateCustomer(id, name, age)
  } else if (nummber === '4') {
    await find()
    const id = prompt('Enter the id: ')
    await deleteCustomer(id)
  } else if (nummber === '5') {
    console.log('exiting...')
    process.exit()
  }
  process.exit()
}

const createCustomer = async (name, age) => {
  const customerData = {
    name: name,
    age: age
  }

  const customer = await Customer.create(customerData)
  console.log('new customer', customer)
}

const find = async () => {
  const customers = await Customer.find()
  console.log('Below list of customers: ')
  customers.forEach((customer) => {
    console.log(
      `id: ${customer.id} --  Name: ${customer.name}, Age: ${customer.age}`
    )
  })
}

const findCustomer = async () => {
  const customers = await Customer.find()
  console.log('All Customers: ', customers)
}

const updateCustomer = async (id, name, age) => {
  const cId = id
  const updatedCustomer = await Customer.findByIdAndUpdate(
    cId,
    { name: name },
    { age: age }
  )
  console.log('Updated customer:', updatedCustomer)
}

const deleteCustomer = async (id) => {
  const cId = id
  const removedCustomer = await Customer.findByIdAndDelete(cId)
  console.log('Removed Customer:', removedCustomer)
}

connect()
