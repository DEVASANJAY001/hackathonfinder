
import { useState } from 'react';
import { Menu, X, Code2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onAdminLogin: () => void;
}

export const Navbar = ({ onAdminLogin }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/categories' },
    { name: 'Top Viewed', href: '#top-viewed' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">ZORHCK</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Admin Login Button */}
          <div className="hidden md:flex items-center">
            <Button
              onClick={onAdminLogin}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Admin Login</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button
                onClick={() => {
                  onAdminLogin();
                  setIsMenuOpen(false);
                }}
                variant="outline"
                size="sm"
                className="w-full mt-4 flex items-center justify-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Admin Login</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
