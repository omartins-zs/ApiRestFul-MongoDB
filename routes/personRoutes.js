const router = require('express').Router();

const Person = require('../models/Person')

// Rotas da Api 
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

module.exports = router;