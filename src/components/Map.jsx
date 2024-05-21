import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import config from '../config';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 13.736717, // ละติจูดของกรุงเทพมหานคร
  lng: 100.523186 // ลองจิจูดของกรุงเทพมหานคร
};


const locations = [
  { id: 1, position: { lat: 18.7972579, lng: 98.9540093 }, content: "มหาวิทยาลัยเชียงใหม่" },
  { id: 2, position: { lat: 18.5168634, lng: 99.1126321 }, content: "ศูนย์การศึกษามหาวิทยาลัยเชียงใหม่ หริภุญไชย" },
  { id: 3, position: { lat: 18.7587873, lng: 98.9363491 }, content: "ศูนย์การศึกษามหาวิทยาลัยเชียงใหม่ แม่เหียะ" },
  { id: 4, position: { lat: 13.5423696, lng: 100.2555078 }, content: "ศูนย์การศึกษามหาวิทยาลัยเชียงใหม่ สมุทรสาคร" },
  { id: 5, position: { lat: 18.7912788, lng: 98.96721 }, content: "ศูนย์การศึกษามหาวิทยาลัยเชียงใหม่ สวนดอก" },
];

function Map() {
  const [mapKey, setMapKey] = useState(null);
  const [faculty,setFaculty] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const res = await axios.get(config.urlApi + "/googlemapkey");
      const res1 = await axios.get(config.urlApi + "/place/showFaculty");
      setMapKey(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  const keyapi = 'AIzaSyDGCeNt10W2VmFltZC-vARnDltrKjtBQos';

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: keyapi
  });

  const [map, setMap] = useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);

  const onLoad = (map) => {
    map.panTo(center); // ย้ายมุมมองแผนที่ไปที่ตำแหน่งเชียงใหม่
    map.setZoom(6); // ตั้งระดับการซูม
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const toggleInfoWindow = () => {
    setInfoWindowOpen(!infoWindowOpen);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ ...containerStyle, borderRadius: '20px' }}
      center={center}
      zoom={6}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {locations.map(location => (
        <Marker
          key={location.id}
          position={location.position}
          onClick={toggleInfoWindow}
        >
          {infoWindowOpen && (
            <InfoWindow
              position={location.position}
              onCloseClick={toggleInfoWindow}
            >
              <div>
                <p>{location.content}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  ) : <></>;
}

export default React.memo(Map);
