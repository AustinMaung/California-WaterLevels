import { useState, useEffect } from 'react'
import { postRequest, getRequest } from './AJAX.js'
import { Chart } from './Chart.jsx'
// import reactLogo from './assets/react.svg'
// import './App.css'

const DECADE = 10
const STARTYEAR = 1980
const NUMOFREQUESTS = 5

function App() {
  const [datasets, setList] = useState([])

  /* Gather data for every 10 years since 1970 */
  useEffect(() => {
    async function callFetchRequests() {
      const store_datasets = []
      /* Make multiple post requests to get sets of data from CDEC API for each decade */
      const api_call = new URL("http://localhost:3000/water-level-single")
      for(let i = 0; i < NUMOFREQUESTS; i++) {
        const year_month_locations = {
          year: STARTYEAR + (i * DECADE),
          month: 11,
          locations: ["SHA", "ORO", "CLE", "NML", "SNL", "DNP", "BER"]
        }
        const data = postRequest(api_call, year_month_locations)
        .catch(() => console.log("error"))
        store_datasets.push(data)
      }
      /* Wait till all the async calls finish before returning stored datas */
      return await Promise.all(store_datasets)
    }
    callFetchRequests()
    .then((array_of_datasets)=>{
      /* update state */
      setList(array_of_datasets)
      console.log(array_of_datasets)
      // console.log(test)
    })
  }, [])

  return (
    <div className="App">
      <Chart water_dataset={datasets}/>
    </div>
  )
}

export default App
