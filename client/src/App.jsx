import { useState, useEffect, useRef } from 'react'
import { postRequest, getRequest } from './AJAX.js'
import { Chart } from './Chart.jsx'
// import reactLogo from './assets/react.svg'
// import './App.css'

function App() {
  const [total_datasets, setList] = useState([])
  const [actual_datasets, setActual] = useState([])
  const [current_dataset_index, setCurrent] = useState(1)

  const [start_year, setStart] = useState(1970)
  const [year_increment, setIncrement] = useState(10)
  const [month, setMonth] = useState(11)

  const NUMOFREQUESTS = parseInt((2022 - start_year) / year_increment) + 1

  const [array_of_observables, setObservables] = useState([])
  

   /* Gathers datasets based on a starting year and how many years to increment for */
   useEffect(() => {
    async function callFetchRequests() {
      const store_datasets = []
      /* Make multiple post requests to get sets of data from CDEC API for each decade */
      const api_call = new URL("http://localhost:3000/water-level-single")
      for(let i = 0; i < NUMOFREQUESTS; i++) {
        const year_month_locations = {
          year: start_year + (i * year_increment),
          month: month,
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

  /* create elements for intersection observer */
  useEffect(() => {
    const store_observables = []
    for(let i = 1; i < NUMOFREQUESTS; i++) {
      store_observables.push(
        <div style={{display: "grid", placeItems: "center", alignContent: "center", minHeight: "100vh"}} key={i.toString()} id={i} className="Observable">{i}</div> 
      )
    }
    setObservables(store_observables)
  }, [start_year, year_increment])

  /* set up intersection observer*/
  useEffect(() => {
    if(array_of_observables.length <= 0) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) return
        setCurrent(parseInt(entry.target.id))
      })
    }, {root: null, rootMargin: "0px", threshold: 0.60})
    const html_observables = document.querySelectorAll(".Observable")
    html_observables.forEach((observable) => {
      observer.observe(observable)
    })
  }, [array_of_observables])

  /* set how many datasets to actually load depending on intersection observer.
     Observer sees how far webpage is scrolled down
  */
  useEffect(() => {
    if(total_datasets.length <= current_dataset_index) return
    setActual(total_datasets.slice(0, current_dataset_index))
  }, [total_datasets, current_dataset_index])

  return (
    <div className="App">
      <span style={{position: "sticky", top: "0%", float: "left", width: "100%"}}>
        <Chart water_dataset={actual_datasets}/>
      </span> 
      
      {array_of_observables}
      
    </div>
  )
}

export default App
