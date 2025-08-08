
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Users, Target, Zap, Heart, Globe } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Code2,
      title: 'Comprehensive Platform',
      description: 'Aggregating events from multiple tech platforms in one place'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by developers, for the developer community'
    },
    {
      icon: Target,
      title: 'Focused Discovery',
      description: 'Smart filtering and categorization for better event discovery'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Stay updated with the latest hackathons and tech events'
    }
  ];

  const stats = [
    { label: 'Events Listed', value: '500+' },
    { label: 'Platforms Integrated', value: '10+' },
    { label: 'Active Users', value: '5,000+' },
    { label: 'Success Stories', value: '200+' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAdminLogin={() => {}} />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Code2 className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text">ZORHCK</h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Your central hub for discovering and participating in tech events, hackathons, 
              and developer conferences across multiple platforms.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-4">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-center max-w-4xl mx-auto leading-relaxed">
                  We believe that great ideas emerge when passionate developers come together. 
                  ZORHCK was created to bridge the gap between talented developers and amazing 
                  opportunities by making event discovery seamless, comprehensive, and accessible.
                </p>
                <div className="flex justify-center">
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Designed and developed by davns industries
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose ZORHCK?</h2>
              <p className="text-lg text-muted-foreground">
                We're more than just an event aggregator - we're your partner in growth
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-lg text-muted-foreground">
                Numbers that reflect our commitment to the developer community
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Vision Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="pt-8 pb-8">
                <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  To create a world where every developer has access to opportunities that 
                  accelerate their growth, foster innovation, and build meaningful connections 
                  within the global tech community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
