import { Link, useRouteError } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

interface RouteError {
  statusText?: string;
  message?: string;
  status?: number;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  const isNotFound = error?.status === 404;

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Layout showNavigation={false}>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="glass text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <AlertTriangle className="h-10 w-10 text-destructive" />
              </div>
              <CardTitle className="text-2xl">
                {isNotFound ? 'Page Not Found' : 'Something went wrong'}
              </CardTitle>
              <CardDescription>
                {isNotFound 
                  ? "The page you're looking for doesn't exist or has been moved."
                  : "We're sorry, but something unexpected happened. Please try again."
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 bg-muted/50 rounded-lg text-sm">
                  <p className="font-medium text-destructive">
                    {isNotFound ? '404' : 'Error'}: {error.statusText || error.message}
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
                
                {!isNotFound && (
                  <Button variant="outline" onClick={handleReload} className="flex-1">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                )}
              </div>

              {isNotFound && (
                <div className="text-sm text-muted-foreground">
                  <p>Looking for something specific?</p>
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    <Link to="/dashboard" className="text-primary hover:underline">
                      Dashboard
                    </Link>
                    <span>•</span>
                    <Link to="/contact" className="text-primary hover:underline">
                      Contact
                    </Link>
                    <span>•</span>
                    <Link to="/sign-in" className="text-primary hover:underline">
                      Sign In
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}