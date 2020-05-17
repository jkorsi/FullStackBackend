const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
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
    console.log("Before if value, ", value)
    return value;
}

//--------------------------------
//------- HARDCODE PERSONS -------
//--------------------------------

let persons = [{
    name: "Mano Wethered",
    number: "753 487 7192",
    id: 1
}, {
    name: "Asher Seggie",
    number: "284 286 1785",
    id: 2
}, {
    name: "Julio de Merida",
    number: "197 855 1505",
    id: 3
}, {
    name: "Nichols Rew",
    number: "259 862 9461",
    id: 4
}, {
    name: "Bondie Ogden",
    number: "150 417 5651",
    id: 5
}]

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
    response.json(persons)
    console.log("Persons get: ", persons)
})

//-------------------------------
//---------- GET BY ID ----------
//-------------------------------
app.get('/api/persons/:id', (request, response) =>
{
    console.log("request headers", request.headers)
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person =>
    {
        console.log(person.id, typeof person.id, id, typeof id, person.id === id)
        return person.id === id
    })

    console.log(person)

    if (person)
    {
        response.json(person)
        console.log("person", person)
    } else
    {
        response.status(404).end()
    }
})

//-------------------------------
//---------- GET INFO -----------
//-------------------------------
app.get('/info', (request, response) =>
{

    const length = persons.length
    const lengthString = `There's ${length} persons in the phonebook.`

    const date = new Date().toString()
    const content = `${lengthString}<br><br>${date}`

    console.log("request headers", request.headers)
    response.send(content)
    console.log("Persons get: ", persons)
})

//----------------------------------
//----------- DELETE ONE -----------
//----------------------------------
app.delete('/api/persons/:id', (request, response) =>
{
    console.log("request headers", request.headers)
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

//--------------------------------
//----------- POST ONE -----------
//--------------------------------
app.post('/api/persons', (request, response) =>
{
    console.log("Req Params: ", request.params)
    const body = request.body
    console.log("Req body:", body)

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

    const personExists = persons.find(person =>
    {
        console.log("Debug Person name: ", person.name, ", Body name: ", body.name)
        return person.name === body.name
        console.log(person.name === body.name)
    })

    if (personExists)
    {
        return response.status(400).json({
            error: 'Name already exists'
        })
    } else
    {
        const person = {
            name: body.name,
            number: body.number,
            // Int between 10 billion and 99,99.. billion (to keep consistent length)
            id: getRandomInt(10000000000, 100000000000)
        }
        console.log("Debug Person: ", person)

        persons = persons.concat(person)
        console.log(persons)

        response.json(person)
    }
})

//--------- RANDOM INT ----------
// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max)
{
    console.log("Debug: Get Random ID. Min: ", min, ", Max: ", max)
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//-------------- PORT --------------
const PORT = 3001
app.listen(PORT, () =>
{
    console.log(`Server running on port ${PORT}`)
})

