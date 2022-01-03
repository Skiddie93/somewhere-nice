import React from 'react';
import { useLocation } from 'react-router';

const Place = () => {
    const linkProp = useLocation().state
    const geoLocation = linkProp.lat + "%2C%20" + linkProp.lng


    return (
        <div className='place'>
             <h1>{linkProp.name}</h1>
            <iframe title="googleMap" width="75%" height="500" loading="lazy" allowfullscreen src={`https://www.google.com/maps/embed/v1/place?q=${geoLocation}&key=AIzaSyBUWGiVdxFtFNYjY2-45YFo4WWsxv4Yfu4&maptype=satellite`}></iframe>
        </div>
    );
}

export default Place;
