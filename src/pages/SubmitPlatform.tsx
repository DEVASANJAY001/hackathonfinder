
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle, Clock, Zap, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SubmitPlatform = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    platformName: '',
    websiteUrl: '',
    description: '',
    contactEmail: '',
    apiEndpoint: '',
    logoUrl: '',
    categories: '',
    submitterName: '',
    submitterEmail: ''
  });

  const benefits = [
    {
      icon: Globe,
      title: 'Increased Visibility',
      description: 'Reach thousands of developers looking for events on your platform'
    },
    {
      icon: Zap,
      title: 'Easy Integration',
      description: 'Simple API integration process with our technical team support'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'We ensure all listed platforms meet our quality standards'
    }
  ];

  const requirements = [
    'Platform must host tech events, hackathons, or developer conferences',
    'Public API or data feed available for event information',
    'Stable platform with regular event listings',
    'Compliance with our data sharing agreements'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Platform Submitted!",
      description: "Thank you for your submission. We'll review it and get back to you within 3-5 business days.",
    });
    
    // Reset form
    setFormData({
      platformName: '',
      websiteUrl: '',
      description: '',
      contactEmail: '',
      apiEndpoint: '',
      logoUrl: '',
      categories: '',
      submitterName: '',
      submitterEmail: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAdminLogin={() => {}} />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">
              Submit Your <span className="gradient-text">Platform</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Partner with ZORHCK to showcase your events to thousands of developers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Upload className="w-6 h-6 mr-2" />
                    Platform Submission Form
                  </CardTitle>
                  <CardDescription>
                    Fill out the information below to submit your platform for integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Platform Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Platform Information</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="platformName" className="block text-sm font-medium mb-2">
                            Platform Name *
                          </label>
                          <Input
                            id="platformName"
                            name="platformName"
                            type="text"
                            value={formData.platformName}
                            onChange={handleInputChange}
                            placeholder="e.g., DevFest, HackerEarth"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="websiteUrl" className="block text-sm font-medium mb-2">
                            Website URL *
                          </label>
                          <Input
                            id="websiteUrl"
                            name="websiteUrl"
                            type="url"
                            value={formData.websiteUrl}
                            onChange={handleInputChange}
                            placeholder="https://yourplatform.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-2">
                          Platform Description *
                        </label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Describe your platform, the types of events you host, and your target audience..."
                          className="min-h-[100px]"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="contactEmail" className="block text-sm font-medium mb-2">
                            Platform Contact Email *
                          </label>
                          <Input
                            id="contactEmail"
                            name="contactEmail"
                            type="email"
                            value={formData.contactEmail}
                            onChange={handleInputChange}
                            placeholder="contact@yourplatform.com"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="logoUrl" className="block text-sm font-medium mb-2">
                            Logo URL
                          </label>
                          <Input
                            id="logoUrl"
                            name="logoUrl"
                            type="url"
                            value={formData.logoUrl}
                            onChange={handleInputChange}
                            placeholder="https://yourplatform.com/logo.png"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Technical Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Technical Details</h3>
                      
                      <div>
                        <label htmlFor="apiEndpoint" className="block text-sm font-medium mb-2">
                          API Endpoint (if available)
                        </label>
                        <Input
                          id="apiEndpoint"
                          name="apiEndpoint"
                          type="url"
                          value={formData.apiEndpoint}
                          onChange={handleInputChange}
                          placeholder="https://api.yourplatform.com/events"
                        />
                      </div>

                      <div>
                        <label htmlFor="categories" className="block text-sm font-medium mb-2">
                          Event Categories
                        </label>
                        <Input
                          id="categories"
                          name="categories"
                          type="text"
                          value={formData.categories}
                          onChange={handleInputChange}
                          placeholder="e.g., Hackathons, Conferences, Workshops (comma separated)"
                        />
                      </div>
                    </div>

                    {/* Submitter Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Your Information</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="submitterName" className="block text-sm font-medium mb-2">
                            Your Name *
                          </label>
                          <Input
                            id="submitterName"
                            name="submitterName"
                            type="text"
                            value={formData.submitterName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="submitterEmail" className="block text-sm font-medium mb-2">
                            Your Email *
                          </label>
                          <Input
                            id="submitterEmail"
                            name="submitterEmail"
                            type="email"
                            value={formData.submitterEmail}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Platform
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Why Partner with ZORHCK?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{benefit.title}</h4>
                          <p className="text-xs text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                  <CardDescription>
                    To ensure quality, platforms must meet these criteria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Process */}
              <Card>
                <CardHeader>
                  <CardTitle>Review Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                      1
                    </Badge>
                    <span className="text-sm">Submit your platform</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                      2
                    </Badge>
                    <span className="text-sm">Technical review (3-5 days)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                      3
                    </Badge>
                    <span className="text-sm">Integration setup</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                      4
                    </Badge>
                    <span className="text-sm">Go live!</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubmitPlatform;
