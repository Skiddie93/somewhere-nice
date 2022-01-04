import './style.css';
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Place from './components/Place';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  useEffect(() => {
    getData()
  }, []);

  const [cities, setCities] = useState([])

  async function getData(){
    const response = await fetch("/indexedCities.json")
    const data = await response.json()
    setCities(data)
}




  return (
    <div className='main'>
      
    <Router>
      <Sidebar 
      cities={cities} 
      />
      <Routes>
        <Route path="/city/:id" element={<Place />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
