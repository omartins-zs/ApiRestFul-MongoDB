// Config Inicial

const express = require('express')
const app = express()

// Forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Rota Inicial / endpoint
app.get('/', (req, res) => {

    // Mostrar require

    res.json({ message: 'OI Express!' })
})

// Entregar uma porta
app.listen(3000)