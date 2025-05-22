import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GamifiedProgressTracker from '@/components/GamifiedProgressTracker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { UserPlus, Building, Briefcase, FileText, DollarSign, BanknoteIcon as BankIcon, Paperclip, CheckSquare, Share2, Trophy, Award } from 'lucide-react';

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Business Information
  businessName: string;
  businessType: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Funding Details
  fundingAmount: string;
  fundingPurpose: string;
  timeInBusiness: string;
  annualRevenue: string;
  creditScore: string;
  
  // Additional Information
  hasBusinessPlan: boolean;
  hasTaxReturns: boolean;
  hasFinancialStatements: boolean;
  additionalInfo: string;
  
  // Agreement
  agreeToTerms: boolean;
}

const defaultFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  businessName: '',
  businessType: '',
  ein: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  fundingAmount: '',
  fundingPurpose: '',
  timeInBusiness: '',
  annualRevenue: '',
  creditScore: '',
  hasBusinessPlan: false,
  hasTaxReturns: false,
  hasFinancialStatements: false,
  additionalInfo: '',
  agreeToTerms: false
};

// Define application steps
const applicationSteps = [
  {
    id: 'personal',
    title: 'Personal Information',
    icon: <UserPlus className="h-5 w-5" />,
    description: 'Your contact information'
  },
  {
    id: 'business',
    title: 'Business Information',
    icon: <Building className="h-5 w-5" />,
    description: 'Details about your business'
  },
  {
    id: 'funding',
    title: 'Funding Details',
    icon: <DollarSign className="h-5 w-5" />,
    description: 'Funding requirements'
  },
  {
    id: 'documents',
    title: 'Documentation',
    icon: <FileText className="h-5 w-5" />,
    description: 'Supporting documents'
  },
  {
    id: 'review',
    title: 'Review & Submit',
    icon: <CheckSquare className="h-5 w-5" />,
    description: 'Verify your application'
  }
];

const FundingApplication = () => {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  
  // Track completed form fields
  useEffect(() => {
    const newCompletedItems: string[] = [];
    
    // Check personal information
    if (formData.firstName && formData.lastName && formData.email && formData.phone) {
      newCompletedItems.push('Personal Information');
    }
    
    // Check business information
    if (formData.businessName && formData.businessType && formData.address) {
      newCompletedItems.push('Business Information');
    }
    
    // Check funding details
    if (formData.fundingAmount && formData.fundingPurpose) {
      newCompletedItems.push('Funding Details');
    }
    
    // Check document requirements
    const documentCount = [
      formData.hasBusinessPlan,
      formData.hasTaxReturns,
      formData.hasFinancialStatements
    ].filter(Boolean).length;
    
    if (documentCount > 0) {
      newCompletedItems.push(`${documentCount}/3 Documents Ready`);
    }
    
    setCompletedItems(newCompletedItems);
  }, [formData]);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Mark a step as completed
  const completeStep = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
    }
  };
  
  // Navigate to next step
  const nextStep = () => {
    completeStep(currentStep);
    setCurrentStep(prev => Math.min(prev + 1, applicationSteps.length));
  };
  
  // Go back to previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  // Check if current step can proceed
  const canProceed = () => {
    switch (currentStep) {
      case 1: // Personal Information
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
      case 2: // Business Information
        return !!(formData.businessName && formData.businessType && formData.address && formData.city && formData.state && formData.zipCode);
      case 3: // Funding Details
        return !!(formData.fundingAmount && formData.fundingPurpose && formData.creditScore);
      case 4: // Documentation
        return true; // Optional step
      case 5: // Review & Submit
        return formData.agreeToTerms;
      default:
        return false;
    }
  };
  
  // Submit the application
  const submitApplication = async () => {
    if (!formData.agreeToTerms) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the terms and conditions to submit your application.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        toast({
          title: "Application Submitted!",
          description: "Your funding application has been successfully submitted. We'll be in touch soon!",
          variant: "default"
        });
        
        // Redirect to success page
        setLocation("/application-success");
      } else {
        toast({
          title: "Submission Failed",
          description: result.message || "There was an error submitting your application. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Jump to a specific step
  const goToStep = (step: number) => {
    // Only allow jumping to completed steps or the current step + 1
    if (completedSteps.includes(step) || step === currentStep || step === currentStep + 1) {
      setCurrentStep(step);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 sm:py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-neutral-900 mb-3">
                Funding Application
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
                Complete your application to get matched with the perfect funding solution for your business.
              </p>
            </div>
            
            {/* Gamified Progress Tracker */}
            <div className="mb-8">
              <GamifiedProgressTracker 
                currentStep={currentStep} 
                totalSteps={applicationSteps.length}
                completedItems={completedItems}
              />
            </div>
            
            {/* Step Navigation Tabs */}
            <div className="hidden md:flex mb-6 border-b">
              {applicationSteps.map((step, index) => (
                <button
                  key={step.id}
                  className={`flex items-center px-4 py-3 ${
                    currentStep === index + 1
                      ? 'border-b-2 border-primary text-primary font-medium'
                      : completedSteps.includes(index + 1)
                      ? 'border-b-2 border-success/30 text-success font-medium hover:text-primary hover:border-primary'
                      : 'text-neutral-500 hover:text-neutral-700'
                  } ${index + 1 > currentStep + 1 && !completedSteps.includes(index + 1) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => goToStep(index + 1)}
                  disabled={index + 1 > currentStep + 1 && !completedSteps.includes(index + 1)}
                >
                  <div className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center text-xs ${
                    completedSteps.includes(index + 1)
                      ? 'bg-success text-white'
                      : currentStep === index + 1
                      ? 'bg-primary text-white'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}>
                    {completedSteps.includes(index + 1) ? '✓' : index + 1}
                  </div>
                  <span>{step.title}</span>
                </button>
              ))}
            </div>
            
            {/* Mobile Steps */}
            <div className="md:hidden mb-4">
              <div className="bg-white shadow-sm rounded-lg p-3">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                    ${currentStep <= applicationSteps.length ? 'bg-primary text-white' : 'bg-success text-white'}`}>
                    {applicationSteps[currentStep - 1]?.icon || <CheckSquare className="h-4 w-4" />}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-neutral-900">
                      {currentStep <= applicationSteps.length ? applicationSteps[currentStep - 1]?.title : 'Complete'}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Step {currentStep} of {applicationSteps.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Application Form */}
            <Card className="shadow-md">
              <CardContent className="p-0">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="p-6 space-y-6">
                    <div className="flex items-center text-primary mb-4">
                      <UserPlus className="h-5 w-5 mr-2" />
                      <h2 className="text-xl font-semibold">Personal Information</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john.doe@example.com"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="844-985-4567"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Business Information */}
                {currentStep === 2 && (
                  <div className="p-6 space-y-6">
                    <div className="flex items-center text-primary mb-4">
                      <Building className="h-5 w-5 mr-2" />
                      <h2 className="text-xl font-semibold">Business Information</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          placeholder="Acme Inc."
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="businessType">Business Type</Label>
                          <Select
                            value={formData.businessType}
                            onValueChange={(value) => handleSelectChange('businessType', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                              <SelectItem value="corporation">Corporation</SelectItem>
                              <SelectItem value="s_corporation">S Corporation</SelectItem>
                              <SelectItem value="non_profit">Non-Profit</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="ein">EIN (Optional)</Label>
                          <Input
                            id="ein"
                            name="ein"
                            value={formData.ein}
                            onChange={handleInputChange}
                            placeholder="XX-XXXXXXX"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Business Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="169 Madison Ave"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="New York"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="NY"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            placeholder="10001"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Funding Details */}
                {currentStep === 3 && (
                  <div className="p-6 space-y-6">
                    <div className="flex items-center text-primary mb-4">
                      <DollarSign className="h-5 w-5 mr-2" />
                      <h2 className="text-xl font-semibold">Funding Details</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fundingAmount">Funding Amount Needed ($)</Label>
                          <Input
                            id="fundingAmount"
                            name="fundingAmount"
                            value={formData.fundingAmount}
                            onChange={handleInputChange}
                            placeholder="100000"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="fundingPurpose">Funding Purpose</Label>
                          <Select
                            value={formData.fundingPurpose}
                            onValueChange={(value) => handleSelectChange('fundingPurpose', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="working_capital">Working Capital</SelectItem>
                              <SelectItem value="equipment">Equipment Purchase</SelectItem>
                              <SelectItem value="inventory">Inventory</SelectItem>
                              <SelectItem value="expansion">Business Expansion</SelectItem>
                              <SelectItem value="real_estate">Commercial Real Estate</SelectItem>
                              <SelectItem value="refinancing">Debt Refinancing</SelectItem>
                              <SelectItem value="startup">Startup Costs</SelectItem>
                              <SelectItem value="marketing">Marketing & Advertising</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="timeInBusiness">Time in Business</Label>
                          <Select
                            value={formData.timeInBusiness}
                            onValueChange={(value) => handleSelectChange('timeInBusiness', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="startup">Startup / Not Yet Operating</SelectItem>
                              <SelectItem value="less_than_6">Less than 6 months</SelectItem>
                              <SelectItem value="6_to_12">6-12 months</SelectItem>
                              <SelectItem value="1_to_2">1-2 years</SelectItem>
                              <SelectItem value="2_to_5">2-5 years</SelectItem>
                              <SelectItem value="5_plus">5+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="annualRevenue">Annual Revenue</Label>
                          <Select
                            value={formData.annualRevenue}
                            onValueChange={(value) => handleSelectChange('annualRevenue', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select revenue" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pre_revenue">Pre-revenue</SelectItem>
                              <SelectItem value="under_100k">Under $100,000</SelectItem>
                              <SelectItem value="100k_to_500k">$100,000 - $500,000</SelectItem>
                              <SelectItem value="500k_to_1m">$500,000 - $1 million</SelectItem>
                              <SelectItem value="1m_to_5m">$1 million - $5 million</SelectItem>
                              <SelectItem value="5m_plus">$5 million+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="creditScore">Credit Score</Label>
                          <Select
                            value={formData.creditScore}
                            onValueChange={(value) => handleSelectChange('creditScore', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select score" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="poor">Poor (Below 580)</SelectItem>
                              <SelectItem value="fair">Fair (580-669)</SelectItem>
                              <SelectItem value="good">Good (670-739)</SelectItem>
                              <SelectItem value="very_good">Very Good (740-799)</SelectItem>
                              <SelectItem value="excellent">Excellent (800+)</SelectItem>
                              <SelectItem value="unknown">I don't know</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 4: Documentation */}
                {currentStep === 4 && (
                  <div className="p-6 space-y-6">
                    <div className="flex items-center text-primary mb-4">
                      <FileText className="h-5 w-5 mr-2" />
                      <h2 className="text-xl font-semibold">Documentation</h2>
                    </div>
                    
                    <p className="text-neutral-600 mb-4">
                      Having these documents ready will speed up your application. You'll be able to upload them after submission.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 bg-neutral-50 rounded-lg">
                        <Checkbox 
                          id="hasBusinessPlan" 
                          checked={formData.hasBusinessPlan}
                          onCheckedChange={(checked) => handleCheckboxChange('hasBusinessPlan', checked === true)}
                        />
                        <div className="space-y-1">
                          <Label 
                            htmlFor="hasBusinessPlan" 
                            className="font-medium text-neutral-900 cursor-pointer"
                          >
                            Business Plan
                          </Label>
                          <p className="text-sm text-neutral-500">
                            Include your business plan with projections for the next 1-3 years
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 bg-neutral-50 rounded-lg">
                        <Checkbox 
                          id="hasTaxReturns" 
                          checked={formData.hasTaxReturns}
                          onCheckedChange={(checked) => handleCheckboxChange('hasTaxReturns', checked === true)}
                        />
                        <div className="space-y-1">
                          <Label 
                            htmlFor="hasTaxReturns" 
                            className="font-medium text-neutral-900 cursor-pointer"
                          >
                            Tax Returns
                          </Label>
                          <p className="text-sm text-neutral-500">
                            Last 2 years of business and personal tax returns
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 bg-neutral-50 rounded-lg">
                        <Checkbox 
                          id="hasFinancialStatements" 
                          checked={formData.hasFinancialStatements}
                          onCheckedChange={(checked) => handleCheckboxChange('hasFinancialStatements', checked === true)}
                        />
                        <div className="space-y-1">
                          <Label 
                            htmlFor="hasFinancialStatements" 
                            className="font-medium text-neutral-900 cursor-pointer"
                          >
                            Financial Statements
                          </Label>
                          <p className="text-sm text-neutral-500">
                            Balance sheet, profit & loss statement, cash flow statement
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        placeholder="Is there anything else you'd like us to know about your funding needs?"
                        rows={4}
                      />
                    </div>
                  </div>
                )}
                
                {/* Step 5: Review & Submit */}
                {currentStep === 5 && (
                  <div className="p-6 space-y-6">
                    <div className="flex items-center text-primary mb-4">
                      <CheckSquare className="h-5 w-5 mr-2" />
                      <h2 className="text-xl font-semibold">Review & Submit</h2>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Personal Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Name:</span>
                            <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Email:</span>
                            <span className="font-medium">{formData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Phone:</span>
                            <span className="font-medium">{formData.phone}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Business Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Business Name:</span>
                            <span className="font-medium">{formData.businessName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Business Type:</span>
                            <span className="font-medium">{formData.businessType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Address:</span>
                            <span className="font-medium">{formData.address}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Location:</span>
                            <span className="font-medium">{formData.city}, {formData.state} {formData.zipCode}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Funding Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Amount Requested:</span>
                            <span className="font-medium">${formData.fundingAmount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Purpose:</span>
                            <span className="font-medium">{formData.fundingPurpose}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Time in Business:</span>
                            <span className="font-medium">{formData.timeInBusiness}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Annual Revenue:</span>
                            <span className="font-medium">{formData.annualRevenue}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-500">Credit Score:</span>
                            <span className="font-medium">{formData.creditScore}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Documentation</h3>
                        <div className="grid grid-cols-1 gap-y-2 text-sm">
                          <div className="flex items-center">
                            <div className={`h-4 w-4 rounded-full mr-2 ${formData.hasBusinessPlan ? 'bg-success' : 'bg-neutral-200'}`} />
                            <span className={formData.hasBusinessPlan ? 'font-medium' : 'text-neutral-500'}>
                              Business Plan
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className={`h-4 w-4 rounded-full mr-2 ${formData.hasTaxReturns ? 'bg-success' : 'bg-neutral-200'}`} />
                            <span className={formData.hasTaxReturns ? 'font-medium' : 'text-neutral-500'}>
                              Tax Returns
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className={`h-4 w-4 rounded-full mr-2 ${formData.hasFinancialStatements ? 'bg-success' : 'bg-neutral-200'}`} />
                            <span className={formData.hasFinancialStatements ? 'font-medium' : 'text-neutral-500'}>
                              Financial Statements
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {formData.additionalInfo && (
                        <>
                          <Separator />
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">Additional Information</h3>
                            <p className="text-sm text-neutral-700">{formData.additionalInfo}</p>
                          </div>
                        </>
                      )}
                      
                      <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id="agreeToTerms" 
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => handleCheckboxChange('agreeToTerms', checked === true)}
                          />
                          <div className="space-y-1">
                            <Label 
                              htmlFor="agreeToTerms" 
                              className="font-medium text-neutral-900 cursor-pointer"
                            >
                              Terms & Conditions
                            </Label>
                            <p className="text-sm text-neutral-500">
                              I agree to the <Link href="/terms" className="text-primary underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>. I authorize Better Capital Solutions to contact me and share my information with its lending partners.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between p-6 border-t">
                {currentStep > 1 ? (
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    className="w-full sm:w-auto order-2 sm:order-1"
                  >
                    Back
                  </Button>
                ) : (
                  <div className="hidden sm:block"></div> // Empty div for spacing on desktop only
                )}
                
                {currentStep < applicationSteps.length ? (
                  <Button 
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="w-full sm:w-auto order-1 sm:order-2"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button 
                    onClick={submitApplication}
                    disabled={isSubmitting || !formData.agreeToTerms}
                    className="w-full sm:w-auto order-1 sm:order-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            {/* Rewards Display */}
            {(currentStep > 1 || completedSteps.length > 0) && (
              <div className="mt-10">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-neutral-200">
                  <h3 className="text-lg font-medium mb-4">Your Application Progress Rewards</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={`p-4 rounded-lg text-center ${completedSteps.includes(1) ? 'bg-green-50 border border-green-100' : 'bg-neutral-50 border border-neutral-200'}`}>
                      <div className="mb-2 flex justify-center">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${completedSteps.includes(1) ? 'bg-success text-white' : 'bg-neutral-200 text-neutral-400'}`}>
                          <UserPlus className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="text-sm font-medium">Personal Details</div>
                      <div className="text-xs text-neutral-500 mt-1">
                        {completedSteps.includes(1) ? 'Completed!' : 'Not completed'}
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg text-center ${completedSteps.includes(2) ? 'bg-green-50 border border-green-100' : 'bg-neutral-50 border border-neutral-200'}`}>
                      <div className="mb-2 flex justify-center">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${completedSteps.includes(2) ? 'bg-success text-white' : 'bg-neutral-200 text-neutral-400'}`}>
                          <Building className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="text-sm font-medium">Business Details</div>
                      <div className="text-xs text-neutral-500 mt-1">
                        {completedSteps.includes(2) ? 'Completed!' : 'Not completed'}
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg text-center ${completedSteps.includes(3) ? 'bg-green-50 border border-green-100' : 'bg-neutral-50 border border-neutral-200'}`}>
                      <div className="mb-2 flex justify-center">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${completedSteps.includes(3) ? 'bg-success text-white' : 'bg-neutral-200 text-neutral-400'}`}>
                          <DollarSign className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="text-sm font-medium">Funding Details</div>
                      <div className="text-xs text-neutral-500 mt-1">
                        {completedSteps.includes(3) ? 'Completed!' : 'Not completed'}
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg text-center ${completedSteps.includes(4) ? 'bg-green-50 border border-green-100' : 'bg-neutral-50 border border-neutral-200'}`}>
                      <div className="mb-2 flex justify-center">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${completedSteps.includes(4) ? 'bg-success text-white' : 'bg-neutral-200 text-neutral-400'}`}>
                          <FileText className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="text-sm font-medium">Documentation</div>
                      <div className="text-xs text-neutral-500 mt-1">
                        {completedSteps.includes(4) ? 'Completed!' : 'Not completed'}
                      </div>
                    </div>
                  </div>
                  
                  {completedSteps.length >= 3 && (
                    <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-center">
                      <Award className="h-8 w-8 text-primary mr-4 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-primary">Achievement Unlocked: Funding Fast Track</h4>
                        <p className="text-sm text-neutral-600">You've qualified for expedited processing! Your application will be fast-tracked for review.</p>
                      </div>
                    </div>
                  )}
                  
                  {completedSteps.length === applicationSteps.length && (
                    <div className="mt-4 p-4 bg-success/5 border border-success/20 rounded-lg flex items-center">
                      <Trophy className="h-8 w-8 text-success mr-4 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-success">Achievement Unlocked: Funding Pro</h4>
                        <p className="text-sm text-neutral-600">Congratulations! You've completed your application with all required information.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FundingApplication;