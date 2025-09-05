import Header from "@/components/Header";
import SearchSection from "@/components/SearchSection";
import BusRoutes from "@/components/BusRoutes";
import LiveTracking from "@/components/LiveTracking";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Search and Recent Searches Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SearchSection />
          </div>
          
          {/* Live Tracking Map */}
          <div className="lg:col-span-2">
            <LiveTracking />
          </div>
        </div>

        {/* Bus Routes Section */}
        <BusRoutes />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-gradient-primary text-primary-foreground shadow-medium">
            <h3 className="text-2xl font-bold">5</h3>
            <p className="text-primary-foreground/80">Active Routes</p>
          </div>
          <div className="p-6 rounded-lg bg-gradient-accent text-accent-foreground shadow-medium">
            <h3 className="text-2xl font-bold">12</h3>
            <p className="text-accent-foreground/80">Buses Running</p>
          </div>
          <div className="p-6 rounded-lg bg-card border text-card-foreground shadow-medium">
            <h3 className="text-2xl font-bold">98%</h3>
            <p className="text-muted-foreground">On-Time Performance</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;