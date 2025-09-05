import { Bus, Clock, Users, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function BusRoutes() {
  const busRoutes = [
    {
      id: "23",
      name: "Downtown Express",
      status: "On Time",
      nextArrival: "3 min",
      passengers: 45,
      capacity: 60,
      stops: ["City Center", "Mall Plaza", "University", "Airport"],
      color: "bg-primary",
    },
    {
      id: "15",
      name: "Suburban Line",
      status: "Delayed",
      nextArrival: "8 min",
      passengers: 28,
      capacity: 50,
      stops: ["Residential", "School District", "Shopping Center"],
      color: "bg-accent",
    },
    {
      id: "42",
      name: "Night Service",
      status: "On Time",
      nextArrival: "12 min",
      passengers: 15,
      capacity: 40,
      stops: ["Downtown", "Hospital", "Train Station"],
      color: "bg-purple-500",
    },
    {
      id: "08",
      name: "Metro Connect",
      status: "On Time",
      nextArrival: "5 min",
      passengers: 52,
      capacity: 70,
      stops: ["Central Hub", "Business District", "Park Avenue"],
      color: "bg-green-500",
    },
    {
      id: "31",
      name: "Campus Shuttle",
      status: "On Time",
      nextArrival: "7 min",
      passengers: 35,
      capacity: 45,
      stops: ["University Gate", "Library", "Student Center", "Dorms"],
      color: "bg-blue-500",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Time":
        return "bg-green-100 text-green-800";
      case "Delayed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOccupancyColor = (passengers: number, capacity: number) => {
    const ratio = passengers / capacity;
    if (ratio > 0.8) return "bg-red-500";
    if (ratio > 0.6) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Active Bus Routes</h2>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {busRoutes.length} routes active
        </Badge>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4">
          {busRoutes.map((route) => (
            <Card
              key={route.id}
              className="flex-shrink-0 w-80 shadow-medium hover:shadow-large transition-shadow cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full ${route.color} flex items-center justify-center`}>
                        <Bus className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Bus {route.id}</h3>
                        <p className="text-sm text-muted-foreground">{route.name}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(route.status)}>
                      {route.status}
                    </Badge>
                  </div>

                  {/* Next Arrival */}
                  <div className="flex items-center space-x-2 p-3 rounded-lg bg-gradient-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      Next arrival: {route.nextArrival}
                    </span>
                  </div>

                  {/* Occupancy */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {route.passengers}/{route.capacity} passengers
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-muted"></div>
                      <div className="w-2 h-2 rounded-full bg-muted"></div>
                      <div className={`w-2 h-2 rounded-full ${getOccupancyColor(route.passengers, route.capacity)}`}></div>
                    </div>
                  </div>

                  {/* Route Stops */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Route Stops</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {route.stops.map((stop, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {stop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}