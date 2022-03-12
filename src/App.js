import './style.css';
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Place from './components/Place';
import Front from './components/Front';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  useEffect(() => {
    getData()
  }, []);

 

  const [filter, setFilter] =useState(JSON.parse(localStorage.getItem('filter')) || {
    "commercial": {
      "checked": false,
      "name": "commercial"
    },
    "catering": {
      "checked": true,
      "name": "catering"
    },
    "accommodation": {
      "checked": true,
      "name": "accommodation"
    },
    "education": {
      "checked": false,
      "name": "education"
    },
    "entertainment": {
      "checked": false,
      "name": "entertainment"
    },
    "healthcare": {
      "checked": false,
      "name": "healthcare"
    },
    "leisure": {
      "checked": false,
      "name": "leisure"
    },
    "natural": {
      "checked": false,
      "name": "natural"
    },
    "national_park": {
      "checked": false,
      "name": "national_park"
    },
    "heritage": {
      "checked": false,
      "name": "heritage"
    },
    "tourism": {
      "checked": false,
      "name": "tourism"
    },
    "public_transport": {
      "checked": false,
      "name": "public_transport"
    },
    "parking": {
      "checked": false,
      "name": "parking"
    }
  })
  const [cities, setCities] = useState([{id:1,name:'Loading'}])

  async function getData(){
    const response = await fetch("/indexedCities.json")
    const data = await response.json()
    setCities(data)
}

const filterHandler = (event) => {
  const item = event.target.name
  const {...filterClone} = filter
  filterClone[item].checked = !filterClone[item].checked
  setFilter(filterClone)
  localStorage.setItem("filter",JSON.stringify(filterClone));
}

  return (
    <div className='main'>
      
    <Router>
      <Sidebar 
      cities={cities}
      filter={filter}
      filterHandler={filterHandler}
      />
      <Routes>
      <Route path="/" element={<Front 
      cities={cities} 
      />} 
      />
        <Route path="/city/:id" element={<Place
         filter={filter}
        />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
