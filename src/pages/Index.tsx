import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { FilterBar } from '../components/FilterBar';
import { EventGrid } from '../components/EventGrid';
import { TopViewedSection } from '../components/TopViewedSection';
import { AdminLogin } from '../components/AdminLogin';
import { Footer } from '../components/Footer';
import { FilterOptions } from '../types/event';
import { useEvents } from '../hooks/useEvents';

const Index = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterOptions>({
    theme: 'all',
    platform: 'all',
    date: 'all',
    mode: 'all'
  });

  const { events, platforms, isLoading, error } = useEvents();
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminLoginOpen(true);
  };

  const handleAdminLoginSuccess = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAdminLogin={handleAdminLogin} />
      
      <main>
        <HeroSection />
        
        <FilterBar 
          filters={filters} 
          onFilterChange={setFilters}
          platforms={platforms}
        />
        
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Featured <span className="gradient-text">Events</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover amazing hackathons and tech events happening across multiple platforms
              </p>
            </div>
            
            <EventGrid 
              events={events} 
              filters={filters}
              isLoading={isLoading}
            />
          </div>
        </section>

        <TopViewedSection events={events} />
      </main>

      <Footer />

      <AdminLogin
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
};

export default Index;