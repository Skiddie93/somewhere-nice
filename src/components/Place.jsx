import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

const Place = (props) => {
    const [isFetched, setIsFetched] = useState(false)
    const [places, setPlaces] = useState([])
    const linkProp = useLocation().state
    
    const geoLocation = linkProp.lat + "%2C%20" + linkProp.lng
    const apiKey= 'f79827c3db7a4e58b07599601ca7d471'
    const location = linkProp.lng +','+ linkProp.lat
    
    
     const placesRequest = async () =>{
        let requestDataObject = {}
        const filter = Object.entries(props.filter)
        const callCategories = filter.filter(categoryFilter=> categoryFilter[1].checked)
        .map(categoryName=>categoryName[0])

        for(let category of callCategories){
            const geoapifyRequest = 'https://api.geoapify.com/v2/places?categories='+category+'&filter=circle:'+location+',5000&bias=proximity:'+location+'&limit=10&apiKey='+apiKey
            const req = await fetch(geoapifyRequest)
            const data = await req.json()
            requestDataObject[category] = data
        }
        setIsFetched(true)
        setPlaces(Object.entries(requestDataObject))        
    } 

    useEffect(()=>{
        placesRequest()
   
    },[linkProp,props.filter])
    
    const isEmpty = (array) => array.length>0


    return (
        <div className='place'>
            <h1>{linkProp.name}</h1>
            <iframe title="googleMap" width="100%" height="500" loading="lazy" allowFullScreen src={`https://www.google.com/maps/embed/v1/place?q=${geoLocation}&key=AIzaSyBUWGiVdxFtFNYjY2-45YFo4WWsxv4Yfu4&maptype=satellite`}></iframe>
            <div className='poi'>
                {isFetched
                ? places.map(object=>{
                    
                    const items = object[1].features
                    return(
                        <div className='category'>
                            <h1>{object[0]}</h1>
                            {items.map(item=><p>{item.properties.name}</p>)}
                        </div>
                        
                    )
                })
                :(<p>Loading</p>)}
            </div>
        </div>
    );
}

export default Place;
