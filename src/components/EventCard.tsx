import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event } from '../types/event';
import { Calendar, MapPin, ExternalLink, Info, Heart, Eye, TrendingUp } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onDetailsClick: (event: Event) => void;
  onFavoriteToggle?: (eventId: string) => void;
  isFavorited?: boolean;
}

export const EventCard = ({ event, onDetailsClick, onFavoriteToggle, isFavorited = false }: EventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getThemeColor = (theme: string) => {
    const colors = {
      'AI': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      'Web3': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'Mobile': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'Web Development': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      'Data Science': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
      'Blockchain': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
      'IoT': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
      'Gaming': 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
      'Fintech': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      'Healthcare': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      'Sustainability': 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300',
      'Education': 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
      'Open Source': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    };
    return colors[theme as keyof typeof colors] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <Card 
      className={`event-card group cursor-pointer ${isHovered ? 'glow' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header with Image */}
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg h-32 md:h-48">
          <img
            src={event.images[0] || '/placeholder.svg'}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {event.isTrending && (
              <Badge className="bg-primary text-primary-foreground flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>Trending</span>
              </Badge>
            )}
            {event.isPopular && (
              <Badge className="bg-secondary text-secondary-foreground">
                Popular
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle?.(event.id);
              }}
              className={`rounded-full p-2 backdrop-blur-sm ${
                isFavorited 
                  ? 'bg-red-500/90 text-white hover:bg-red-600/90' 
                  : 'bg-black/20 text-white hover:bg-black/40'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-3 md:p-6">
        <div className="space-y-2 md:space-y-4">
          {/* Platform Info */}
          <div className="flex items-center space-x-3">
            <span className="text-xs md:text-sm font-medium text-muted-foreground">
              {event.platform.name}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm md:text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {event.title}
          </h3>

          {/* Description - Hidden on mobile */}
          <p className="hidden md:block text-muted-foreground line-clamp-3">
            {event.shortDescription}
          </p>

          {/* Theme Tags */}
          <div className="flex flex-wrap gap-1 md:gap-2">
            {event.theme.slice(0, 2).map((theme) => (
              <Badge 
                key={theme} 
                variant="secondary" 
                className={`text-[10px] md:text-xs px-1 md:px-2 py-0.5 ${getThemeColor(theme)}`}
              >
                #{theme}
              </Badge>
            ))}
            {event.theme.length > 2 && (
              <Badge variant="secondary" className="text-[10px] md:text-xs px-1 md:px-2 py-0.5">
                +{event.theme.length - 2}
              </Badge>
            )}
          </div>

          {/* Event Info */}
          <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center space-x-1 md:space-x-2">
              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
              <span>{formatDate(event.date)}</span>
              {event.endDate && <span className="hidden md:inline">- {formatDate(event.endDate)}</span>}
            </div>
            
            {event.location && (
              <div className="flex items-center space-x-1 md:space-x-2">
                <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                <span className="truncate">{event.location}</span>
              </div>
            )}

            <div className="hidden md:flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>{event.viewCount.toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-3 md:p-6 pt-0 flex gap-2 md:gap-3">
        <Button 
          size="sm"
          className="flex-1 text-xs md:text-sm h-8 md:h-10" 
          onClick={(e) => {
            e.stopPropagation();
            window.open(event.externalLink, '_blank');
          }}
        >
          <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
          Register
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 text-xs md:text-sm h-8 md:h-10"
          onClick={(e) => {
            e.stopPropagation();
            // Navigate to event detail page instead of opening modal
            window.location.href = `/event/${event.id}`;
          }}
        >
          <Info className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
          <span className="hidden md:inline">Details</span>
        </Button>
      </CardFooter>
    </Card>
  );
};