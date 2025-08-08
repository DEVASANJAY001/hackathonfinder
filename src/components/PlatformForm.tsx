import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PlatformFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  platform?: any;
}

export const PlatformForm = ({ isOpen, onClose, onSuccess, platform }: PlatformFormProps) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [color, setColor] = useState('#6366f1');
  const [isLoading, setIsLoading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (platform) {
      setId(platform.id || '');
      setName(platform.name || '');
      setLogo(platform.logo || '');
      setColor(platform.color || '#6366f1');
    } else {
      resetForm();
    }
  }, [platform, isOpen]);

  const resetForm = () => {
    setId('');
    setName('');
    setLogo('');
    setColor('#6366f1');
  };

  const handleLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!id) {
      toast({
        title: "Set Platform ID first",
        description: "Enter platform name to auto-generate ID before uploading.",
        variant: "destructive",
      });
      return;
    }
    try {
      setLogoUploading(true);
      const filePath = `${id}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from('platform-logos').upload(filePath, file, { upsert: true });
      if (error) throw error;
      const { data } = supabase.storage.from('platform-logos').getPublicUrl(filePath);
      setLogo(data.publicUrl);
      toast({ title: 'Logo uploaded', description: 'Logo has been uploaded and set.' });
    } catch (err: any) {
      toast({ title: 'Upload failed', description: err.message, variant: 'destructive' });
    } finally {
      setLogoUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const platformData = {
        id: id.toLowerCase().replace(/\s+/g, '-'),
        name,
        logo,
        color
      };

      if (platform) {
        // Update existing platform
        const { error } = await supabase
          .from('platforms')
          .update(platformData)
          .eq('id', platform.id);

        if (error) throw error;

        toast({
          title: "Platform Updated",
          description: "Platform has been successfully updated.",
        });
      } else {
        // Create new platform
        const { error } = await supabase
          .from('platforms')
          .insert([platformData]);

        if (error) throw error;

        toast({
          title: "Platform Created",
          description: "New platform has been successfully created.",
        });
      }

      onSuccess();
      onClose();
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{platform ? 'Edit Platform' : 'Add New Platform'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Platform Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!platform) {
                  setId(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                }
              }}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="id">Platform ID *</Label>
            <Input
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled={!!platform}
              required
              placeholder="auto-generated-from-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo</Label>
            <Input
              id="logo"
              type="url"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder="https://example.com/logo.png"
            />
            <Input
              id="logo-file"
              type="file"
              accept="image/*"
              onChange={handleLogoFileChange}
              disabled={logoUploading}
            />
            {logo && (
              <div className="pt-2">
                <img src={logo} alt="Platform logo preview" className="w-16 h-16 rounded border" />
              </div>
            )}
            <p className="text-sm text-muted-foreground">Paste a logo URL or upload an image.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Brand Color *</Label>
            <div className="flex space-x-2">
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-16 h-10"
                required
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#6366f1"
                className="flex-1"
                required
              />
            </div>
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
              {isLoading ? 'Saving...' : (platform ? 'Update Platform' : 'Create Platform')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};