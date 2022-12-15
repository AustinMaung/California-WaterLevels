const express = require('express')
const cors = require('cors')

const app = express()

/* Allow any api request to this server, ONLY FOR DEV */
app.use(cors({
    origin: '*'
}))

/* Setup parser to allow POST requests */
app.use(express.json())

/* Calls the CDEC Water API and returns result to frontend */
app.get('/test', (req, res) => {
    fetch("https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA&SensorNums=15&dur_code=M&Start=2022-11&End=2022-11")
    .then((api_req) => api_req.json()) //water data for Nov 2022
    .then((result) => res.send(result[0])) //result is always in an array
})

/* Gets data from Water API given a year and month */
app.post('/water-level', (req, res) => {
    const year = req.body.year
    const month = req.body.month
    const locations = req.body.locations.join()
    const api_call = `https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=${locations}&SensorNums=15&dur_code=M&Start=${year}-${month}&End=${year}-${month}`
    fetch(api_call)
    .then((api_req) => api_req.json())
    .then((result) => res.send(result))
})

app.listen(3000, () => console.log("Listening on Port 3000"))