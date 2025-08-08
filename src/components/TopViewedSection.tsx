import { Event } from '../types/event';
import { EventCard } from './EventCard';
import { TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface TopViewedSectionProps {
  events: Event[];
}

export const TopViewedSection = ({ events }: TopViewedSectionProps) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Sort events by view count and take top 6
  const topViewedEvents = events
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 6);

  const handleFavoriteToggle = (eventId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(eventId)) {
        newFavorites.delete(eventId);
      } else {
        newFavorites.add(eventId);
      }
      return newFavorites;
    });
  };

  const handleDetailsClick = (event: Event) => {
    // This would typically be handled by a parent component
    console.log('Details clicked for:', event.id);
  };

  return (
    <section id="top-viewed" className="py-16 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-2">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Top Viewed Events</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular tech events and hackathons based on community interest
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topViewedEvents.map((event, index) => (
            <div 
              key={event.id} 
              className={`fade-in stagger-${Math.min(index % 4 + 1, 4)}`}
            >
              <EventCard
                event={event}
                onDetailsClick={handleDetailsClick}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorited={favorites.has(event.id)}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="text-primary hover:text-primary-glow font-semibold text-lg transition-colors">
            View All Events →
          </button>
        </div>
      </div>
    </section>
  );
};