import { useAuth } from '@/lib/auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export default function Layout({ children, showNavigation = true }: LayoutProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {showNavigation && (
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <div className="container flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SkillSync
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname.startsWith('/dashboard') ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        <Home className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" asChild>
                    <Link to="/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/sign-up">Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.header>
      )}

      <main className="flex-1">
        {children}
      </main>

      {/* Footer for public pages */}
      {!user && (
        <footer className="border-t bg-muted/50">
          <div className="container py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-white font-bold text-xs">SS</span>
                  </div>
                  <span className="font-bold">SkillSync</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Accelerate your coding journey with AI-powered mentorship and hands-on projects.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/features" className="hover:text-foreground">Features</Link></li>
                  <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
                  <li><Link to="/demo" className="hover:text-foreground">Demo</Link></li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/about" className="hover:text-foreground">About</Link></li>
                  <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
                  <li><Link to="/careers" className="hover:text-foreground">Careers</Link></li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              © 2024 SkillSync. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}