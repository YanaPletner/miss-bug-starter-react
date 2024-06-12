import express from 'express'

import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'

const app = express()
const port = 3030

app.get('/', (req, res) => res.send('Hello there'))

app.get('/api/bug', (req, res) => {
    bugService.query()
        .then(bugs => res.send(bugs))
        .catch(err => {
            loggerService.error(`Couldn't get bugs...`)
            res.status(500).send(`Couldn't get bugs...`)
        })
})

app.get('/api/bug/save', (req, res) => {
    const { _id, title, description, severity } = req.query
    const bugToSave = { _id, title, description, severity: +severity }

    bugService.save(bugToSave)
        .then(savedBug => res.send(savedBug))
})

app.get('/api/bug/:bugId', (req, res) => {
    const { id } = req.params

    bugService.getById(id)
        .then(bug => res.send(bug))
})

app.get('/api/bug/:bugId/remove', (req, res) => {
    const { id } = req.params
    bugService.remove(id)
        .then(() => res.send(`Bug ${id} deleted...`))
})

app.listen(port, () => loggerService.info(`Server ready at port ${port}`))