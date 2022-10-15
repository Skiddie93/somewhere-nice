import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import Accordion from './parts/Accordion';
import Category from './Category';
import Tmsn from './Tmsn';

const Place = (props) => {
    const [isFetched, setIsFetched] = useState(false)
    const [places, setPlaces] = useState([])
    const [hasItems, setHasItems] = useState(false)
    const linkProp = useLocation().state
    const cities = props.cities
    const sidebarMode = props.sidebarMode

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
        setIsFetched(false)
        placesRequest()
        
    },[linkProp,props.filter])
    
    
    return (
        <div className='place'>

            <Tmsn 
            objectSet={cities}
            extraClass="floating"
            sidebarMode= {sidebarMode}
            />

            <h1 className="town-name">{linkProp.name}</h1>
            <iframe title="googleMap" className="map_iframe" loading="lazy" allowFullScreen src={`https://www.google.com/maps/embed/v1/place?q=${geoLocation}&key=AIzaSyBUWGiVdxFtFNYjY2-45YFo4WWsxv4Yfu4&maptype=satellite`}></iframe>
            <div className='poi'>
                {isFetched
                ? places.map(object=>{
                    const items = object[1].features
                    const categoryName = object[0].replace('_', ' ')
                   
                    return(
                    
                    <Category 
                    key={categoryName}
                    categoryName= {categoryName}
                    items = {items}
                    />
                        
                    )
                })
                
            
                :(<p>Loading</p>)}
            </div>

        </div>
    );
}

export default Place;
