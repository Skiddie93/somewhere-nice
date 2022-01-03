import React, { useState, useEffect } from 'react';
import '../style.css';
import { Link } from 'react-router-dom';



const Sidebar = () => {
    useEffect(() => {
        getData()
      }, []);

      const [range,setRange] = useState([0,10])
      const [cities, setCities] = useState([])
      const [slicedCities,setSlicedCities] = useState([{id:1,name:'Loading'}])

      async function getData(){
        const response = await fetch("./indexedCities.json")
        const data = await response.json()
     
        setCities(data)
        setSlicedCities(data.slice(0,10))
    }
    
        const getNext = () =>{
            if(range[1]< cities.length){
                const newRange = range.map(i=>i+10)
                setSlicedCities(cities.slice(newRange[0],newRange[1]))
                setRange(newRange)
            }
        }
        const getPrev = () =>{
            if(range[0]!=0){
                const newRange = range.map(i=>i-10)
                setSlicedCities(cities.slice(newRange[0],newRange[1]))
                setRange(newRange)
           }
        }
        console.log(range)
    return (
        <div className='sidebar'>
            <div className="container">
                <div className='search'>
                    <input type="text" />
                </div>
                <div className='results'>
                    <ul>
                      {slicedCities.map(i=><li key={i.id}> <Link to={'/'+ i.id}state={i}>{i.name}</Link></li>)}
                    </ul>
                    <br />
                    <br />
                    <div className='nav'>
                        <span onClick={getPrev}> Prev </span>
                        <span onClick={getNext}> Next </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
