import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, ExternalLink, Eye, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Event, Theme } from '@/types/event';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const { data: eventData, error } = await supabase
          .from('events')
          .select(`
            *,
            platform:platforms!events_platform_id_fkey(*)
          `)
          .eq('id', id)
          .single();

        if (error) throw error;

        if (eventData) {
          const formattedEvent: Event = {
            id: eventData.id,
            title: eventData.title,
            description: eventData.description,
            shortDescription: eventData.short_description,
            platform: {
              id: eventData.platform.id,
              name: eventData.platform.name,
              logo: eventData.platform.logo,
              color: eventData.platform.color
            },
            theme: eventData.theme as Theme[],
            date: eventData.date,
            endDate: eventData.end_date,
            organizer: eventData.organizer,
            location: eventData.location,
            mode: eventData.mode as 'Online' | 'Offline' | 'Hybrid',
            images: eventData.images,
            externalLink: eventData.external_link,
            isTrending: eventData.is_trending,
            isPopular: eventData.is_popular,
            viewCount: eventData.view_count,
            createdAt: eventData.created_at
          };
          setEvent(formattedEvent);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        toast({
          title: "Error",
          description: "Failed to load event details.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-muted-foreground">Event Not Found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: event.title,
        text: event.shortDescription,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Event link has been copied to clipboard.",
      });
    }
  };

  const handleRegister = () => {
    window.open(event.externalLink, '_blank');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getThemeColor = (theme: string) => {
    const colors: { [key: string]: string } = {
      'AI': 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 border-purple-200',
      'Web3': 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 border-blue-200',
      'Mobile': 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 border-green-200',
      'Web Development': 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-700 border-orange-200',
      'Data Science': 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-700 border-indigo-200',
      'Blockchain': 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-700 border-yellow-200',
    };
    return colors[theme] || 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share Event
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Image */}
          <div className="relative">
            <img
              src={event.images[0]}
              alt={event.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              {event.isTrending && (
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  🔥 Trending
                </Badge>
              )}
              {event.isPopular && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  ⭐ Popular
                </Badge>
              )}
            </div>
          </div>

          {/* Event Header */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={event.platform.logo}
                alt={event.platform.name}
                className="w-12 h-12 rounded-xl shadow-lg"
              />
              <div>
                <h3 className="font-semibold text-lg">{event.platform.name}</h3>
                <p className="text-sm text-muted-foreground">Hosting Platform</p>
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-4">
                {event.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {event.shortDescription}
              </p>
            </div>

            {/* Theme Tags */}
            <div className="flex flex-wrap gap-2">
              {event.theme.map((theme, index) => (
                <Badge
                  key={index}
                  className={`${getThemeColor(theme)} border transition-all duration-300 hover:scale-105`}
                >
                  #{theme}
                </Badge>
              ))}
            </div>
          </div>

          {/* Event Details Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Date</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(event.date)}
                </p>
                {event.endDate && (
                  <p className="text-sm text-muted-foreground">
                    to {formatDate(event.endDate)}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-sm text-muted-foreground">
                  {event.location || 'Online Event'}
                </p>
                <Badge variant="outline" className="mt-2">
                  {event.mode}
                </Badge>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6 text-center">
                <Eye className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Views</h3>
                <p className="text-sm text-muted-foreground">
                  {event.viewCount.toLocaleString()} views
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">About This Event</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Organizer Info */}
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Organizer</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{event.organizer}</h3>
                  <p className="text-muted-foreground">Event Organizer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Images */}
          {event.images.length > 1 && (
            <Card className="glass-card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Event Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Event image ${index + 2}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA Section */}
          <Card className="glass-card border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Participate?</h2>
              <p className="text-muted-foreground mb-6">
                Join this amazing event and connect with like-minded developers and innovators.
              </p>
              <Button
                size="lg"
                onClick={handleRegister}
                className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Register Now on {event.platform.name}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;