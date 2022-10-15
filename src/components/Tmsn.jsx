import React from 'react';
import { useNavigate } from 'react-router';
import '../style.css';


const Tmsn = (props) => {

    const navigate = useNavigate()
    const objectSet = props.objectSet


    const getRandom = () =>{
        const limit = objectSet.length
        const cityObject = objectSet[Math.floor(Math.random() * limit) + 1]
        const pageParams = {
            state:cityObject
        }
        const path = '/city/' + pageParams.state.id
        navigate(path, pageParams)
       }

    return (
        <div onClick={getRandom} className={`tmsn ${props.extraClass?props.extraClass:""} ${props.sidebarMode?"show":""}`}>
        <img src="/somewhere-nice/nav/random.svg" />
     </div>
    );
}

export default Tmsn;
