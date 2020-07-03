const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);
const password = process.argv[2]

// const url =
//     `mongodb+srv://juho:${password}@hy-fullstack.gfdbm.mongodb.net/phonebook?retryWrites=true&w=majority`
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result =>
    {
        console.log('connected to MongoDB')
    })
    .catch((error) =>
    {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    }
    ,
    number: {
        type: String,
        minlength: 8,
        required: true
    },
    id: String,
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, person) =>
    {
        person.id = person._id.toString()
        delete person._id
        delete person.__v
    }
})

//const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)