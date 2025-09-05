import { useState } from "react";
import { MapPin, Navigation, Zap, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LiveTracking() {
  const [isLoading, setIsLoading] = useState(false);
  
  const activeBuses = [
    { id: "23", location: "Main St & 5th Ave", speed: "35 km/h", direction: "North" },
    { id: "15", location: "University Campus", speed: "25 km/h", direction: "East" },
    { id: "42", location: "Downtown Terminal", speed: "0 km/h", direction: "Stopped" },
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Card className="col-span-full lg:col-span-2 shadow-large">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          Live Bus Tracking
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-100 text-green-800">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            Live
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Map Placeholder */}
        <div className="relative h-80 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
              <MapPin className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Interactive Map</h3>
              <p className="text-muted-foreground">
                Real-time bus locations would be displayed here
              </p>
            </div>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 rounded-full bg-primary animate-bounce"></div>
            </div>
          </div>
          
          {/* Simulated bus markers */}
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
        </div>

        {/* Active Buses Status */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center">
            <Zap className="h-4 w-4 mr-2 text-accent" />
            Currently Tracking ({activeBuses.length} buses)
          </h4>
          
          <div className="grid gap-3">
            {activeBuses.map((bus) => (
              <div
                key={bus.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">
                      {bus.id}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{bus.location}</p>
                    <p className="text-xs text-muted-foreground">
                      {bus.speed} • {bus.direction}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Navigation className="h-4 w-4 text-primary" />
                  <Button variant="ghost" size="sm">
                    Track
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}