import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)
  // "https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA,ORO,CLE,NML,SNL,DNP,BER&SensorNums=15&dur_code=M&Start=2022-01-01&End=2022-01-01"
  
  /* testing API call to CDEC Water API through server on loadup */
  useEffect(() => {
    //
    async function fetchData() {
      const test = new URL("http://localhost:3000/test") //path to server
      const res = await fetch(test)
      const text = await res.json()
      console.log(text)
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <h1>test2</h1>
    </div>
  )
}

export default App
