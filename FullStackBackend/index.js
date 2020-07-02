require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('../models/person')
const person = require('../models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

//--------------------------------
//------------ MORGAN ------------
//--------------------------------
morgan.token('body', function (req, res)
{
    return JSON.stringify(req.body, replacer)
})

function replacer(key, value)
{
    return value;
}

let persons = []

//--------------------------------
//----------- GET ROOT -----------
//--------------------------------
app.get('/', (request, response) =>
{
    console.log("request headers", request.headers)
    response.send('<h2>Root page</h2>')
})

//-------------------------------
//----------- GET ALL -----------
//-------------------------------
app.get('/api/persons', (request, response) =>
{
    console.log("request headers", request.headers)
    Person.find({}).then(result =>
    {
        response.json(result)
        console.log('Length:', result.length)
        console.log("Persons get: ", result)
    })
})

//-------------------------------
//---------- GET BY ID ----------
//-------------------------------
app.get('/api/persons/:id', (request, response, next) =>
{
    console.log("request headers", request.headers)
    const id = String(request.params.id)
    console.log('ID', id)
    Person.findById(id)
        .then(person =>
        {
            if (person)
            {
                response.json(person)
            }
            else
            {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

//-------------------------------
//---------- GET INFO -----------
//-------------------------------
app.get('/info', (request, response, next) =>
{
    let length = 0
    Person.find({}).then(result =>
    {
        length = result.length
        console.log('Length:', result.length)

        const lengthString = `There's ${length} persons in the phonebook.`
        const date = new Date().toString()
        const content = `${lengthString}<br><br>${date}`

        console.log("request headers", request.headers)
        response.send(content)
        console.log("Persons get: ", persons)

    }).catch(error => next(error))

})

//----------------------------------
//----------- UPDATE ONE -----------
//----------------------------------
app.put('/api/persons/:id', (request, response) =>
{
    const body = request.body
    console.log("request headers", request.headers)
    console.log("Update request parameters:", request.params)
    const id = String(request.params.id)
    console.log('Trying to update person with ID: ', id)
    console.log('Person not found')

    console.log('Person found')
    const person = {
        name: body.name,
        number: body.number,
        id: body.id
    }

    console.log('persons status: ', persons)

    Person.findByIdAndUpdate(id, person, {new: true})
        .then(updatedPerson =>
        {
            response.json(updatedPerson)
            console.log('Person with id', id, ' updated succesfully.')
        })
        .catch(error => next(error))
})

//----------------------------------
//----------- DELETE ONE -----------
//----------------------------------
app.delete('/api/persons/:id', (request, response, next) =>
{

    console.log("request headers", request.headers)
    const id = String(request.params.id)
    console.log('Persons id', id)

    Person.findByIdAndRemove(id)
        .then(person =>
        {
            console.log('Person with id', id, ' removed succesfully.')
            persons = persons.filter(person => person.id !== id)
            response.status(204).end()
        })
        .catch(error => next(error))
})

//--------------------------------
//----------- POST ONE -----------
//--------------------------------
app.post('/api/persons', (request, response) =>
{
    console.log("Req Params: ", request.params)
    const body = request.body
    console.log("Req body:", body)

    //---------- ERRORS ------------
    if (!body.name && !body.number)
    {
        return response.status(400).json({
            error: 'Name and number are required'
        })
    }
    else if (!body.name)
    {
        return response.status(400).json({
            error: 'Name is required'
        })
    }
    else if (!body.number)
    {
        return response.status(400).json({
            error: 'Number is required'
        })
    }

    //---------- LOGIC ------------
    const personExists = persons.find(person =>
    {
        console.log("Debug Person name: ", person.name, ", Body name: ", body.name)
        return person.name === body.name
    })

    if (personExists)
    {
        return response.status(400).json({
            error: 'Name already exists'
        })
    } else
    {
        const person = new Person({
            name: body.name,
            number: body.number,
        })

        person.save().then(savedPerson =>
        {
            response.json(savedPerson)
            console.log("Saved person successfully:", savedPerson)
            persons = persons.concat(savedPerson)
        })
    }
})

//-------------- PORT --------------
const PORT = process.env.PORT
console.log(process.env.PORT)
app.listen(PORT, () =>
{
    console.log(`Server running on port ${PORT}`)
})

//-------- ERROR HANDLING ----------
const unknownEndpoint = (request, response) =>
{
    response.status(404).send({error: 'Path not found'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) =>
{
    console.error('Error message:', error.message)
    console.error('Error name: ', error.name)

    if (error.name === 'CastError')
    {
        return response.status(400).send({error: 'ID is in incorrect format'})
    }

    next(error)
}
app.use(errorHandler)