-- Create platforms table
CREATE TABLE public.platforms (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  platform_id TEXT NOT NULL REFERENCES public.platforms(id),
  theme TEXT[] NOT NULL DEFAULT '{}',
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  organizer TEXT NOT NULL,
  location TEXT,
  mode TEXT NOT NULL CHECK (mode IN ('Online', 'Offline', 'Hybrid')),
  images TEXT[] NOT NULL DEFAULT '{}',
  external_link TEXT NOT NULL,
  is_trending BOOLEAN NOT NULL DEFAULT false,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (events are public)
CREATE POLICY "Anyone can view platforms" 
ON public.platforms 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view events" 
ON public.events 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_platforms_updated_at
BEFORE UPDATE ON public.platforms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial platform data
INSERT INTO public.platforms (id, name, logo, color) VALUES
  ('devfolio', 'Devfolio', '/api/placeholder/40/40', '#3B82F6'),
  ('hackerearth', 'HackerEarth', '/api/placeholder/40/40', '#F59E0B'),
  ('github', 'GitHub', '/api/placeholder/40/40', '#1F2937'),
  ('mlh', 'MLH', '/api/placeholder/40/40', '#EF4444'),
  ('unstop', 'Unstop', '/api/placeholder/40/40', '#8B5CF6');

-- Insert initial event data
INSERT INTO public.events (
  title, description, short_description, platform_id, theme, date, end_date, 
  organizer, location, mode, images, external_link, is_trending, is_popular, view_count
) VALUES
  (
    'AI Innovation Challenge 2024',
    'Join the ultimate AI hackathon where teams compete to build cutting-edge artificial intelligence solutions. This 48-hour intensive coding marathon brings together the brightest minds in AI to solve real-world problems using machine learning, deep learning, and natural language processing.',
    'Build cutting-edge AI solutions in this 48-hour hackathon with industry mentors and exclusive datasets.',
    'devfolio',
    ARRAY['AI', 'Data Science'],
    '2024-03-15'::timestamptz,
    '2024-03-17'::timestamptz,
    'TechCorp Inc.',
    'San Francisco, CA',
    'Hybrid',
    ARRAY['/src/assets/ai-hackathon-1.jpg', '/api/placeholder/600/400'],
    'https://devfolio.co/hackathon/ai-challenge-2024',
    true,
    true,
    15420
  ),
  (
    'Web3 Developer Summit',
    'Dive deep into the decentralized web at the premier Web3 developer event of the year. This summit combines workshops, networking, and a competitive hackathon focused on blockchain technologies, DeFi protocols, and NFT platforms.',
    'Premier Web3 event combining workshops, networking, and blockchain hackathon.',
    'hackerearth',
    ARRAY['Web3', 'Blockchain', 'Fintech'],
    '2024-03-22'::timestamptz,
    '2024-03-24'::timestamptz,
    'Blockchain Alliance',
    NULL,
    'Online',
    ARRAY['/src/assets/web3-summit-1.jpg', '/api/placeholder/650/400'],
    'https://hackerearth.com/web3-summit-2024',
    false,
    true,
    12890
  ),
  (
    'Mobile First Hackathon',
    'Create the next generation of mobile applications in this intensive development sprint. Focusing on cross-platform mobile solutions, participants will work with React Native, Flutter, and native iOS/Android development.',
    'Build next-gen mobile apps with React Native, Flutter, and native development.',
    'github',
    ARRAY['Mobile', 'Web Development'],
    '2024-04-05'::timestamptz,
    '2024-04-07'::timestamptz,
    'Mobile Developers United',
    'Austin, TX',
    'Offline',
    ARRAY['/src/assets/mobile-hackathon-1.jpg', '/api/placeholder/600/400'],
    'https://github.com/mobile-hackathon-2024',
    true,
    false,
    8765
  ),
  (
    'HealthTech Innovation Lab',
    'Address critical healthcare challenges through technology innovation. This specialized hackathon focuses on developing digital health solutions, medical device integrations, and patient care optimization tools.',
    'Solve healthcare challenges with digital health solutions and AI diagnostics.',
    'mlh',
    ARRAY['Healthcare', 'AI', 'Data Science'],
    '2024-04-12'::timestamptz,
    '2024-04-14'::timestamptz,
    'HealthTech Innovators',
    NULL,
    'Hybrid',
    ARRAY['/src/assets/healthtech-1.jpg', '/api/placeholder/700/400'],
    'https://mlh.io/healthtech-innovation-2024',
    false,
    true,
    11234
  ),
  (
    'Sustainable Tech Challenge',
    'Build technology solutions for environmental sustainability and climate action. This eco-focused hackathon challenges developers to create applications that address climate change, promote renewable energy, and support sustainable practices.',
    'Create eco-friendly tech solutions for climate action and sustainability.',
    'unstop',
    ARRAY['Sustainability', 'IoT', 'Data Science'],
    '2024-04-20'::timestamptz,
    NULL,
    'GreenTech Coalition',
    NULL,
    'Online',
    ARRAY['/src/assets/sustainable-tech-1.jpg', '/api/placeholder/650/400'],
    'https://unstop.com/sustainable-tech-2024',
    true,
    false,
    9876
  );