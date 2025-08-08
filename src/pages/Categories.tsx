
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { EventGrid } from '../components/EventGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, TrendingUp, Star, Code2, Laptop } from 'lucide-react';
import { FilterOptions } from '../types/event';
import { useEvents } from '../hooks/useEvents';

const Categories = () => {
  const navigate = useNavigate();
  const { events, platforms, isLoading } = useEvents();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filters, setFilters] = useState<FilterOptions>({
    theme: 'all',
    platform: 'all',
    date: 'all',
    mode: 'all'
  });

  const categories = [
    {
      id: 'platforms',
      title: 'By Platforms',
      description: 'Browse events by hosting platforms',
      icon: Code2,
      count: platforms.length,
      color: 'bg-blue-500/10 text-blue-700'
    },
    {
      id: 'dates',
      title: 'By Dates',
      description: 'Find events by timeline',
      icon: Calendar,
      count: events.length,
      color: 'bg-green-500/10 text-green-700'
    },
    {
      id: 'places',
      title: 'By Location',
      description: 'Events by location and mode',
      icon: MapPin,
      count: events.filter(e => e.location).length,
      color: 'bg-purple-500/10 text-purple-700'
    },
    {
      id: 'trending',
      title: 'Trending Events',
      description: 'Most popular right now',
      icon: TrendingUp,
      count: events.filter(e => e.isTrending).length,
      color: 'bg-orange-500/10 text-orange-700'
    },
    {
      id: 'popular',
      title: 'Popular Events',
      description: 'Highly viewed events',
      icon: Star,
      count: events.filter(e => e.isPopular).length,
      color: 'bg-red-500/10 text-red-700'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    switch (categoryId) {
      case 'trending':
        setFilters({ theme: 'all', platform: 'all', date: 'all', mode: 'all' });
        break;
      case 'popular':
        setFilters({ theme: 'all', platform: 'all', date: 'all', mode: 'all' });
        break;
      case 'dates':
        setFilters({ theme: 'all', platform: 'all', date: 'week', mode: 'all' });
        break;
      case 'places':
        setFilters({ theme: 'all', platform: 'all', date: 'all', mode: 'Offline' });
        break;
      default:
        setFilters({ theme: 'all', platform: 'all', date: 'all', mode: 'all' });
    }
  };

  const getFilteredEvents = () => {
    let filtered = events;
    
    if (activeCategory === 'trending') {
      filtered = events.filter(e => e.isTrending);
    } else if (activeCategory === 'popular') {
      filtered = events.filter(e => e.isPopular);
    }
    
    return filtered;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAdminLogin={() => {}} />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">
              Browse <span className="gradient-text">Categories</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover events organized by platforms, dates, locations, and popularity
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                    activeCategory === category.id ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Platform Filter Buttons (when platforms category is active) */}
          {activeCategory === 'platforms' && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Select Platform</h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={filters.platform === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilters({ ...filters, platform: 'all' })}
                >
                  All Platforms
                </Button>
                {platforms.map((platform) => (
                  <Button
                    key={platform.id}
                    variant={filters.platform === platform.id ? 'default' : 'outline'}
                    onClick={() => setFilters({ ...filters, platform: platform.id })}
                  >
                    {platform.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Events Grid */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {activeCategory === 'all' ? 'All Events' :
                 activeCategory === 'trending' ? 'Trending Events' :
                 activeCategory === 'popular' ? 'Popular Events' :
                 activeCategory === 'platforms' ? `Platform Events` :
                 activeCategory === 'dates' ? 'Recent Events' :
                 'Location-based Events'}
              </h2>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setActiveCategory('all');
                  setFilters({ theme: 'all', platform: 'all', date: 'all', mode: 'all' });
                }}
              >
                Clear Filters
              </Button>
            </div>
            
            <EventGrid 
              events={getFilteredEvents()} 
              filters={filters}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
