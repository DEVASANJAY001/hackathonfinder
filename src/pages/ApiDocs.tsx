
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Database, Key, Zap, ExternalLink, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ApiDocs = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Code snippet copied to clipboard.",
    });
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/api/events',
      description: 'Retrieve all events',
      response: 'Array of event objects'
    },
    {
      method: 'GET',
      path: '/api/events/:id',
      description: 'Retrieve a specific event',
      response: 'Single event object'
    },
    {
      method: 'GET',
      path: '/api/platforms',
      description: 'Retrieve all platforms',
      response: 'Array of platform objects'
    },
    {
      method: 'POST',
      path: '/api/events',
      description: 'Create a new event (Admin only)',
      response: 'Created event object'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAdminLogin={() => {}} />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">
              API <span className="gradient-text">Documentation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Integrate ZORHCK's event data into your applications with our RESTful API
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="text-center">
                <Database className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle>RESTful API</CardTitle>
                <CardDescription>
                  Clean, predictable endpoints following REST conventions
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Zap className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle>Real-time Data</CardTitle>
                <CardDescription>
                  Access the latest event information as it's updated
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Key className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle>Authenticated</CardTitle>
                <CardDescription>
                  Secure API access with authentication tokens
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* API Documentation */}
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Getting Started</CardTitle>
                  <CardDescription>
                    Learn how to integrate with the ZORHCK API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Base URL</h3>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                      https://api.zorhck.com/v1
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Response Format</h3>
                    <p className="text-muted-foreground mb-3">
                      All API responses are in JSON format and include standard HTTP status codes.
                    </p>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
{`{
  "success": true,
  "data": [...],
  "message": "Events retrieved successfully",
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Rate Limiting</h3>
                    <p className="text-muted-foreground">
                      API requests are limited to 1000 requests per hour per API key.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Available Endpoints</CardTitle>
                  <CardDescription>
                    Complete list of API endpoints and their functionality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {endpoints.map((endpoint, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <Badge 
                              variant={endpoint.method === 'GET' ? 'secondary' : 'default'}
                              className="font-mono text-xs"
                            >
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm font-mono">{endpoint.path}</code>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {endpoint.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <strong>Response:</strong> {endpoint.response}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Code Examples</CardTitle>
                  <CardDescription>
                    Sample code to help you get started quickly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">Fetch All Events</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => copyToClipboard(`fetch('https://api.zorhck.com/v1/events', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
{`fetch('https://api.zorhck.com/v1/events', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">Filter Events by Platform</h3>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => copyToClipboard(`fetch('https://api.zorhck.com/v1/events?platform=devfolio', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <pre className="text-sm overflow-x-auto">
{`fetch('https://api.zorhck.com/v1/events?platform=devfolio', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Authentication</CardTitle>
                  <CardDescription>
                    Learn how to authenticate your API requests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">API Key Authentication</h3>
                    <p className="text-muted-foreground mb-4">
                      Include your API key in the Authorization header of every request:
                    </p>
                    <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                      Authorization: Bearer YOUR_API_KEY
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Getting an API Key</h3>
                    <p className="text-muted-foreground mb-4">
                      To get an API key, please contact our team through the contact form or email us at api@zorhck.com.
                    </p>
                    <Button>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Request API Access
                    </Button>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Security Best Practices</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Never expose your API key in client-side code</li>
                      <li>• Store API keys securely in environment variables</li>
                      <li>• Regenerate keys regularly for enhanced security</li>
                      <li>• Use HTTPS for all API requests</li>
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

export default ApiDocs;
