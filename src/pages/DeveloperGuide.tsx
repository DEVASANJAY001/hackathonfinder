
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Code2, Rocket, Settings, Database, Zap, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DeveloperGuide = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Code snippet copied to clipboard.",
    });
  };

  const guides = [
    {
      title: 'Quick Start',
      description: 'Get up and running with ZORHCK in minutes',
      icon: Rocket,
      color: 'bg-green-500/10 text-green-700',
      time: '5 min read'
    },
    {
      title: 'API Integration',
      description: 'Learn how to integrate with our RESTful API',
      icon: Code2,
      color: 'bg-blue-500/10 text-blue-700',
      time: '15 min read'
    },
    {
      title: 'Database Schema',
      description: 'Understanding our data models and relationships',
      icon: Database,
      color: 'bg-purple-500/10 text-purple-700',
      time: '10 min read'
    },
    {
      title: 'Advanced Configuration',
      description: 'Customize ZORHCK for your specific needs',
      icon: Settings,
      color: 'bg-orange-500/10 text-orange-700',
      time: '20 min read'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAdminLogin={() => {}} />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <BookOpen className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Developer <span className="gradient-text">Guide</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know to build with ZORHCK - from basic setup to advanced integrations
            </p>
          </div>

          {/* Guide Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${guide.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {guide.time}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Detailed Documentation */}
          <Tabs defaultValue="quickstart" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
              <TabsTrigger value="api">API Guide</TabsTrigger>
              <TabsTrigger value="database">Data Models</TabsTrigger>
              <TabsTrigger value="deployment">Deployment</TabsTrigger>
            </TabsList>

            <TabsContent value="quickstart" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Rocket className="w-6 h-6 mr-2" />
                    Quick Start Guide
                  </CardTitle>
                  <CardDescription>
                    Get ZORHCK running locally in just a few steps
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Prerequisites</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Node.js 18+ and npm/yarn</li>
                      <li>Git for version control</li>
                      <li>Code editor (VS Code recommended)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Installation</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">1. Clone the repository:</p>
                        <div className="bg-muted rounded-lg p-4 relative">
                          <pre className="text-sm overflow-x-auto">git clone https://github.com/zorhck/platform.git</pre>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard('git clone https://github.com/zorhck/platform.git')}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">2. Install dependencies:</p>
                        <div className="bg-muted rounded-lg p-4 relative">
                          <pre className="text-sm overflow-x-auto">cd platform && npm install</pre>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard('cd platform && npm install')}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">3. Start development server:</p>
                        <div className="bg-muted rounded-lg p-4 relative">
                          <pre className="text-sm overflow-x-auto">npm run dev</pre>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard('npm run dev')}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Environment Setup</h3>
                    <p className="text-muted-foreground mb-3">
                      Create a <code className="bg-muted px-1 rounded">.env.local</code> file with your configuration:
                    </p>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
{`NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Code2 className="w-6 h-6 mr-2" />
                    API Integration Guide
                  </CardTitle>
                  <CardDescription>
                    Learn how to work with ZORHCK's API endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Authentication</h3>
                    <p className="text-muted-foreground mb-3">
                      All API requests require authentication using Bearer tokens:
                    </p>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
{`const response = await fetch('/api/events', {
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'Content-Type': 'application/json'
  }
});`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Fetching Events</h3>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
{`// Get all events
const events = await fetch('/api/events').then(res => res.json());

// Filter by platform
const devfolioEvents = await fetch('/api/events?platform=devfolio')
  .then(res => res.json());

// Paginated results
const page1 = await fetch('/api/events?page=1&limit=10')
  .then(res => res.json());`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Creating Events</h3>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
{`const newEvent = await fetch('/api/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ADMIN_TOKEN'
  },
  body: JSON.stringify({
    title: 'New Hackathon',
    description: 'Amazing coding event',
    platform_id: 'devfolio',
    date: '2024-06-01',
    mode: 'Hybrid'
  })
});`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Error Handling</h3>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
{`try {
  const response = await fetch('/api/events');
  
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  
  const data = await response.json();
  return data;
} catch (error) {
  console.error('API request failed:', error);
  // Handle error appropriately
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="database" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Database className="w-6 h-6 mr-2" />
                    Data Models & Schema
                  </CardTitle>
                  <CardDescription>
                    Understanding ZORHCK's database structure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Events Table</h3>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
{`interface Event {
  id: string;              // UUID primary key
  title: string;           // Event name
  description: string;     // Full description
  short_description: string; // Brief summary
  platform_id: string;    // Reference to platforms table
  theme: string[];         // Array of themes/categories
  date: string;           // ISO date string
  end_date?: string;      // Optional end date
  organizer: string;      // Event organizer name
  location?: string;      // Physical location (optional)
  mode: 'Online' | 'Offline' | 'Hybrid';
  images: string[];       // Array of image URLs
  external_link: string;  // Link to original event
  is_trending: boolean;   // Trending flag
  is_popular: boolean;    // Popular flag
  view_count: number;     // Page views
  created_at: string;     // Creation timestamp
  updated_at: string;     // Last update timestamp
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Platforms Table</h3>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
{`interface Platform {
  id: string;           // Platform identifier
  name: string;         // Display name
  logo: string;         // Logo URL
  color: string;        // Brand color (hex)
  created_at: string;   // Creation timestamp
  updated_at: string;   // Last update timestamp
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">User Profiles</h3>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
{`interface Profile {
  id: string;           // UUID, matches auth.users.id
  email: string;        // User email
  role: 'user' | 'admin'; // User role
  avatar_url?: string;  // Profile picture URL
  created_at: string;   // Creation timestamp
  updated_at: string;   // Last update timestamp
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Relationships</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Events belong to Platforms (many-to-one)</li>
                      <li>Events can have multiple themes (array field)</li>
                      <li>Profiles reference Supabase auth users</li>
                      <li>RLS policies ensure data security</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deployment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Zap className="w-6 h-6 mr-2" />
                    Deployment Guide
                  </CardTitle>
                  <CardDescription>
                    Deploy ZORHCK to production environments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Vercel Deployment</h3>
                    <p className="text-muted-foreground mb-3">
                      ZORHCK is optimized for Vercel deployment:
                    </p>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
{`# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Docker Deployment</h3>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
{`# Build Docker image
docker build -t zorhck-platform .

# Run container
docker run -p 3000:3000 \\
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \\
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \\
  zorhck-platform`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Environment Variables</h3>
                    <p className="text-muted-foreground mb-3">
                      Required environment variables for production:
                    </p>
                    <div className="space-y-2">
                      <div className="bg-muted rounded-lg p-2 text-sm">
                        <code>NEXT_PUBLIC_SUPABASE_URL</code> - Your Supabase project URL
                      </div>
                      <div className="bg-muted rounded-lg p-2 text-sm">
                        <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> - Supabase anonymous key
                      </div>
                      <div className="bg-muted rounded-lg p-2 text-sm">
                        <code>SUPABASE_SERVICE_ROLE_KEY</code> - Service role key (server-side)
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Performance Tips</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Enable Supabase connection pooling</li>
                      <li>Use CDN for static assets</li>
                      <li>Implement proper caching strategies</li>
                      <li>Monitor database query performance</li>
                      <li>Set up error monitoring (Sentry recommended)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DeveloperGuide;
