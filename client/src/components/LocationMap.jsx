import {

  MapContainer,
  TileLayer,
  Marker,
  Popup

} from "react-leaflet";
import socket from "../services/socket";
import { useEffect, useState } from "react";

function LocationMap() {

  const [position, setPosition] =
    useState(null);


   useEffect(() => {

  const watchId =
    navigator.geolocation.watchPosition(

      (pos) => {

        const newPosition = [

          pos.coords.latitude,

          pos.coords.longitude
        ];

        setPosition(newPosition);

        socket.emit(
          "send-location",

          {
            latitude:
              pos.coords.latitude,

            longitude:
              pos.coords.longitude
          }
        );
      }
    );

  return () => {

    navigator.geolocation.clearWatch(
      watchId
    );
  };

}, []);

  

  if (!position) {

    return <h3>Loading Map...</h3>;
  }

  return (

    <div style={styles.container}>

      <h2>
        Your Live Location
      </h2>

      <MapContainer

        center={position}

        zoom={13}

        style={styles.map}
      >

        <TileLayer

          attribution='&copy; OpenStreetMap contributors'

          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>

          <Popup>
            You are here
          </Popup>

        </Marker>

      </MapContainer>

    </div>
  );
}

const styles = {

  container: {

    width: "90%",

    maxWidth: "700px"
  },

  map: {

    height: "400px",

    width: "100%",

    borderRadius: "10px"
  }
};

export default LocationMap;