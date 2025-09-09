import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface MapProps {
  buses?: Array<{
    id: string;
    location: string;
    coordinates: [number, number];
    speed: string;
    direction: string;
  }>;
}

const Map: React.FC<MapProps> = ({ buses = [] }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.006, 40.7128], // Default to NYC
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      setIsMapInitialized(true);
    });

    return () => {
      map.current?.remove();
    };
  };

  // Add bus markers
  useEffect(() => {
    if (!map.current || !isMapInitialized) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    buses.forEach((bus) => {
      const el = document.createElement('div');
      el.className = 'w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold text-primary-foreground';
      el.textContent = bus.id;

      const marker = new mapboxgl.Marker(el)
        .setLngLat(bus.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold">Bus ${bus.id}</h3>
                <p class="text-sm">${bus.location}</p>
                <p class="text-xs text-gray-600">${bus.speed} • ${bus.direction}</p>
              </div>
            `)
        )
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [buses, isMapInitialized]);

  if (!isMapInitialized && !mapboxToken) {
    return (
      <div className="relative h-80 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
        <div className="text-center space-y-4 p-6 max-w-md">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
            <MapPin className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Enter Mapbox Token</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get your free token from{' '}
              <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                mapbox.com
              </a>
            </p>
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIi..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="text-sm"
              />
              <Button 
                onClick={initializeMap}
                disabled={!mapboxToken}
                className="w-full"
              >
                Initialize Map
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-80 rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      {!isMapInitialized && mapboxToken && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;