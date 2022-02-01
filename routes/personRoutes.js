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
        return
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
// Read - Leitura de dados by Id
router.get('/:id', async (req, res) => {

    // Extrair dado da requisição, pela url = req.params
    const id = req.params.id
    try {
        // People = Pessoas
        const person = await Person.findOne({ _id: id })
        if (!person) {
            res.status(422).json({ message: 'O usuário não foi encontrado!' })
            return

        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// UPDATE - Atualização de Dados (PUT, PATCH)

// O método de requisição HTTP PATCH aplica modificações parciais a um recurso.
// O método HTTP PUT permite apenas substituições completas de um documento.

router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {
        // People = Pessoas
        const updatePerson = await Person.updateOne({ _id: id }, person)

        if (updatePerson.matchedCount === 0) {
            res.status(422).json({ message: 'O usuário não foi encontrado!' })
            return
        }

        res.status(200).json(person)
        return

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router;