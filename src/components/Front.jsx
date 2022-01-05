import React from 'react';
import { useNavigate } from 'react-router';

const Front = (props) => {
   const navigate = useNavigate()
    const cities = props.cities

   const getRandom = () =>{
    const limit = cities.length
    const cityObject = cities[Math.floor(Math.random() * limit) + 1]
    const pageParams = {state:cityObject}
    const path = '/city/' + pageParams.state.id
    navigate(path, pageParams)
   }

    return (
        <div className='place center-flex'>
            <div onClick={getRandom} className='tmsn'>
               <span>Take me somewhere nice</span>
            </div>
        </div>
    );
}

export default Front;
