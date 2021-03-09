
import React, {useState} from 'react'
import {GoogleMap,InfoWindow,Marker, useLoadScript} from "@react-google-maps/api"

import './App.css'


//importing maps styles from mapsstyles
import mapsStyle from './mapsStyles'


//importing flower bouquet for markup icon
import Bouquet from './assets/bouquet.png'

import {ReactComponent as Lady} from './assets/women.svg'



//imoprting formate date from date fns
import {formatRelative} from 'date-fns'

const libraries = ["places"];

const option = {
 styles : mapsStyle,
 disableDefaultUI: true,
};





const center = {
    lat: 30.212919,
    lng: 74.933167,
}


const mapstyles = {
    width: '100vw',
    height: '100vh'
}

function App() {


    
    
    const [Markers, setMarker] = useState([]);

    const [selected, setSelected] = useState(null);

    const onMapClick = React.useCallback((event) => {
        setMarker((current) => [
            ...current, 
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);


    const mapRef = React.useRef();

    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [] )

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyCV3ZITHh4mouHZxoLh7sliwbuQvCzRZ-0",
         libraries,
    });

    if(loadError) return "error loaded maps";

    if(!isLoaded) return "Loading Maps";



    return (
        <div className='App'>
            <div className='main-heading-wrapper'>
                <span className='logo-text'>Miss</span>
                <span className='logo-wrapper'><Lady className='logo'/></span>
            </div>
            <GoogleMap 
            mapContainerStyle={mapstyles} 
            zoom={18} 
            center={center} 
            options={option}
            onClick={onMapClick}
            onLoad={onMapLoad}
            >

                {Markers.map(marker => <Marker 
                key={marker.time.toISOString()}
                 position={{lat: marker.lat, lng: marker.lng}}
                 icon={{
                      url: Bouquet, 
                      scaledSize: new window.google.maps.Size(20,20), 
                      origin: new window.google.maps.Point(0,0), 
                      anchor: new window.google.maps.Point(10,10)}}
                      onClick={() => {setSelected(marker)}}
                  />)}
                  {selected ? (<InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={() => {setSelected(null)}}>
                       <div>
                           <h1>Got a Chick</h1>
                           <p>
                               Chick {formatRelative(selected.time, new Date())} 
                           </p>
                       </div>
                  </InfoWindow>): null}
            </GoogleMap>
        </div>
    )
}




export default App
