import React, { useState, useEffect } from 'react';
import '../style.css';
import { Link, useNavigate } from 'react-router-dom';





const Sidebar = () => {
    useEffect(() => {
        getData()
      }, []);

      const [range,setRange] = useState([0,10])
      const [cities, setCities] = useState([])
      const [toRender, setToRender] = useState([])
      const [slicedCities,setSlicedCities] = useState([{id:1,name:'Loading'}])
      let navigate = useNavigate()

      async function getData(){
        const response = await fetch("/indexedCities.json")
        const data = await response.json()
        setCities(data)
        setToRender(data)
        setSlicedCities(data.slice(0,10))
    }
    
        const getNext = () =>{
            if(range[1]< toRender.length){
                const newRange = range.map(i=>i+10)
                setSlicedCities(toRender.slice(newRange[0],newRange[1]))
                setRange(newRange)
            }
        }

        const getPrev = () =>{
            if(range[0]!==0){
                const newRange = range.map(i=>i-10)
                setSlicedCities(toRender.slice(newRange[0],newRange[1]))
                setRange(newRange)
           }
        }

       const getRandom = () => {
           const limit = cities.length
           const cityObject = cities[Math.floor(Math.random() * limit) + 1]
           const pageParams = {state:cityObject}
           const path = '/city/' + pageParams.state.id
           navigate(path, pageParams)
       }
     
    return (
        <div className='sidebar'>
            <div className="container">
                <div className='search'>
                    <input  onChange={event => {

                        const input = event.target.value.toLowerCase()
                        const newRange = [0,10]
                        if(input.length > 2){
                            const matchingTerms = cities.filter(i=>i.name.toLowerCase().includes(input))
                            setRange(newRange)
                            setToRender(matchingTerms)
                            setSlicedCities(matchingTerms.slice(newRange[0],newRange[1]))
                        }else{
                            setToRender(cities)
                            setSlicedCities(toRender.slice(range[0],range[1]))
                            }
                        }
                    }

                     type="text" />
                </div>
                <div className='results'>
                    <ul>
                      {slicedCities.map(i=><li key={i.id}><Link to={'/city/'+ i.id}state={i}>{i.name}</Link></li>)}
                    </ul>
                    <div className='nav'>
                        <span onClick={getPrev}> Prev </span>
                        <span onClick={getNext}> Next </span>
                        <span onClick={getRandom}> Random </span>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
