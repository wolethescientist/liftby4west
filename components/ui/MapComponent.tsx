"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { RelayStage } from "@/lib/types";

// Fix leaflet default icon issue in React
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const carIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3204/3204085.png", // simple car icon
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Lagos coordinates
const homePos: [number, number] = [6.5244, 3.3792]; // Lagos Island (Home)
const airportPos: [number, number] = [6.5774, 3.3215]; // Murtala Muhammed (Airport)
const destPos: [number, number] = [9.0579, 7.4951]; // Abuja Central (Destination)
const destAirport: [number, number] = [9.0067, 7.2631]; // Nnamdi Azikiwe Airport

export default function MapComponent({ currentStage }: { currentStage: RelayStage }) {
  const [carPos, setCarPos] = useState<[number, number]>(homePos);

  useEffect(() => {
    if (currentStage === RelayStage.in_transit_to_airport) {
      // Animate car from home to airport
      let progress = 0;
      const interval = setInterval(() => {
        progress += 0.005; // speed
        if (progress > 1) progress = 1;
        const lat = homePos[0] + (airportPos[0] - homePos[0]) * progress;
        const lng = homePos[1] + (airportPos[1] - homePos[1]) * progress;
        setCarPos([lat, lng]);
        if (progress >= 1) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    } else if (currentStage === RelayStage.out_for_delivery) {
       // Animate car at destination
      let progress = 0;
      setCarPos(destAirport);
      const interval = setInterval(() => {
        progress += 0.005;
        if (progress > 1) progress = 1;
        const lat = destAirport[0] + (destPos[0] - destAirport[0]) * progress;
        const lng = destAirport[1] + (destPos[1] - destAirport[1]) * progress;
        setCarPos([lat, lng]);
        if (progress >= 1) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    } else if (currentStage === RelayStage.delivered) {
      setCarPos(destPos);
    } else if (currentStage === RelayStage.airport_handoff || currentStage === RelayStage.in_flight) {
      setCarPos(airportPos);
    } else {
      setCarPos(homePos);
    }
  }, [currentStage]);

  // Determine map center and zoom based on stage
  let center: [number, number] = [6.55, 3.35]; // Between home and airport
  let zoom = 12;
  
  if (currentStage === RelayStage.in_flight) {
    center = [7.7, 5.4]; // Between Lagos and Abuja
    zoom = 6;
  } else if (currentStage === RelayStage.destination_received || currentStage === RelayStage.out_for_delivery || currentStage === RelayStage.delivered) {
    center = [9.03, 7.37]; // Between Abuja Airport and City Center
    zoom = 12;
  }

  return (
    <div className="h-64 w-full rounded-2xl overflow-hidden border border-border/50 shadow-sm relative z-0">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: "100%", width: "100%", zIndex: 0 }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* Origin */}
        <Marker position={homePos}>
          <Popup>Pickup Location</Popup>
        </Marker>
        <Marker position={airportPos}>
          <Popup>Murtala Muhammed Airport</Popup>
        </Marker>
        <Polyline positions={[homePos, airportPos]} color="#1E3A8A" weight={4} dashArray="10, 10" />

        {/* Destination */}
        <Marker position={destAirport}>
          <Popup>Nnamdi Azikiwe Airport</Popup>
        </Marker>
        <Marker position={destPos}>
          <Popup>Abuja Delivery Address</Popup>
        </Marker>
        <Polyline positions={[destAirport, destPos]} color="#1E3A8A" weight={4} dashArray="10, 10" />

        {/* Moving Car */}
        {(currentStage === RelayStage.in_transit_to_airport || currentStage === RelayStage.out_for_delivery) && (
          <Marker position={carPos} icon={carIcon} />
        )}

        {/* Flight Line */}
        {currentStage === RelayStage.in_flight && (
          <Polyline positions={[airportPos, destAirport]} color="#D97706" weight={4} dashArray="10, 10" />
        )}
      </MapContainer>
    </div>
  );
}
