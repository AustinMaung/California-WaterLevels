import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    function fetchData() {
      const test = new URL("http://localhost:3000/test")
      fetch(test, {method: 'GET', mode: 'cors'})
      .then((res) => res.text())
      .then((text) => console.log(text))
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
