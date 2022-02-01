// Config Inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()


// Forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Rotas da Api 
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

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