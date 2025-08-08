import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event } from '../types/event';
import { Calendar, MapPin, ExternalLink, User, Eye, Clock, Globe } from 'lucide-react';
import { useState } from 'react';

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventModal = ({ event, isOpen, onClose }: EventModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!event) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
              <img
                src={event.images[currentImageIndex]}
                alt={`${event.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {event.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {event.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index 
                        ? 'border-primary' 
                        : 'border-transparent hover:border-muted-foreground'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Platform Info */}
              <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                <img 
                  src={event.platform.logo} 
                  alt={event.platform.name}
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <p className="font-semibold">{event.platform.name}</p>
                  <p className="text-sm text-muted-foreground">Platform</p>
                </div>
              </div>

              {/* Theme Tags */}
              <div className="space-y-3">
                <h4 className="font-semibold">Themes</h4>
                <div className="flex flex-wrap gap-2">
                  {event.theme.map((theme) => (
                    <Badge 
                      key={theme} 
                      className={getThemeColor(theme)}
                    >
                      #{theme}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-2xl font-bold">
                    <Eye className="w-5 h-5" />
                    <span>{event.viewCount.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Views</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-2xl font-bold">
                    <Globe className="w-5 h-5" />
                    <span>{event.mode}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Mode</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Event Info */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Event Date</p>
                    <p className="text-muted-foreground">{formatDate(event.date)}</p>
                    {event.endDate && (
                      <p className="text-muted-foreground">to {formatDate(event.endDate)}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Organizer</p>
                    <p className="text-muted-foreground">{event.organizer}</p>
                  </div>
                </div>

                {event.location && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Posted</p>
                    <p className="text-muted-foreground">
                      {new Date(event.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">About This Event</h4>
            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center pt-4">
            <Button 
              size="lg"
              className="px-8 py-6 text-lg font-semibold animate-pulse-glow"
              onClick={() => window.open(event.externalLink, '_blank')}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Register Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};