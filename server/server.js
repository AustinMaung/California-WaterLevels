const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    // console.log("tessst")
    res.send('Server Works')
})

app.get('/test', (req, res) => {
    // console.log("get request made")
    res.send("test success")
})

app.listen(3000, () => console.log("Listening on Port 3000 and should be cors enabled"))