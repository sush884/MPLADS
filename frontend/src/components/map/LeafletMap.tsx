"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { STATUS_HEX, type GeoHeatZone, type GeoPin } from "./types";

const TILE_LAYERS = {
  map: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Imagery &copy; Esri, Maxar, Earthstar Geographics"
  }
} as const;

export interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  pins: GeoPin[];
  heatZones: GeoHeatZone[];
  activePinId?: string;
  showHeatmap: boolean;
  basemap: "map" | "satellite";
}

export default function LeafletMap({
  center,
  zoom,
  pins,
  heatZones,
  activePinId,
  showHeatmap,
  basemap
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const heatLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const pinsLayerGroupRef = useRef<L.LayerGroup | null>(null);

  // 1. Initialize Map instance once
  useEffect(() => {
    if (!containerRef.current) return;

    // Defend against React 18 Strict Mode and HMR re-mounts
    if ((containerRef.current as any)._leaflet_id) {
      delete (containerRef.current as any)._leaflet_id;
    }

    const map = L.map(containerRef.current, {
      center,
      zoom,
      scrollWheelZoom: false
    });
    mapRef.current = map;

    const tiles = TILE_LAYERS[basemap];
    const tileLayer = L.tileLayer(tiles.url, { attribution: tiles.attribution }).addTo(map);
    tileLayerRef.current = tileLayer;

    heatLayerGroupRef.current = L.layerGroup().addTo(map);
    pinsLayerGroupRef.current = L.layerGroup().addTo(map);

    const onResize = () => map.invalidateSize();
    const timer = setTimeout(onResize, 250);
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      map.remove();
      mapRef.current = null;
      tileLayerRef.current = null;
      heatLayerGroupRef.current = null;
      pinsLayerGroupRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Basemap update
  useEffect(() => {
    if (!tileLayerRef.current) return;
    const tiles = TILE_LAYERS[basemap];
    tileLayerRef.current.setUrl(tiles.url);
  }, [basemap]);

  // 3. Center and Zoom update
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setView(center, zoom);
  }, [center, zoom]);

  // 4. Heat zones update
  useEffect(() => {
    if (!heatLayerGroupRef.current) return;
    heatLayerGroupRef.current.clearLayers();

    if (showHeatmap && heatZones.length > 0) {
      heatZones.forEach((zone) => {
        const color = zone.intensity === "high" ? "#dc2626" : "#d97706";
        const circle = L.circle([zone.lat, zone.lng], {
          radius: zone.radiusMetres,
          color,
          fillColor: color,
          fillOpacity: zone.intensity === "high" ? 0.28 : 0.18,
          weight: 1,
          opacity: 0.4
        });
        if (zone.label) {
          circle.bindTooltip(zone.label);
        }
        heatLayerGroupRef.current?.addLayer(circle);
      });
    }
  }, [showHeatmap, heatZones]);

  // 5. Pins update
  useEffect(() => {
    if (!pinsLayerGroupRef.current) return;
    pinsLayerGroupRef.current.clearLayers();

    pins.forEach((pin) => {
      const isActive = pin.id === activePinId;
      const marker = L.circleMarker([pin.lat, pin.lng], {
        radius: isActive ? 9 : 6,
        color: "#ffffff",
        weight: isActive ? 3 : 2,
        fillColor: STATUS_HEX[pin.status] || "#3b82f6",
        fillOpacity: 1
      });

      if (pin.label || pin.code) {
        const content = `
          <div style="min-width: 180px; font-family: sans-serif;">
            ${pin.label ? `<p style="font-size: 12px; font-weight: 700; color: #1e293b; margin: 0 0 2px;">${pin.label}</p>` : ""}
            ${pin.sublabel ? `<p style="font-size: 11px; color: #64748b; margin: 0 0 4px;">${pin.sublabel}</p>` : ""}
            ${pin.code ? `<p style="font-size: 10px; font-family: monospace; color: #94a3b8; margin: 0 0 4px;">${pin.code}</p>` : ""}
            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${STATUS_HEX[pin.status] || "#3b82f6"};"></span>
              <span style="font-weight: 600; color: #475569;">${pin.status}</span>
              ${typeof pin.aiScore === "number" ? `<span style="color: #64748b;">· AI Score: ${pin.aiScore}</span>` : ""}
            </div>
          </div>
        `;
        marker.bindPopup(content);
      }

      pinsLayerGroupRef.current?.addLayer(marker);
    });
  }, [pins, activePinId]);

  return <div ref={containerRef} className="h-full w-full z-0" />;
}
