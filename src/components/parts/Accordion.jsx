import React from 'react';
import { useState, useEffect } from 'react';
const Accordion = (props) => {

    const placeName = props.title ?? ""
    const placeStreet = props.content.address ?? ""
    const mapSearch = "https://www.google.com/maps/search/"+placeName + "+" + placeStreet

    const [isOpen,setIsOpen] = useState(0)
    useEffect(()=>{
        setIsOpen(0)
     },[props])
    

    const handleAccordion = (e) => {
       const parent = e.currentTarget.parentNode
       const contentHeight =  parent.getElementsByClassName('wrapper')[0].offsetHeight

       isOpen==0?setIsOpen(contentHeight):setIsOpen(0)
    }

    
    return (
        <div className="accordion">
            <div onClick={handleAccordion} className="title">
                <span className="place-name">{placeName?placeName:""}</span> 
                <span className={isOpen?"more open":"more"}></span> 
            </div>
            
            <div style={{height: isOpen}} className={"content"}>
            <hr/>
                <div  className="wrapper">
                    <p>{placeStreet}</p>
                    <a target="_blank" href={mapSearch}>Check it out</a>
                </div>
            </div>
        
        </div>
    );
}

export default Accordion;
