import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

const Place = () => {
    const startObj = {
        catering: [],
        accommodation: [],
        entertainment: []
    }
    let [places, setPlaces] = useState(startObj)
    const linkProp = useLocation().state
    useEffect(()=>{
        placesRequest()
   
    },[linkProp])
    
    const geoLocation = linkProp.lat + "%2C%20" + linkProp.lng
    const apiKey= 'f79827c3db7a4e58b07599601ca7d471'
    const location = linkProp.lng +','+ linkProp.lat
    const geoapifyRequest = 'https://api.geoapify.com/v2/places?categories=accommodation,entertainment,catering&filter=circle:'+location+',5000&bias=proximity:'+location+'&limit=20&apiKey='+apiKey
    
     const placesRequest = async () =>{
         places = {
            catering: [],
            accommodation: [],
            entertainment: []
        }

        const promise = await fetch(geoapifyRequest)
        const data = await promise.json()
        for(let i of data.features){
            let item = i.properties
            item.categories.map(j =>{
                if(places.hasOwnProperty(j) && item.hasOwnProperty('name')){
                    places[j].push(i)
             }
            })
        }
        setPlaces(places)
    } 
    
    const isEmpty = (array) => array.length>0


    return (
        <div className='place'>
            <h1>{linkProp.name}</h1>
            <iframe title="googleMap" width="100%" height="500" loading="lazy" allowFullScreen src={`https://www.google.com/maps/embed/v1/place?q=${geoLocation}&key=AIzaSyBUWGiVdxFtFNYjY2-45YFo4WWsxv4Yfu4&maptype=satellite`}></iframe>
            <div className='poi'>
                <div className="category">
                    {isEmpty(places.catering)?(places.catering.map(i => {
                        return(
                            <p>{i.properties.name}</p>
                        )
                    }))
                    :(<p>No catering facilities found</p>)}
                </div>
                <div className="category">
                    {isEmpty(places.accommodation)?(places.accommodation.map(i => {
                        return(
                            <p>{i.properties.name}</p>
                        )
                    }))
                    :(<p>No accommodation facilities found</p>)}
                </div>
                <div className="category">
                    {isEmpty(places.entertainment)?(places.entertainment.map(i => {
                        return(
                            <p>{i.properties.name}</p>
                        )
                    }))
                    :(<p>No catering entertainment found</p>)}
                </div>
            </div>
        </div>
    );
}

export default Place;
