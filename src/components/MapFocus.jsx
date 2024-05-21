import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

function MapFocus({ address, latitude, longitude, detail, setLatitude, setLongitude }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDGCeNt10W2VmFltZC-vARnDltrKjtBQos"
  });

  const [markerPosition, setMarkerPosition] = useState({ lat: latitude, lng: longitude });
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
    setLatitude(lat);
    setLongitude(lng);
  };

  const toggleInfoWindow = () => {
    setIsInfoWindowOpen(!isInfoWindowOpen);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '500px', borderRadius: '20px' }}
      center={markerPosition}
      zoom={12}
    >
      <Marker
        position={markerPosition}
        draggable={true}
        onDragEnd={onMarkerDragEnd}
        onClick={toggleInfoWindow}
      >
        {isInfoWindowOpen && (
          <InfoWindow position={markerPosition} onCloseClick={toggleInfoWindow}>
            <div>
              <p>{detail}</p>
              <p>{address}</p>
              <p>Latitude: {markerPosition.lat}</p>
              <p>Longitude: {markerPosition.lng}</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  ) : <></>;
}

export default React.memo(MapFocus);
