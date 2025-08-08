import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Event, Platform } from '@/types/event';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlatforms = async () => {
    try {
      const { data, error } = await supabase
        .from('platforms')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching platforms:', err);
      return [];
    }
  };

  const fetchEvents = async () => {
    try {
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select(`
          *,
          platform:platforms!events_platform_id_fkey(*)
        `)
        .order('created_at', { ascending: false });

      if (eventsError) throw eventsError;

      const formattedEvents: Event[] = (eventsData || []).map((event: any) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        shortDescription: event.short_description,
        platform: {
          id: event.platform.id,
          name: event.platform.name,
          logo: event.platform.logo,
          color: event.platform.color
        },
        theme: event.theme,
        date: event.date,
        endDate: event.end_date,
        organizer: event.organizer,
        location: event.location,
        mode: event.mode,
        images: event.images,
        externalLink: event.external_link,
        isTrending: event.is_trending,
        isPopular: event.is_popular,
        viewCount: event.view_count,
        createdAt: event.created_at,
        college: event.college || undefined
      }));

      return formattedEvents;
    } catch (err) {
      console.error('Error fetching events:', err);
      throw err;
    }
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [platformsData, eventsData] = await Promise.all([
        fetchPlatforms(),
        fetchEvents()
      ]);
      
      setPlatforms(platformsData);
      setEvents(eventsData);
    } catch (err) {
      setError('Failed to load events. Please try again.');
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    events,
    platforms,
    isLoading,
    error,
    refetch: loadData
  };
};