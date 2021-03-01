import { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import mapStyles from "./mapStyles";

function MapContainer(props) {
  const [markers, setMarkers] = useState([
    { latitude: 40.710992, longitude: -74.008292 },
    { latitude: 40.792917, longitude: -73.969497 },
    { latitude: 40.710992, longitude: -75.008292 },
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onLocationSuccess, error);
  }, []);

  function onLocationSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
    setMarkers([
      ...markers,
      {
        longitude,
        latitude,
      },
    ]);
  }

  function error() {
    console.log("error");
  }

  function handleMarkerClick() {
    console.log("You clicked me!");
  }

  function displayMarkers() {
    return markers.map((mark, index) => {
      return (
        <Marker
          key={index}
          position={{
            lat: mark.latitude,
            lng: mark.longitude,
          }}
          onClick={handleMarkerClick}
        />
      );
    });
  }
  return (
    <Map
      styles={mapStyles}
      google={props.google}
      initialCenter={{ lat: 40.7812, lng: -73.9665 }}
      zoom={10}
    >
      {displayMarkers()}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDt0QbHtczioyT77M0Bq8SxdvAuPHJcsOo",
})(MapContainer);
