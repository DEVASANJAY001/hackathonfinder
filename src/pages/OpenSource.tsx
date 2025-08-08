
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Star, GitFork, Users, Code, Heart, ExternalLink } from 'lucide-react';

const OpenSource = () => {
  const projects = [
    {
      name: 'ZORHCK Platform',
      description: 'The main platform for discovering tech events and hackathons',
      stars: 234,
      forks: 45,
      language: 'TypeScript',
      status: 'Active',
      url: 'https://github.com/zorhck/platform'
    },
    {
      name: 'Event Scraper',
      description: 'Automated scraping tools for various event platforms',
      stars: 89,
      forks: 23,
      language: 'Python',
      status: 'Active',
      url: 'https://github.com/zorhck/event-scraper'
    },
    {
      name: 'API Client Libraries',
      description: 'Client libraries for ZORHCK API in multiple languages',
      stars: 67,
      forks: 18,
      language: 'Multiple',
      status: 'Active',
      url: 'https://github.com/zorhck/api-clients'
    },
    {
      name: 'Event Validator',
      description: 'Tools for validating and normalizing event data',
      stars: 45,
      forks: 12,
      language: 'JavaScript',
      status: 'Beta',
      url: 'https://github.com/zorhck/event-validator'
    }
  ];

  const contributions = [
    {
      type: 'Code Contributions',
      description: 'Submit pull requests to improve our codebase',
      icon: Code,
      color: 'bg-blue-500/10 text-blue-700'
    },
    {
      type: 'Bug Reports',
      description: 'Help us identify and fix issues in our platform',
      icon: Github,
      color: 'bg-green-500/10 text-green-700'
    },
    {
      type: 'Documentation',
      description: 'Improve our documentation and guides',
      icon: Users,
      color: 'bg-purple-500/10 text-purple-700'
    },
    {
      type: 'Feature Requests',
      description: 'Suggest new features and improvements',
      icon: Star,
      color: 'bg-orange-500/10 text-orange-700'
    }
  ];

  const stats = [
    { label: 'Contributors', value: '45+' },
    { label: 'Total Stars', value: '435' },
    { label: 'Active Repos', value: '12' },
    { label: 'Pull Requests', value: '200+' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAdminLogin={() => {}} />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Github className="w-12 h-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Open <span className="gradient-text">Source</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              ZORHCK is built in the open. Join our community of developers making tech events more accessible.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="flex items-center space-x-2">
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5 mr-2" />
                Sponsor Project
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission */}
          <Card className="mb-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Our Open Source Mission</h2>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                  We believe that the best way to serve the developer community is to be transparent, 
                  collaborative, and open. By open-sourcing ZORHCK, we enable developers worldwide 
                  to contribute, learn, and build upon our work to create better tools for everyone.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Projects</h2>
              <p className="text-lg text-muted-foreground">
                Explore our open source repositories and contribute to the ecosystem
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <Badge 
                        variant={project.status === 'Active' ? 'default' : 'secondary'}
                        className="ml-2"
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{project.stars}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork className="w-4 h-4" />
                          <span>{project.forks}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {project.language}
                        </Badge>
                      </div>
                      <Button variant="outline" className="w-full" asChild>
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          View Repository
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How to Contribute */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How to Contribute</h2>
              <p className="text-lg text-muted-foreground">
                There are many ways to contribute to ZORHCK, regardless of your experience level
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contributions.map((contribution, index) => {
                const Icon = contribution.icon;
                return (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${contribution.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">{contribution.type}</CardTitle>
                      <CardDescription>{contribution.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Getting Started */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Getting Started</CardTitle>
              <CardDescription className="text-center">
                Ready to contribute? Here's how to get started with ZORHCK development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold">Fork & Clone</h3>
                  <p className="text-sm text-muted-foreground">
                    Fork the repository and clone it to your local machine
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold">Set Up Environment</h3>
                  <p className="text-sm text-muted-foreground">
                    Follow our setup guide to get the development environment running
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold">Make Changes</h3>
                  <p className="text-sm text-muted-foreground">
                    Pick an issue, make your changes, and submit a pull request
                  </p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button size="lg">
                  <Github className="w-5 h-5 mr-2" />
                  View Contributing Guide
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OpenSource;
