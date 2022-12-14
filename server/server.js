const express = require('express')
const cors = require('cors')

const app = express()

/* allow any api request to this server, ONLY FOR DEV */
app.use(cors({
    origin: '*'
}))

/* Calls the CDEC Water API and returns result to frontend */
app.get('/test', (req, res) => {
    fetch("https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA&SensorNums=15&dur_code=M&Start=2022-11&End=2022-11")
    .then((api_req) => api_req.json()) //water data for Nov 2022
    .then((result) => res.send(result[0])) //result is always in an array
})

app.listen(3000, () => console.log("Listening on Port 3000"))