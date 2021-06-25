import React,{useEffect, useState} from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "../../util";


function Map({ countries, casesType, center , isDark }) {

  const [map, setMap] = useState(null);
useEffect(() => {
if(map) 
{
  map.flyTo(center,5);
}
},[center]);

  return (
    <div className={` map ${ isDark ? "map-dark" : "map-light"}`}>
      <LeafletMap center={{lat: 34.80746, lng: -40.4796}} zoom={3} whenCreated = {map => setMap(map)}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
