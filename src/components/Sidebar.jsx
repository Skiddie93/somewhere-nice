import React, { useState, useEffect } from 'react';
import '../style.css';
import { Link, useNavigate } from 'react-router-dom';
import Filter from './Filter';

const pageLength = 12

const Sidebar = (props) => {

    useEffect(() => {
        getData(cities)
      }, [props.cities]);

    const [range,setRange] = useState([0,pageLength])
    const cities = props.cities
    const [toRender, setToRender] = useState([])
    const [slicedCities,setSlicedCities] = useState([])
    const navigate = useNavigate()

      async function getData(data){
    
        setToRender(data)
        setSlicedCities(data.slice(0,pageLength))
    }
    
        const getNext = () =>{
            if(range[1]< toRender.length){
                const newRange = range.map(i=>i+pageLength)
                setSlicedCities(toRender.slice(newRange[0],newRange[1]))
                setRange(newRange)
            }
        }

        const getPrev = () =>{
            if(range[0]!==0){
                const newRange = range.map(i=>i-pageLength)
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

       const search = (event) => {
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
    
       
      
    return (
        <div className='sidebar-wrapper'>
            <div className='sidebar'>
                <div className="container">
                    <div className='search'>
                        <input 
                        placeholder='Search'  
                        onChange={search} 
                        type="text" />
                    </div>
                    <div className='results'>
                        <ul>
                          {slicedCities.map(i=><li key={i.id}><Link to={'/city/'+ i.id}state={i}>{i.name}</Link></li>)}
                        </ul>
                        </div>
                        <div className='nav'>
                            <span><img onClick={getPrev} src="/nav/arrow_back.svg" alt="" />
                            <img onClick={getNext} src="/nav/arrow_next.svg" alt="" /> </span>
                            <span><img class="larger-svg" onClick={getRandom} src="/nav/random.svg" alt="" /></span>   
                        </div>

                    <Filter 
                        filter={props.filter}
                        filterHandler={props.filterHandler}
                    />   
                    
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
