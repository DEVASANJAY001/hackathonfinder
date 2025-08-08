-- Create public storage buckets for images (idempotent)
insert into storage.buckets (id, name, public) values ('event-images','event-images', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('platform-logos','platform-logos', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('avatars','avatars', true) on conflict (id) do nothing;

-- Storage policies: public read, admin write for each bucket
-- Helper function usage: check profiles.role = 'admin'

-- Public read policies
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public can read event-images'
  ) THEN
    CREATE POLICY "Public can read event-images" ON storage.objects
    FOR SELECT USING (bucket_id = 'event-images');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public can read platform-logos'
  ) THEN
    CREATE POLICY "Public can read platform-logos" ON storage.objects
    FOR SELECT USING (bucket_id = 'platform-logos');
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public can read avatars'
  ) THEN
    CREATE POLICY "Public can read avatars" ON storage.objects
    FOR SELECT USING (bucket_id = 'avatars');
  END IF;
END $$;

-- Admin write policies for event-images
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can insert event-images'
  ) THEN
    CREATE POLICY "Admins can insert event-images" ON storage.objects
    FOR INSERT WITH CHECK (
      bucket_id = 'event-images' AND
      EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can update event-images'
  ) THEN
    CREATE POLICY "Admins can update event-images" ON storage.objects
    FOR UPDATE USING (
      bucket_id = 'event-images' AND
      EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can delete event-images'
  ) THEN
    CREATE POLICY "Admins can delete event-images" ON storage.objects
    FOR DELETE USING (
      bucket_id = 'event-images' AND
      EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
    );
  END IF;
END $$;

-- Admin write policies for platform-logos
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can insert platform-logos'
  ) THEN
    CREATE POLICY "Admins can insert platform-logos" ON storage.objects
    FOR INSERT WITH CHECK (
      bucket_id = 'platform-logos' AND
      EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can update platform-logos'
  ) THEN
    CREATE POLICY "Admins can update platform-logos" ON storage.objects
    FOR UPDATE USING (
      bucket_id = 'platform-logos' AND
      EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can delete platform-logos'
  ) THEN
    CREATE POLICY "Admins can delete platform-logos" ON storage.objects
    FOR DELETE USING (
      bucket_id = 'platform-logos' AND
      EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin')
    );
  END IF;
END $$;

-- Admin write policies for avatars
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can insert avatars'
  ) THEN
    CREATE POLICY "Admins can insert avatars" ON storage.objects
    FOR INSERT WITH CHECK (
      bucket_id = 'avatars' AND
      EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('admin','user'))
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can update avatars'
  ) THEN
    CREATE POLICY "Admins can update avatars" ON storage.objects
    FOR UPDATE USING (
      bucket_id = 'avatars' AND
      EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('admin','user'))
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can delete avatars'
  ) THEN
    CREATE POLICY "Admins can delete avatars" ON storage.objects
    FOR DELETE USING (
      bucket_id = 'avatars' AND
      EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('admin','user'))
    );
  END IF;
END $$;

-- Add columns for new features (idempotent)
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS college text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url text;

-- Ensure realtime works well
ALTER TABLE public.events REPLICA IDENTITY FULL;
ALTER TABLE public.platforms REPLICA IDENTITY FULL;
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.events;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.platforms;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Seed requested platforms if not present
-- Using INSERT ... WHERE NOT EXISTS to avoid conflicts
WITH seeds(name, id) AS (
  VALUES
    ('Devpost','devpost'),
    ('HackerEarth','hackerearth'),
    ('Unstop','unstop'),
    ('HackerRank','hackerrank'),
    ('Topcoder','topcoder'),
    ('CodeChef','codechef'),
    ('Major League Hacking (MLH)','mlh'),
    ('Hackathon.com','hackathon-com'),
    ('Codeforces','codeforces'),
    ('AtCoder','atcoder'),
    ('Microsoft Imagine Cup','microsoft-imagine-cup'),
    ('Google Developers','google-developers'),
    ('IBM Z Datathon','ibm-z-datathon'),
    ('Call for Code','call-for-code'),
    ('Meta Hackathons','meta-hackathons'),
    ('Amazon AWS Hackathons','aws-hackathons'),
    ('Salesforce Hackathons','salesforce-hackathons'),
    ('TCS CodeVita','tcs-codevita'),
    ('TCS HackQuest','tcs-hackquest'),
    ('Infosys HackWithInfy','infosys-hackwithinfy'),
    ('Wipro TalentNext Hackathons','wipro-talentnext-hackathons'),
    ('Accenture Innovation Challenge','accenture-innovation-challenge'),
    ('Smart India Hackathon','smart-india-hackathon'),
    ('TechGig Code Gladiators','techgig-code-gladiators'),
    ('AngelHack','angelhack'),
    ('IEEE Hackathons','ieee-hackathons'),
    ('ACM Hackathons','acm-hackathons'),
    ('Nasscom FutureSkills Hackathons','nasscom-futureskills-hackathons'),
    ('ETHGlobal','ethglobal'),
    ('Devfolio','devfolio'),
    ('Product Hunt Hackathons','product-hunt-hackathons'),
    ('Kaggle','kaggle'),
    ('OpenAI Hackathons','openai-hackathons'),
    ('Hugging Face Hackathons','huggingface-hackathons'),
    ('GitHub Hackathons','github-hackathons'),
    ('GitLab Hackathons','gitlab-hackathons'),
    ('MLH Local Hack Day','mlh-local-hack-day')
)
INSERT INTO public.platforms (id, name, logo, color)
SELECT s.id, s.name, '/placeholder.svg', '#6366f1'
FROM seeds s
WHERE NOT EXISTS (
  SELECT 1 FROM public.platforms p WHERE p.id = s.id
);
