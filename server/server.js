const express = require('express')
const cors = require('cors')

const app = express()

/* Allow any api request to this server, ONLY FOR DEV */
app.use(cors({
    origin: ['https://california-waterlevels.onrender.com', 'http://localhost:5173']
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
app.post('/water-level-single', (req, res) => {
    const year = req.body.year
    const month = req.body.month
    const locations = req.body.locations.join()
    const api_call = `https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=${locations}&SensorNums=15&dur_code=M&Start=${year}-${month}&End=${year}-${month}`
    console.log(api_call)
    function recursive() {
        fetch(api_call)
        .then((api_req) => api_req.json())
        .then((result) => res.send(result))
        .catch(() => {
            console.log("recursive", api_call)
            recursive()
        })
    }
    recursive()
})

app.post('/water-level-multiple', (req, res) => {
    const start_year = req.body.start_year
    const end_year = req.body.end_year
    const month = req.body.month
    const locations = req.body.locations.join()
    const api_call = `https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=${locations}&SensorNums=15&dur_code=M&Start=${start_year}-1&End=${end_year}-1`
    console.log(api_call)
    fetch(api_call)
    .then((api_req) => api_req.json())
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})

app.listen(3000, () => console.log("Listening on Port 3000"))