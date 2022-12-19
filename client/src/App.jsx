import { useState, useEffect } from 'react'
import { postRequest, getRequest } from './AJAX.js'
import { Chart } from './Chart.jsx'
// import reactLogo from './assets/react.svg'
// import './App.css'

/**
 * Temporary component to see if post requests to server works: DELETE LATER
 * @param {object} water_data data from CDEC Water API
 * @param {Function} setData useState function that updates propogated state, water_data
 */
function TestButton( {water_data, setData} ) {
  // const [water_data, setData] = useState([]) //water data: data returned by CDEC api
  async function fetchData() {
    const api_call = new URL("http://localhost:3000/water-level-single") //path to server: CHANGE MUCH LATER
    const year_month_locations = {
      year: 2022,
      month: 11,
      locations: ["SHA", "ORO", "CLE", "NML", "SNL", "DNP", "BER"]
    }
    let data = await postRequest(api_call, year_month_locations)
    console.log(data)
    setData(data)
  }

  return (
    <div>
      {/* <h1>{JSON.stringify(water_data.map(x => x.stationId+ ": " + x.value.toString()))}</h1> */}
      <button onClick={fetchData}>Test</button>
    </div> 
  )
}

function App() {
  const [water_data, setData] = useState([])
  const locations = water_data.map(x => x.stationId)
  const values = water_data.map(x => x.value)

  /* testing API call to CDEC Water API through server on loadup */
  useEffect(() => {
    async function fetchData() {
      const url = new URL("http://localhost:3000/test") //path to server
      const data = await getRequest(url)
      console.log(data)
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      {/* <h1>test1 {JSON.stringify(water_data.map(x => x.stationId+ ": " + x.value.toString()))} </h1> */}
      <h1>{JSON.stringify(locations)}</h1>
      <h1>{JSON.stringify(values)}</h1>
      <Chart 
        locations={locations}
        data={values}
      />
      <TestButton water_data={water_data} setData={setData}/>
    </div>
  )
}

export default App
