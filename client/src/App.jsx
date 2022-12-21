import { useState, useEffect } from 'react'
import { postRequest, getRequest } from './AJAX.js'
import { Chart } from './Chart.jsx'
// import reactLogo from './assets/react.svg'
// import './App.css'

const DECADE = 10
const STARTYEAR = 1970
const NUMOFREQUESTS = 6

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
      const store_array = array_of_datasets
      const locations = ["SHA", "ORO", "CLE", "NML", "SNL", "DNP", "BER"]
      /* Go through each dataset of decades, check if theres a missing month for a decade,
         then insert dummy data for that month
      */
      store_array.forEach(water_datas_of_year => {
        water_datas_of_year.map((water_data_of_location, index) => {
          /* If theres a missmatch, then a month is missing, insert dummy data */
          if(water_data_of_location.stationId != locations[index]) {  
            const missing_location = {
              /* date: assumes theres another month in the dataset */
              date: water_datas_of_year[water_datas_of_year.length - 1].date.slice(0, 4),
              stationId: locations[index],
              value: 0
            }
            water_datas_of_year.splice(index, 0, missing_location)
          }
        })
      });
      /* update state */
      setList(array_of_datasets)
      // console.log(array_of_datasets)
    })
  }, [])

  return (
    <div className="App">
      <Chart water_dataset={datasets}/>
    </div>
  )
}

export default App
