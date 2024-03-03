import { MapContainer } from "react-leaflet/MapContainer";
import { Marker, Popup } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";

import "leaflet/dist/leaflet.css";

export default function MapLocator({ latitude, longitude, name }) {
  const position = [latitude, longitude];
  return (
    <>
      <MapContainer
        center={position}
        zoom={15}
        dragging={false}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{
          width: "100%",
          height: "calc(100vh - 2rem)",
          margin: "auto",
          marginTop: "1.7rem",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
