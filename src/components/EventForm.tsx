import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  event?: any;
}

export const EventForm = ({ isOpen, onClose, onSuccess, event }: EventFormProps) => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [mode, setMode] = useState('');
  const [platformId, setPlatformId] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [themes, setThemes] = useState<string[]>([]);
  const [currentTheme, setCurrentTheme] = useState('');
  const [isTrending, setIsTrending] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [college, setCollege] = useState('');
  const { toast } = useToast();

  const { data: platforms } = useQuery({
    queryKey: ['platforms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('platforms')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setShortDescription(event.short_description || '');
      setDescription(event.description || '');
      setDate(event.date ? new Date(event.date).toISOString().slice(0, 16) : '');
      setEndDate(event.end_date ? new Date(event.end_date).toISOString().slice(0, 16) : '');
      setLocation(event.location || '');
      setMode(event.mode || '');
      setPlatformId(event.platform_id || '');
      setOrganizer(event.organizer || '');
      setExternalLink(event.external_link || '');
      setThemes(event.theme || []);
      setIsTrending(event.is_trending || false);
      setIsPopular(event.is_popular || false);
      setCollege(event.college || '');
    } else {
      resetForm();
    }
  }, [event, isOpen]);

  const resetForm = () => {
    setTitle('');
    setShortDescription('');
    setDescription('');
    setDate('');
    setEndDate('');
    setLocation('');
    setMode('');
    setPlatformId('');
    setOrganizer('');
    setExternalLink('');
    setThemes([]);
    setCurrentTheme('');
    setIsTrending(false);
    setIsPopular(false);
    setImageFiles(null);
    setCollege('');
  };

  const addTheme = () => {
    if (currentTheme && !themes.includes(currentTheme)) {
      setThemes([...themes, currentTheme]);
      setCurrentTheme('');
    }
  };

  const removeTheme = (themeToRemove: string) => {
    setThemes(themes.filter(theme => theme !== themeToRemove));
  };

  const uploadEventImages = async (eventId: string, files: FileList): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const filePath = `${eventId}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from('event-images').upload(filePath, file, { upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from('event-images').getPublicUrl(filePath);
      urls.push(data.publicUrl);
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const baseData = {
        title,
        short_description: shortDescription,
        description,
        date: new Date(date).toISOString(),
        end_date: endDate ? new Date(endDate).toISOString() : null,
        location: location || null,
        mode,
        platform_id: platformId,
        organizer,
        external_link: externalLink,
        theme: themes,
        is_trending: isTrending,
        is_popular: isPopular,
        college: college || null,
        images: event ? (event.images || []) : []
      } as any;

      if (event) {
        // Update existing event first
        const { error: updateError } = await supabase
          .from('events')
          .update(baseData)
          .eq('id', event.id);
        if (updateError) throw updateError;

        // Upload any newly selected images and append
        if (imageFiles && imageFiles.length > 0) {
          const newUrls = await uploadEventImages(event.id, imageFiles);
          const merged = [ ...(event.images || []), ...newUrls ];
          const { error: imagesError } = await supabase
            .from('events')
            .update({ images: merged })
            .eq('id', event.id);
          if (imagesError) throw imagesError;
        }

        toast({ title: 'Event Updated', description: 'Event has been successfully updated.' });
      } else {
        // Create event to get an ID
        const { data: inserted, error: insertError } = await supabase
          .from('events')
          .insert([baseData])
          .select('*')
          .single();
        if (insertError) throw insertError;

        // Upload images if any and set on the record
        if (imageFiles && imageFiles.length > 0) {
          const urls = await uploadEventImages(inserted.id, imageFiles);
          const { error: imagesError } = await supabase
            .from('events')
            .update({ images: urls })
            .eq('id', inserted.id);
          if (imagesError) throw imagesError;
        }

        toast({ title: 'Event Created', description: 'New event has been successfully created.' });
      }

      onSuccess();
      onClose();
      resetForm();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        resetForm();
      }
    }}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform">Platform *</Label>
              <Select value={platformId} onValueChange={setPlatformId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms?.map((platform) => (
                    <SelectItem key={platform.id} value={platform.id}>
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description *</Label>
            <Input
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Start Date & Time *</Label>
              <Input
                id="date"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date & Time</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mode">Mode *</Label>
              <Select value={mode} onValueChange={setMode} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location (if applicable)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organizer">Organizer *</Label>
              <Input
                id="organizer"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="externalLink">External Link *</Label>
              <Input
                id="externalLink"
                type="url"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="college">College (optional)</Label>
            <Select value={college} onValueChange={setCollege}>
              <SelectTrigger>
                <SelectValue placeholder="Select college type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="IITs">IITs</SelectItem>
                <SelectItem value="NITs">NITs</SelectItem>
                <SelectItem value="VITs">VITs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Themes</Label>
            <div className="flex space-x-2">
              <Input
                value={currentTheme}
                onChange={(e) => setCurrentTheme(e.target.value)}
                placeholder="Add theme"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTheme())}
              />
              <Button type="button" onClick={addTheme}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {themes.map((theme, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <span>{theme}</span>
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => removeTheme(theme)}
                  />
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Event Images</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles(e.target.files)}
            />
            <p className="text-sm text-muted-foreground">Upload one or more images to showcase the event.</p>
          </div>

          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => setIsTrending(e.target.checked)}
              />
              <span>Trending</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
              />
              <span>Popular</span>
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                onClose();
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (event ? 'Update Event' : 'Create Event')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};