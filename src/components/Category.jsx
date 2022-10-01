import React from 'react';
import Accordion from './parts/Accordion';
import { useState, useEffect } from 'react';

const Category = (props) => {

    const items = props.items
    const categoryName= props.categoryName
    const [hasItems, setHasItems] = useState(false)
    useEffect(()=>{
       setHasItems(false)
    },[props])

    

    const noItems = () =>{
        if(hasItems==false){
            return(
            <div className="accordion no-items">
            <div className="title">
                <span className="place-name">No Places to show</span> 
            </div>
            </div>
            )
        }
    }

    
    return (
        <div id="category" className='category'>
        <h1>{categoryName}</h1>
    
        {items.map((item,index)=>{
            const placeName = item.properties.name
            const placeStreet = item.properties.address_line2 ?? ""
           
          

            if(placeName) {
                if(!hasItems) setHasItems(true)
                return(
                <Accordion
                    key={index}
                    title={placeName}
                    content={{
                    address: placeStreet,
                    }}
                />
            )}

                    }
            )}

                {noItems()}
    </div>
    );
}

export default Category;
