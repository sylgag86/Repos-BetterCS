import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Trophy, Award, Share2, Clock, AlertCircle } from 'lucide-react';

const ApplicationSuccess = () => {
  const [progress, setProgress] = useState(0);
  const [completionTime, setCompletionTime] = useState('');
  
  // Simulate progress update for visual effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 1000);
    
    // Set completion time
    const now = new Date();
    setCompletionTime(now.toLocaleString());
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Success Message */}
            <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden mb-8">
              <div className="bg-success/10 p-8 flex flex-col items-center justify-center text-center">
                <div className="h-20 w-20 rounded-full bg-success text-white flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-heading font-bold text-neutral-900 mb-4">
                  Application Submitted!
                </h1>
                
                <p className="text-lg text-neutral-600 max-w-2xl">
                  Your funding application has been successfully submitted and is now being processed.
                </p>
                
                <div className="mt-6 w-full max-w-xs">
                  <Progress value={progress} className="h-2 mb-2 transition-all duration-1000 ease-out" />
                  <span className="text-sm text-success font-medium">100% Complete</span>
                </div>
                
                <div className="mt-8 bg-primary/5 border border-primary/20 p-6 rounded-lg max-w-2xl">
                  <h2 className="text-xl font-bold text-primary mb-3">Limited Time Offer: Fast-Track Your Funding!</h2>
                  <p className="mb-5 text-neutral-700">Get pre-qualified with our premium service - take advantage of this special offer today!</p>
                  <a 
                    href="tel:716-243-1397"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-lg text-lg transform hover:-translate-y-1 transition-all duration-200 shadow-md"
                  >
                    <span>Get Pre Qualified Now - FREE</span>
                    <Trophy className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h3 className="text-sm font-medium text-neutral-900 mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 text-primary mr-2" />
                      Application Details
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-neutral-500">Reference ID:</span>
                        <span className="font-medium">APP-{Math.floor(100000 + Math.random() * 900000)}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-neutral-500">Submitted:</span>
                        <span className="font-medium">{completionTime}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-neutral-500">Status:</span>
                        <span className="text-success font-medium">Received</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h3 className="text-sm font-medium text-neutral-900 mb-2 flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      Next Steps
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="bg-primary text-white h-5 w-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 mr-2">1</div>
                        <span>We'll review your application (1-2 business days)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary text-white h-5 w-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 mr-2">2</div>
                        <span>You'll receive personalized funding options</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary text-white h-5 w-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 mr-2">3</div>
                        <span>Select your preferred option & complete funding</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-4 border border-success/30 bg-success/5 rounded-lg">
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                      <Trophy className="h-10 w-10 text-success" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-success mb-1">Achievement Unlocked: Funding Explorer</h3>
                      <p className="text-neutral-600 text-sm">
                        You've taken a significant step toward securing funding for your business! Your application has unlocked access to our network of premier lenders.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" className="gap-2" asChild>
                    <Link href="/directory">
                      <Share2 className="h-4 w-4" />
                      Explore More Funding Options
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Testimonials/Social proof */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-heading font-semibold mb-4 text-center">
                  Join Thousands of Successful Businesses
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-4 w-4 text-amber-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-700 text-sm mb-3">
                      "Better Capital Solutions helped us secure an SBA loan when traditional banks turned us down. Their process was quick and our funding specialist was amazing!"
                    </p>
                    <p className="text-neutral-900 text-sm font-medium">
                      Sarah T., Retail Store Owner
                    </p>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-4 w-4 text-amber-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-700 text-sm mb-3">
                      "From application to funding in just 5 days! The team at BCS made the entire process incredibly smooth and hassle-free."
                    </p>
                    <p className="text-neutral-900 text-sm font-medium">
                      Michael R., Construction Company
                    </p>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-4 w-4 text-amber-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-700 text-sm mb-3">
                      "As a new business with limited history, I was worried about getting funding. BCS matched us with the perfect lender for our situation."
                    </p>
                    <p className="text-neutral-900 text-sm font-medium">
                      David L., Tech Startup Founder
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* DIY Option */}
            <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6 p-4">
                <div className="md:w-1/3 flex justify-center">
                  <div className="h-24 w-24 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                    <Award className="h-12 w-12" />
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium mb-2">
                    Limited Time: $29 Only
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    Prefer to DIY? Try Our Self-Guided Credit Improvement Bundle
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    Get instant access to our complete DIY credit improvement toolkit with step-by-step guides, dispute letter templates, and expert strategies to improve your credit score on your own.
                  </p>
                  <Link
                    to="/diy-credit"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-lg transform hover:-translate-y-1 transition-all duration-200"
                  >
                    <span>Get DIY Bundle - Only $29</span>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* What's Next Section */}
            <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6">
              <h2 className="text-xl font-heading font-semibold mb-6 text-center">
                While You Wait, Explore These Resources
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/blog.html" className="block group">
                  <div className="bg-neutral-50 hover:bg-neutral-100 transition-colors p-4 rounded-lg border border-neutral-200 text-center">
                    <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-neutral-900 group-hover:text-primary transition-colors">
                      Funding Guides
                    </h3>
                    <p className="text-neutral-600 text-sm mt-2">
                      Learn about different funding options and how to prepare for success
                    </p>
                  </div>
                </Link>
                
                <a 
                  href="https://safeclientaccess.com/forms/f/f0fd3fc6-84d2-4a93-be3b-0bc0bffb2e78" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-neutral-50 hover:bg-neutral-100 transition-colors p-4 rounded-lg border border-neutral-200 text-center">
                    <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-neutral-900 group-hover:text-primary transition-colors">
                      Premium Funding Service
                    </h3>
                    <p className="text-neutral-600 text-sm mt-2">
                      Get our expert team to help you secure the best funding options <span className="text-primary font-medium">- Limited Time Offer: $99!</span>
                    </p>
                  </div>
                </a>
                
                <Link href="/contact" className="block group">
                  <div className="bg-neutral-50 hover:bg-neutral-100 transition-colors p-4 rounded-lg border border-neutral-200 text-center">
                    <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <h3 className="font-medium text-neutral-900 group-hover:text-primary transition-colors">
                      Speak with an Expert
                    </h3>
                    <p className="text-neutral-600 text-sm mt-2">
                      Have questions? Connect with one of our funding specialists
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApplicationSuccess;