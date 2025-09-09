import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
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
  const map = useRef<google.maps.Map | null>(null);
  const [googleMapsToken, setGoogleMapsToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const initializeMap = async () => {
    if (!mapContainer.current || !googleMapsToken) return;

    try {
      const loader = new Loader({
        apiKey: googleMapsToken,
        version: 'weekly',
      });

      await loader.load();
      
      map.current = new google.maps.Map(mapContainer.current, {
        center: { lat: 40.7128, lng: -74.006 }, // Default to NYC
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      setIsMapInitialized(true);
    } catch (error) {
      console.error('Error loading Google Maps:', error);
    }
  };

  // Add bus markers
  useEffect(() => {
    if (!map.current || !isMapInitialized) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    buses.forEach((bus) => {
      const marker = new google.maps.Marker({
        position: { lat: bus.coordinates[1], lng: bus.coordinates[0] },
        map: map.current!,
        title: `Bus ${bus.id}`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: 'hsl(var(--primary))',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        },
        label: {
          text: bus.id,
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
        },
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold">Bus ${bus.id}</h3>
            <p class="text-sm">${bus.location}</p>
            <p class="text-xs text-gray-600">${bus.speed} • ${bus.direction}</p>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map.current!, marker);
      });

      markersRef.current.push(marker);
    });
  }, [buses, isMapInitialized]);

  if (!isMapInitialized && !googleMapsToken) {
    return (
      <div className="relative h-80 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
        <div className="text-center space-y-4 p-6 max-w-md">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
            <MapPin className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Enter Google Maps API Key</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get your free API key from{' '}
              <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google Cloud Console
              </a>
            </p>
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="AIzaSyA..."
                value={googleMapsToken}
                onChange={(e) => setGoogleMapsToken(e.target.value)}
                className="text-sm"
              />
              <Button 
                onClick={initializeMap}
                disabled={!googleMapsToken}
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
      {!isMapInitialized && googleMapsToken && (
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