import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function NotFound() {
  const [location] = useLocation();
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-100">
      <Card className="w-full max-w-md mx-4 border-neutral-200 shadow-lg">
        <CardContent className="pt-6 pb-6">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Coming Soon</h1>
            <h2 className="text-xl font-medium text-neutral-700">Page Under Construction</h2>
          </div>
          
          <div className="mb-6 text-center">
            <p className="text-neutral-600 mb-2">
              The page <span className="font-medium text-primary">"{location}"</span> is currently under development.
            </p>
            <p className="text-neutral-600">
              We're working hard to bring you the best funding options. Please check back soon!
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link href="/" className="inline-flex items-center px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors">
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
