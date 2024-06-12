import express from 'express'

const app = express()
const port = 3030

app.get('/', (req, res) => res.send('Hello there'))


app.listen(port, () => console.log(`Server ready at port ${port}`))