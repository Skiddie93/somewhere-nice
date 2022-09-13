import React from 'react';
import Tmsn from './parts/Tmsn';

const Front = (props) => {
 
    const cities = props.cities
    const draggable = false

    return (
        <div className='place center-flex'>
           <Tmsn
            objectSet = {cities}
            dragable = {draggable}
           />
        </div>
    );
}

export default Front;
