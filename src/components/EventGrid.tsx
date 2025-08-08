import { useState, useMemo } from 'react';
import { EventCard } from './EventCard';
import { EventModal } from './EventModal';
import { Event, FilterOptions } from '../types/event';
import { Loader2 } from 'lucide-react';

interface EventGridProps {
  events: Event[];
  filters: FilterOptions;
  isLoading?: boolean;
}

export const EventGrid = ({ events, filters, isLoading = false }: EventGridProps) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Theme filter
      if (filters.theme && filters.theme !== 'all' && !event.theme.includes(filters.theme)) {
        return false;
      }

      // Platform filter
      if (filters.platform && filters.platform !== 'all' && event.platform.id !== filters.platform) {
        return false;
      }

      // Mode filter
      if (filters.mode !== 'all' && event.mode !== filters.mode) {
        return false;
      }

      // Date filter (simplified for demo)
      if (filters.date !== 'all') {
        const eventDate = new Date(event.date);
        const now = new Date();
        
        switch (filters.date) {
          case 'today':
            return eventDate.toDateString() === now.toDateString();
          case 'week':
            const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            return eventDate >= now && eventDate <= weekFromNow;
          case 'month':
            const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            return eventDate >= now && eventDate <= monthFromNow;
          default:
            return true;
        }
      }

      return true;
    });
  }, [events, filters]);

  const handleDetailsClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-lg text-muted-foreground">Loading amazing events...</span>
        </div>
      </div>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-muted-foreground">No Events Found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Try adjusting your filters to discover more exciting tech events and hackathons.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {filteredEvents.map((event, index) => (
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

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};