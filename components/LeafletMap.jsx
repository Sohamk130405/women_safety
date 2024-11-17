"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

export default function LeafletMap({ locations, session }) {
  useEffect(() => {
    if (!locations || locations.length === 0) return;

    // Fix for Leaflet icon issue in Next.js
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "/location.png",
      iconSize: [50, 50], // size of the icon
    });

    const map = L.map("map").setView(
      [locations[0]?.latitude || 0, locations[0]?.longitude || 0],
      14
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const routeLatLngs = locations.map((point) => [
      point.latitude,
      point.longitude,
    ]);
    L.polyline(routeLatLngs, { color: "red" }).addTo(map);

    if (session.is_sos_triggered && locations.length > 0) {
      L.marker([session.latitude, session.longitude])
        .addTo(map)
        .bindPopup("SOS Location")
        .openPopup();
    } else {
      L.marker([
        locations[locations.length - 1].latitude,
        locations[locations.length - 1].longitude,
      ])
        .addTo(map)
        .bindPopup("Current Location")
        .openPopup();
    }

    return () => {
      map.remove();
    };
  }, [locations, session]);

  return <div id="map" className="h-96 w-full rounded-lg"></div>;
}
