// Config Inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Person = require('./models/Person')

// Forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Rotas da Api 
app.post('/person', async (req, res) => {

    // req.body

    // {name: "Gabriel", salary: 600, approved: false}
    const { name, salary, approved } = req.body



    const person = {
        name,
        salary,
        approved
    }

    // Create 
    try {
        await Person.create(person)

        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Rota Inicial / endpoint
app.get('/', (req, res) => {

    // Mostrar require

    res.json({ message: 'OI Express!' })
})

// Entregar uma porta
const DB_USER = 'BielMartins'
const DB_PASSWORD = encodeURIComponent('WTPBWP6XZ5fkBuAt')

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.8xadz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectamos ao MongoDB!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))