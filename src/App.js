import React, { Fragment, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import EstablishmentService from './services/establishment_service';
import StoreService from './services/store.js';

import Establishment from './components/Establishment';
import NearstCoffees from './components/NearstCoffees';

function App() {
  const { REACT_APP_GOOGLE_KEY } = process.env;

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    setCurrentLocation();
  }, []);

  useEffect(() => {
    setCurrentLocation();
  }, [longitude]);

  async function setCurrentLocation() {
    try {
      await navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        loadCoffeShops();
      });
    } catch (error) {
      alert('Habilite a localização para utilizar o aplicativo!');
    }
  }

  async function loadCoffeShops() {
    const response = await EstablishmentService.index(latitude, longitude);
    setLocations(response.data.results);
  }

  return (
    <Fragment>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_KEY}>
        <GoogleMap mapContainerStyle={{height:"100vh", width:"100%"}}
                   zoom={15}
                   center={(selected.geometry) ? undefined : { lat: latitude, lng: longitude }}
        >
        {
          locations.map((item, index) => {
            return(
              <Marker key={index} icon='/images/coffee-pin.png' title={item.name} animation='4' 
                position={{lat: item.geometry.location.lat, lng: item.geometry.location.lng}}
                onClick={() => setSelected(item)}
              />
            )
          })
        }
        {
           selected.place_id && (
             <Establishment place={selected} />
          )
        }
        <Marker key="my_location" icon='/images/my-location-pin.png' title='Seu local' animation='2' 
          position={{lat: latitude, lng: longitude}}
        />
        {
          (latitude != 0 && longitude != 0) &&
          <NearstCoffees setSelected={setSelected} latitude={latitude} longitude={longitude} />
        }
        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
}

export default App;
