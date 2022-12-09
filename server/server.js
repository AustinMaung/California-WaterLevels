const express = require('express')

const app = express()

app.get('/', (req, res) => {
    console.log('testing nodemon3')
    res.send('Server Works')
})

app.listen(3000, () => console.log("Listening on Port 3000"))