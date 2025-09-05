import { useState } from "react";
import { Search, MapPin, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function SearchSection() {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  
  const recentSearches = [
    { from: "Downtown Station", to: "University Campus", time: "2 hours ago" },
    { from: "Airport", to: "City Center", time: "Yesterday" },
    { from: "Mall Plaza", to: "Residential Area", time: "2 days ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Main Search */}
      <Card className="shadow-medium">
        <CardContent className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Plan Your Journey</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
                <Input
                  placeholder="From (Current location)"
                  value={searchFrom}
                  onChange={(e) => setSearchFrom(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent h-4 w-4" />
                <Input
                  placeholder="To (Destination)"
                  value={searchTo}
                  onChange={(e) => setSearchTo(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            
            <Button className="w-full h-12 bg-gradient-primary text-primary-foreground font-medium">
              <Search className="mr-2 h-4 w-4" />
              Find Routes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Searches */}
      <Card className="shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foreground">Recent Searches</h3>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Clear all
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {search.from} → {search.to}
                    </p>
                    <p className="text-xs text-muted-foreground">{search.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Search Again
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}