
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get in touch via email',
      value: 'info.zorhck@davns.com',
      color: 'bg-blue-500/10 text-blue-700'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team',
      value: '7200060295',
      color: 'bg-green-500/10 text-green-700'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Our campus location',
      value: 'SAVEETHA ENGINEERING COLLEGE, CHENNAI',
      color: 'bg-purple-500/10 text-purple-700'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: 'When we\'re available',
      value: 'Mon-Fri: 9AM-6PM PST',
      color: 'bg-orange-500/10 text-orange-700'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
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
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions, suggestions, or want to collaborate? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Whether you're a developer looking for events, an organizer wanting to list 
                  your event, or have feedback to share, we're here to help.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card key={index} className="h-full">
                      <CardHeader className="pb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${info.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-lg">{info.title}</CardTitle>
                        <CardDescription>{info.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium text-foreground">{info.value}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* FAQ Section */}
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">How can I submit an event?</h4>
                    <p className="text-sm text-muted-foreground">
                      Contact our admin team through this form or email us directly.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Is ZORHCK free to use?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes! ZORHCK is completely free for developers to browse and discover events.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">How often is the platform updated?</h4>
                    <p className="text-sm text-muted-foreground">
                      We update our event listings daily and continuously improve our features.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
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

export default Contact;
