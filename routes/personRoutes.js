const router = require('express').Router();

const Person = require('../models/Person')

// Rotas da Api

// Create - Criaçao
router.post('/', async (req, res) => {

    // req.body

    // {name: "Gabriel", salary: 600, approved: false}
    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ message: 'O nome é obrigatório!' })
    }

    const person = {
        name,
        salary,
        approved
    }

    // Create 
    try {
        await Person.create(person)

        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Read - Leitura de dados
router.get('/', async (req, res) => {
    try {
        // People = Pessoas
        const people = await Person.find()

        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})
module.exports = router;