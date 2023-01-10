import { useState, useEffect, useRef } from 'react'
import { postRequest, getRequest } from './AJAX.js'
import { Chart } from './Chart.jsx'
import { EveryFiveYearButton, EveryDecadeButton } from './YearButtons.jsx'
import { MonthPicker } from './MonthPicker.jsx'
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
        .catch((error) => console.log(err))
        console.log(data)
        store_datasets.push(data)
      }
      /* Wait till all the async calls finish before returning stored datas */
      console.log(store_datasets)
      return Promise.all(store_datasets)
      // return store_datasets
    }
    callFetchRequests()
    .then((array_of_datasets)=>{
      console.log("ayo")
      console.log(array_of_datasets)
      const store_array = array_of_datasets
      const locations = ["SHA", "ORO", "CLE", "NML", "SNL", "DNP", "BER"]
      /* Go through each dataset, check if missing month or if incorrect value, then
         push in dummy data or replace month with data
      */
      store_array.forEach(water_datas_of_year => {
        locations.forEach((loc, index) => {
          /* gets current data for specfic location, may be missing, which is why mod is used */
          const water_data_of_location = water_datas_of_year[index % water_datas_of_year.length]
          const dummy_data = {
            /* date: assumes theres another month in the dataset */
            date: water_datas_of_year[water_datas_of_year.length - 1].date.slice(0, 4),
            stationId: locations[index],
            value: 0
          }
          /* If theres a missmatch, then month is missing*/
          if(water_data_of_location.stationId != locations[index]) water_datas_of_year.splice(index, 0, dummy_data)
          /* If the location has a value of -9999 */
          else if (water_data_of_location.value == -9999) water_datas_of_year.splice(index, 1, dummy_data)
        })
      });
      /* update state */
      setList(store_array)
    })
    
  }, [year_increment, month])

  /* create elements for intersection observer */
  useEffect(() => {
    const store_observables = []
    for(let i = 0; i < NUMOFREQUESTS; i++) {
      store_observables.push(
        <div style={{display: "grid", placeItems: "center", alignContent: "center", minHeight: "100vh"}} key={i.toString()} id={i} className="Observable"></div> 
      )
    }
    setObservables(store_observables)
  }, [ year_increment])

  /* set up intersection observer, resets every time observables change*/
  const [observer, setObserver] = useState(null)
  useEffect(() => {
    if(array_of_observables.length <= 0) return
    if(observer) observer.disconnect()
    const new_observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) return
        setCurrent(parseInt(entry.target.id))
        // console.log(((1 + parseInt(entry.target.id)) / NUMOFREQUESTS) * 100)
        const percentage_of_screen = ((1 + parseInt(entry.target.id)) / NUMOFREQUESTS) * 100
        // console.log(percentage_of_screen)
        const background_anim = document.querySelector(".background-top")
        background_anim.style.height = `${percentage_of_screen}%`
      })
    }, {root: null, rootMargin: "0px", threshold: 0.6})
    setObserver(new_observer)
  }, [array_of_observables])
  /* Connect observer to observables */
  useEffect(() => {
    if(!observer) return
    const html_observables = document.querySelectorAll(".Observable")
    html_observables.forEach((observable) => {
      observer.observe(observable)
    })
  }, [observer])

  /* set how many datasets to actually load depending on intersection observer.
     Observer sees how far webpage is scrolled down
  */
  useEffect(() => {
    if(total_datasets.length <= current_dataset_index) return
    setActual(total_datasets.slice(0, current_dataset_index + 1))
  }, [total_datasets, current_dataset_index])
  // style={{background: "orange", transition: "background 1s linear"}}
  return (
    <div className="App">
      <div style={{position: "fixed", top: 0, width: "100%", height: "100%"}}>
        <div className="background-top" style={{width: "100%", height: "0%",transistion: "height 1s", background: "orange"}}></div>
        <div style={{width: "100%", height: "100%", background: "blue"}}></div>
      </div>

      <div style={{display: "flex", flexDirection: "column", alignItems: "center", position: "sticky", top: "0%", float: "left", width: "100%", height: "100%"}}>
      
        <h1 style={{fontFamily: "Helvetica"}}>Water Levels in California Counties Over Time</h1>
        <div style={{ width: "60%"}}>
          <Chart water_dataset={actual_datasets}/>
        </div>
        
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center", width: "60%", height: "100%", padding: "10px"}}>
          <div style={{marginRight: 10}}>
            <EveryDecadeButton setIncrement={setIncrement}/>
            <EveryFiveYearButton setIncrement={setIncrement} />
          </div>
          <MonthPicker setMonth={setMonth}/>
        </div>
      </div> 
      
      {array_of_observables}
      
    </div>
  )
}

export default App
