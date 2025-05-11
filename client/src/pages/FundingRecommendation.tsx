import React, { useState } from 'react';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { apiRequest } from '@/lib/queryClient';
import { Loader2, AlertCircle, CheckCircle2, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Recommendation {
  lenderId: string;
  lenderName: string;
  matchScore: number;
  reasoning: string;
  keyBenefits: string[];
  lenderDetails: {
    category: string;
    rating: number;
    reviews: number;
    approvalTime: string;
    features: string[];
    slug: string;
    website: string;
  };
}

interface RecommendationResponse {
  recommendations: Recommendation[];
  generalAdvice: string;
}

const FundingRecommendation = () => {
  // Form state
  const [formData, setFormData] = useState({
    businessType: '',
    industry: '',
    fundingPurpose: '',
    creditScore: 650,
    annualRevenue: '',
    timeInBusiness: '',
    fundingAmount: '',
    fundingTimeframe: '',
    preferredFundingType: '',
    additionalContext: '',
  });

  // Loading state and results
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle slider change for credit score
  const handleCreditScoreChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, creditScore: value[0] }));
  };

  // Progress to next step
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  // Go back to previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
        {hasHalfStar && (
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-amber-400" />
        ))}
      </div>
    );
  };

  // Submit form to get recommendations
  const submitForm = async () => {
    try {
      setIsLoading(true);
      
      // Convert string values to numbers where appropriate
      const processedData = {
        ...formData,
        annualRevenue: formData.annualRevenue ? parseInt(formData.annualRevenue) : undefined,
        timeInBusiness: formData.timeInBusiness ? parseInt(formData.timeInBusiness) : undefined,
        fundingAmount: formData.fundingAmount ? parseInt(formData.fundingAmount) : undefined,
      };
      
      const response = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to get recommendations');
      }
      
      setRecommendations(data.data);
      setShowResults(true);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to get recommendations',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 sm:py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-10">
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-neutral-900 mb-3 sm:mb-4">
                AI-Powered Funding Recommendation
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-2">
                Answer a few questions about your business and funding needs, and our AI will analyze your situation to provide tailored funding recommendations.
              </p>
            </div>
            
            {!showResults ? (
              <Card className="shadow-lg">
                <CardHeader className="px-4 sm:px-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                    <div className="flex space-x-2">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-500'}`}>1</div>
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-500'}`}>2</div>
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-500'}`}>3</div>
                    </div>
                    <div className="text-sm text-neutral-500">Step {currentStep} of 3</div>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl">
                    {currentStep === 1 && "Business Information"}
                    {currentStep === 2 && "Funding Details"}
                    {currentStep === 3 && "Additional Information"}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    {currentStep === 1 && "Tell us about your business to help us find appropriate funding options."}
                    {currentStep === 2 && "Provide details about your funding needs."}
                    {currentStep === 3 && "Additional context to refine your recommendations."}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="px-4 sm:px-6">
                  {currentStep === 1 && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="businessType" className="text-sm sm:text-base">Business Type</Label>
                          <Select 
                            value={formData.businessType}
                            onValueChange={(value) => handleSelectChange('businessType', value)}
                          >
                            <SelectTrigger className="h-10 sm:h-11">
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="startup">Startup (Less than 1 year)</SelectItem>
                              <SelectItem value="small_business">Small Business</SelectItem>
                              <SelectItem value="mid_size">Mid-size Company</SelectItem>
                              <SelectItem value="established">Established Business</SelectItem>
                              <SelectItem value="sole_proprietor">Sole Proprietor</SelectItem>
                              <SelectItem value="non_profit">Non-Profit</SelectItem>
                              <SelectItem value="individual">Individual (Personal funding)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="industry" className="text-sm sm:text-base">Industry</Label>
                          <Select 
                            value={formData.industry}
                            onValueChange={(value) => handleSelectChange('industry', value)}
                          >
                            <SelectTrigger className="h-10 sm:h-11">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                              <SelectItem value="retail">Retail</SelectItem>
                              <SelectItem value="food_service">Food Service / Restaurant</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              <SelectItem value="construction">Construction</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="technology">Technology</SelectItem>
                              <SelectItem value="professional_services">Professional Services</SelectItem>
                              <SelectItem value="real_estate">Real Estate</SelectItem>
                              <SelectItem value="finance">Finance / Insurance</SelectItem>
                              <SelectItem value="transportation">Transportation / Logistics</SelectItem>
                              <SelectItem value="education">Education</SelectItem>
                              <SelectItem value="non_profit">Non-Profit</SelectItem>
                              <SelectItem value="personal">Personal (Non-Business)</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2 py-2">
                        <Label htmlFor="creditScore" className="text-sm sm:text-base">
                          Approximate Credit Score: <span className="font-semibold">{formData.creditScore}</span>
                        </Label>
                        <Slider
                          value={[formData.creditScore]}
                          min={300}
                          max={850}
                          step={10}
                          onValueChange={handleCreditScoreChange}
                          className="my-4"
                        />
                        <div className="flex justify-between text-xs sm:text-sm text-neutral-500 mt-1">
                          <span>Poor</span>
                          <span>Fair</span>
                          <span>Good</span>
                          <span>Excellent</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="annualRevenue" className="text-sm sm:text-base">Annual Revenue ($)</Label>
                          <Input
                            id="annualRevenue"
                            name="annualRevenue"
                            type="number"
                            placeholder="e.g., 250000"
                            value={formData.annualRevenue}
                            onChange={handleInputChange}
                            className="h-10 sm:h-11"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="timeInBusiness" className="text-sm sm:text-base">Time in Business (months)</Label>
                          <Input
                            id="timeInBusiness"
                            name="timeInBusiness"
                            type="number"
                            placeholder="e.g., 36"
                            value={formData.timeInBusiness}
                            onChange={handleInputChange}
                            className="h-10 sm:h-11"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentStep === 2 && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="fundingAmount" className="text-sm sm:text-base">Funding Amount Needed ($)</Label>
                          <Input
                            id="fundingAmount"
                            name="fundingAmount"
                            type="number"
                            placeholder="e.g., 100000"
                            value={formData.fundingAmount}
                            onChange={handleInputChange}
                            className="h-10 sm:h-11"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="fundingPurpose" className="text-sm sm:text-base">Funding Purpose</Label>
                          <Select 
                            value={formData.fundingPurpose}
                            onValueChange={(value) => handleSelectChange('fundingPurpose', value)}
                          >
                            <SelectTrigger className="h-10 sm:h-11">
                              <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                              <SelectItem value="startup_costs">Startup Costs</SelectItem>
                              <SelectItem value="expansion">Business Expansion</SelectItem>
                              <SelectItem value="equipment">Equipment Purchase</SelectItem>
                              <SelectItem value="inventory">Inventory</SelectItem>
                              <SelectItem value="working_capital">Working Capital</SelectItem>
                              <SelectItem value="debt_refinancing">Debt Refinancing</SelectItem>
                              <SelectItem value="real_estate">Commercial Real Estate</SelectItem>
                              <SelectItem value="marketing">Marketing/Advertising</SelectItem>
                              <SelectItem value="hiring">Hiring/Staffing</SelectItem>
                              <SelectItem value="emergency">Emergency Funds</SelectItem>
                              <SelectItem value="acquisition">Business Acquisition</SelectItem>
                              <SelectItem value="renovation">Renovation</SelectItem>
                              <SelectItem value="research">Research & Development</SelectItem>
                              <SelectItem value="personal">Personal Use</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="fundingTimeframe" className="text-sm sm:text-base">Funding Timeframe</Label>
                          <Select 
                            value={formData.fundingTimeframe}
                            onValueChange={(value) => handleSelectChange('fundingTimeframe', value)}
                          >
                            <SelectTrigger className="h-10 sm:h-11">
                              <SelectValue placeholder="Select timeframe" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">Immediate (ASAP)</SelectItem>
                              <SelectItem value="1_week">Within 1 week</SelectItem>
                              <SelectItem value="2_weeks">Within 2 weeks</SelectItem>
                              <SelectItem value="30_days">Within 30 days</SelectItem>
                              <SelectItem value="1_3_months">1-3 months</SelectItem>
                              <SelectItem value="3_6_months">3-6 months</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="preferredFundingType" className="text-sm sm:text-base">Preferred Funding Type</Label>
                          <Select 
                            value={formData.preferredFundingType}
                            onValueChange={(value) => handleSelectChange('preferredFundingType', value)}
                          >
                            <SelectTrigger className="h-10 sm:h-11">
                              <SelectValue placeholder="Select preferred type" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                              <SelectItem value="term_loan">Term Loan</SelectItem>
                              <SelectItem value="line_of_credit">Line of Credit</SelectItem>
                              <SelectItem value="sba_loan">SBA Loan</SelectItem>
                              <SelectItem value="equipment_financing">Equipment Financing</SelectItem>
                              <SelectItem value="invoice_factoring">Invoice Factoring</SelectItem>
                              <SelectItem value="merchant_cash_advance">Merchant Cash Advance</SelectItem>
                              <SelectItem value="business_credit_card">Business Credit Card</SelectItem>
                              <SelectItem value="real_estate_loan">Commercial Real Estate Loan</SelectItem>
                              <SelectItem value="personal_loan">Personal Loan</SelectItem>
                              <SelectItem value="no_preference">No Preference</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentStep === 3 && (
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="additionalContext" className="text-sm sm:text-base">
                          Additional Context (Optional)
                        </Label>
                        <Textarea
                          id="additionalContext"
                          name="additionalContext"
                          placeholder="Share any additional information that might help us provide better recommendations..."
                          value={formData.additionalContext}
                          onChange={handleInputChange}
                          rows={4}
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div className="bg-neutral-50 p-3 sm:p-4 rounded-lg border border-neutral-200">
                        <h3 className="font-medium text-neutral-900 mb-3 text-sm sm:text-base">Information Review</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 text-xs sm:text-sm">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-neutral-500 mb-1 sm:mb-0">Business Type:</span>
                            <span className="font-medium">{formData.businessType || 'Not specified'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-neutral-500 mb-1 sm:mb-0">Industry:</span>
                            <span className="font-medium">{formData.industry || 'Not specified'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-neutral-500 mb-1 sm:mb-0">Credit Score:</span>
                            <span className="font-medium">{formData.creditScore}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-neutral-500 mb-1 sm:mb-0">Annual Revenue:</span>
                            <span className="font-medium">
                              {formData.annualRevenue ? `$${parseInt(formData.annualRevenue).toLocaleString()}` : 'Not specified'}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-neutral-500 mb-1 sm:mb-0">Time in Business:</span>
                            <span className="font-medium">
                              {formData.timeInBusiness ? `${formData.timeInBusiness} months` : 'Not specified'}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-neutral-500 mb-1 sm:mb-0">Funding Amount:</span>
                            <span className="font-medium">
                              {formData.fundingAmount ? `$${parseInt(formData.fundingAmount).toLocaleString()}` : 'Not specified'}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-neutral-500 mb-1 sm:mb-0">Funding Purpose:</span>
                            <span className="font-medium">{formData.fundingPurpose || 'Not specified'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-neutral-500 mb-1 sm:mb-0">Timeframe:</span>
                            <span className="font-medium">{formData.fundingTimeframe || 'Not specified'}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-neutral-500 mb-1 sm:mb-0">Preferred Type:</span>
                            <span className="font-medium">{formData.preferredFundingType || 'Not specified'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between px-4 sm:px-6">
                  {currentStep > 1 ? (
                    <Button 
                      variant="outline" 
                      onClick={prevStep}
                      className="w-full sm:w-auto order-2 sm:order-1"
                    >
                      <i className="fas fa-arrow-left mr-2 sm:mr-1"></i>
                      Back
                    </Button>
                  ) : (
                    <div className="hidden sm:block"></div> // Empty div for spacing on desktop only
                  )}
                  
                  {currentStep < 3 ? (
                    <Button 
                      onClick={nextStep}
                      className="w-full sm:w-auto order-1 sm:order-2"
                    >
                      Continue
                      <i className="fas fa-arrow-right ml-2 sm:ml-1"></i>
                    </Button>
                  ) : (
                    <Button 
                      onClick={submitForm} 
                      disabled={isLoading}
                      className="w-full sm:w-auto order-1 sm:order-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Get Recommendations
                          <i className="fas fa-magic ml-2"></i>
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ) : (
              <div className="space-y-8">
                <Card className="shadow-lg">
                  <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="text-xl sm:text-2xl">Your Personalized Funding Recommendations</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Based on your inputs, our AI has identified the following funding options as the best match for your situation.
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="px-4 sm:px-6">
                    <div className="bg-neutral-50 p-3 sm:p-4 rounded-lg border border-neutral-200 mb-5 sm:mb-6">
                      <h3 className="font-medium text-neutral-900 mb-2 text-sm sm:text-base">Expert Advice</h3>
                      <p className="text-neutral-700 text-xs sm:text-sm">{recommendations?.generalAdvice}</p>
                    </div>
                    
                    <div className="space-y-5 sm:space-y-6">
                      {recommendations?.recommendations.map((rec, index) => (
                        <Card key={index} className={`border-l-4 ${index === 0 ? 'border-l-primary' : index === 1 ? 'border-l-accent' : 'border-l-neutral-400'}`}>
                          <CardHeader className="pb-2 px-3 sm:px-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="text-xs sm:text-sm font-medium text-neutral-500 mb-1">
                                  {index === 0 ? 'Best Match' : index === 1 ? 'Strong Alternative' : 'Good Option'}
                                </div>
                                <CardTitle className="text-lg sm:text-xl">{rec.lenderName}</CardTitle>
                              </div>
                              <div className="bg-neutral-100 text-primary font-bold text-base sm:text-lg py-1 px-2 sm:px-3 rounded-full">
                                {rec.matchScore}%
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="pt-2 px-3 sm:px-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                              <div>
                                <h4 className="text-xs sm:text-sm font-medium text-neutral-500 mb-2">Why It's a Good Match</h4>
                                <p className="text-neutral-700 text-xs sm:text-sm mb-4">{rec.reasoning}</p>
                                
                                <h4 className="text-xs sm:text-sm font-medium text-neutral-500 mb-2">Key Benefits</h4>
                                <ul className="space-y-1 mb-4">
                                  {rec.keyBenefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start text-xs sm:text-sm">
                                      <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-success mr-1 sm:mr-2 mt-0.5" />
                                      <span>{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="bg-neutral-50 p-3 sm:p-4 rounded-lg">
                                <h4 className="text-xs sm:text-sm font-medium text-neutral-500 mb-2">Lender Details</h4>
                                <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-sm mb-3 sm:mb-4">
                                  <div className="flex flex-col mb-1">
                                    <span className="text-neutral-500 mb-0.5">Category:</span>
                                    <div className="font-medium text-wrap break-words max-w-full">{rec.lenderDetails.category}</div>
                                  </div>
                                  <div className="flex flex-col mb-1">
                                    <span className="text-neutral-500 mb-0.5">Rating:</span>
                                    <div className="flex items-center">
                                      {renderStars(rec.lenderDetails.rating)}
                                      <span className="ml-1 font-medium">{rec.lenderDetails.rating}</span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col mb-1">
                                    <span className="text-neutral-500 mb-0.5">Reviews:</span>
                                    <div className="font-medium">{rec.lenderDetails.reviews}</div>
                                  </div>
                                  <div className="flex flex-col mb-1">
                                    <span className="text-neutral-500 mb-0.5">Approval:</span>
                                    <div className="font-medium">{rec.lenderDetails.approvalTime}</div>
                                  </div>
                                </div>
                                
                                <h4 className="text-xs sm:text-sm font-medium text-neutral-500 mb-2">Features</h4>
                                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                                  {rec.lenderDetails.features.map((feature, i) => (
                                    <span key={i} className="bg-white text-primary text-[10px] sm:text-xs py-1 px-2 rounded-full border border-primary/20">
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
                                  <a 
                                    href={`/lenders/${rec.lenderDetails.slug}.html`} 
                                    target="_blank"
                                    className="text-center flex-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-primary border border-primary hover:bg-primary/5 transition-colors rounded-lg font-medium text-xs sm:text-sm"
                                  >
                                    View Profile
                                  </a>
                                  <a 
                                    href={rec.lenderDetails.website} 
                                    target="_blank"
                                    className="text-center flex-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary hover:bg-primary/90 text-white transition-colors rounded-lg font-medium text-xs sm:text-sm"
                                  >
                                    Apply Now
                                  </a>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-4 sm:px-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowResults(false)}
                      className="w-full sm:w-auto order-2 sm:order-1"
                    >
                      <i className="fas fa-arrow-left mr-2 hidden sm:inline-block"></i>
                      Modify Your Inputs
                    </Button>
                    <Link href="/betterlist-100.html" className="flex-1 sm:flex-none order-1 sm:order-2">
                      <Button 
                        variant="default"
                        className="w-full"
                      >
                        Explore All Lenders
                        <i className="fas fa-arrow-right ml-2 hidden sm:inline-block"></i>
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
                
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-neutral-200">
                  <h2 className="text-lg sm:text-xl font-heading font-bold text-neutral-900 mb-3 sm:mb-4">Don't See What You're Looking For?</h2>
                  <p className="text-sm sm:text-base text-neutral-600 mb-4">
                    Our funding specialists can help you find the perfect funding solution for your unique situation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Link href="/contact" className="flex-1 order-2 sm:order-1">
                      <Button variant="outline" className="w-full text-sm h-10 sm:h-11">
                        <i className="fas fa-headset mr-2"></i>
                        Contact a Specialist
                      </Button>
                    </Link>
                    <Link href="/funding-funnel/index.html" className="flex-1 order-1 sm:order-2">
                      <Button variant="default" className="w-full text-sm h-10 sm:h-11">
                        <i className="fas fa-filter mr-2"></i>
                        Find More Options
                      </Button>
                    </Link>
                  </div>
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

export default FundingRecommendation;