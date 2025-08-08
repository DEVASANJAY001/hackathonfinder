import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Globe, Users } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-24 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/30"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="space-y-12 fade-in">
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight">
              Discover <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary">Tech Events</span><br />
              & <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-secondary">Hackathons</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Your ultimate destination for discovering, filtering, and joining the most exciting tech events across all platforms
            </p>
          </div>


          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 slide-up stagger-2">
            <Button 
              size="lg" 
              className="px-10 py-7 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
              onClick={() => window.location.href = '/categories'}
            >
              Explore Events
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-10 py-7 text-lg border-2 backdrop-blur-sm hover:bg-background/50 transition-all duration-300"
              onClick={() => window.location.href = '/#top-viewed'}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};