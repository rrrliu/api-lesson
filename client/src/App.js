import React, { useState, useEffect } from 'react';
import Visualization from './Visualization'
import './App.css';

function App() {

  useEffect(() => {
    // TODO: Fetch all our saved visualizations
  })

  const addEntry = () => {
    const entry = {
      state: state,
      days: days,
    }
    setEntries([entry, ...entries])
    // TODO: Save this visualization somewhere
  }

  const displayEntries = () => {
    const output = []
    entries.forEach(e => {
      output.push(<Visualization state={e.state} days={e.days}/>)
    })
    return output
  }

  const [entries, setEntries] = useState([])
  const [state, setState] = useState("")
  const [days, setDays] = useState("")

  return (
    <div className="App">
      <h1>Visualizations</h1>
      <div>
        <input type="text" placeholder="state" onChange={e => setState(e.target.value)} />
      </div>
      <div>
        <input type="text" placeholder="# of days" onChange={e => setDays(e.target.value)} />
      </div>
      <button onClick={addEntry} className="add">Add Visualization</button>
      <div>
        {displayEntries()}
      </div>
    </div>
  );
}

export default App;
