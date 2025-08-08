import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLogin = ({ isOpen, onClose, onLoginSuccess }: AdminLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate security code first
    const validSecurityCode = '7904116719';
    if (securityCode !== validSecurityCode) {
      toast({
        title: "Invalid Security Code",
        description: "Please enter the correct security code to access admin functions.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      if (isSignup) {
        // Sign up with Supabase
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
            data: {
              role: 'admin'
            }
          }
        });

        if (error) {
          toast({
            title: "Signup Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Signup Successful",
            description: "Please check your email to confirm your account.",
          });
          setIsSignup(false);
          resetForm();
        }
      } else {
        // Sign in with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          });
        } else {
          // Check if user has admin role
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

          if (profile?.role === 'admin') {
            toast({
              title: "Login Successful",
              description: "Welcome to the admin dashboard!",
            });
            onLoginSuccess();
            onClose();
          } else {
            // Set user role to admin for demo purposes
            await supabase
              .from('profiles')
              .update({ role: 'admin' })
              .eq('id', data.user.id);
            
            toast({
              title: "Login Successful",
              description: "Welcome to the admin dashboard!",
            });
            onLoginSuccess();
            onClose();
          }
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setSecurityCode('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        resetForm();
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>{isSignup ? 'Admin Signup' : 'Admin Login'}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="securityCode">Security Code</Label>
            <div className="relative">
              <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="securityCode"
                type="text"
                placeholder="Enter admin security code"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                className="pl-9"
                required
              />
            </div>
          </div>


          <div className="text-center">
            <Button
              type="button"
              variant="link"
              className="text-sm"
              onClick={() => {
                setIsSignup(!isSignup);
                resetForm();
              }}
            >
              {isSignup ? 'Already have an account? Login' : 'Need an account? Sign up'}
            </Button>
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                onClose();
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading 
                ? (isSignup ? 'Creating Account...' : 'Signing in...') 
                : (isSignup ? 'Create Account' : 'Sign In')
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};