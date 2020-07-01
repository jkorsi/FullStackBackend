const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

const Person = mongoose.model('Person', personSchema)

switch (process.argv.length)
{
    case 3:
        getData(process.argv[2])
        break
    case 5:
        addPerson(process.argv[2], process.argv[3], process.argv[4])
        break
    default:
        console.log('Give password to retrieve data. Give password, name and number to add data.')
        process.exit(1)
}

//--------- TESTING FUNCTIONS ----------
function addPerson(password, name, number)
{
    connect(password)
    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(response =>
    {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

function getData(password)
{
    connect(password)
    Person.find({}).then(result =>
    {
        console.log('Phonebook:')
        result.forEach(person =>
        {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

function connect(password)
{
    const url =
        `mongodb+srv://juho:${password}@hy-fullstack.gfdbm.mongodb.net/phonebook?retryWrites=true&w=majority`

    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
}