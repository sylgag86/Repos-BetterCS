import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Confetti } from './ui/confetti';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

// Define the step interface
interface ApplicationStep {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  required: boolean;
  badgeText?: string;
  badgeColor?: string;
}

// Define the tracker props
interface ProgressTrackerProps {
  applicationId: string;
  loanType: string;
  onComplete?: () => void;
  onUpdate?: (progress: number) => void;
}

export const FundingProgressTracker: React.FC<ProgressTrackerProps> = ({
  applicationId,
  loanType,
  onComplete,
  onUpdate
}) => {
  // State for steps, current progress, celebration
  const [steps, setSteps] = useState<ApplicationStep[]>([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedStep, setSelectedStep] = useState<ApplicationStep | null>(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  
  // Generate steps based on loan type
  useEffect(() => {
    let applicationSteps: ApplicationStep[] = [];
    
    // Common steps for all loan types
    const commonSteps: ApplicationStep[] = [
      {
        id: 'profile',
        title: 'Complete Profile',
        description: 'Fill out your basic information and create your funding profile.',
        points: 10,
        completed: false,
        required: true,
        badgeText: 'Quick Win',
        badgeColor: 'bg-green-500'
      },
      {
        id: 'verify_identity',
        title: 'Verify Identity',
        description: 'Verify your identity to ensure security and compliance.',
        points: 15,
        completed: false,
        required: true
      }
    ];
    
    // Additional steps based on loan type
    if (loanType === 'business') {
      applicationSteps = [
        ...commonSteps,
        {
          id: 'business_details',
          title: 'Business Details',
          description: 'Provide information about your business structure, industry, and operations.',
          points: 20,
          completed: false,
          required: true
        },
        {
          id: 'financial_statements',
          title: 'Financial Statements',
          description: 'Upload your business financial statements for the past 2 years.',
          points: 25,
          completed: false,
          required: true,
          badgeText: 'Major Points',
          badgeColor: 'bg-blue-500'
        },
        {
          id: 'business_plan',
          title: 'Business Plan',
          description: 'Upload your business plan including projections and funding use details.',
          points: 20,
          completed: false,
          required: false,
          badgeText: 'Bonus',
          badgeColor: 'bg-purple-500'
        },
        {
          id: 'tax_returns',
          title: 'Tax Returns',
          description: 'Upload your business tax returns for the past 2 years.',
          points: 20,
          completed: false,
          required: true
        },
        {
          id: 'collateral',
          title: 'Collateral Information',
          description: 'Provide details about available collateral for your business loan.',
          points: 15,
          completed: false,
          required: false,
          badgeText: 'Bonus',
          badgeColor: 'bg-purple-500'
        },
        {
          id: 'loan_purpose',
          title: 'Loan Purpose Details',
          description: 'Explain in detail how you plan to use the funds.',
          points: 15,
          completed: false,
          required: true
        }
      ];
    } else if (loanType === 'personal') {
      applicationSteps = [
        ...commonSteps,
        {
          id: 'income_verification',
          title: 'Income Verification',
          description: 'Upload recent pay stubs, W-2s, or other proof of income.',
          points: 25,
          completed: false,
          required: true,
          badgeText: 'Major Points',
          badgeColor: 'bg-blue-500'
        },
        {
          id: 'credit_authorization',
          title: 'Credit Authorization',
          description: 'Authorize a credit check to proceed with your application.',
          points: 20,
          completed: false,
          required: true
        },
        {
          id: 'bank_statements',
          title: 'Bank Statements',
          description: 'Upload your bank statements for the past 3 months.',
          points: 15,
          completed: false,
          required: true
        },
        {
          id: 'references',
          title: 'Personal References',
          description: 'Provide contact information for personal references.',
          points: 10,
          completed: false,
          required: false,
          badgeText: 'Bonus',
          badgeColor: 'bg-purple-500'
        },
        {
          id: 'loan_purpose',
          title: 'Loan Purpose',
          description: 'Specify the purpose for your personal loan.',
          points: 15,
          completed: false,
          required: true
        }
      ];
    } else if (loanType === 'mortgage') {
      applicationSteps = [
        ...commonSteps,
        {
          id: 'income_verification',
          title: 'Income Verification',
          description: 'Upload recent pay stubs, W-2s, and tax returns for the past 2 years.',
          points: 25,
          completed: false,
          required: true,
          badgeText: 'Major Points',
          badgeColor: 'bg-blue-500'
        },
        {
          id: 'asset_documentation',
          title: 'Asset Documentation',
          description: 'Provide statements for all bank accounts, investments, and other assets.',
          points: 20,
          completed: false,
          required: true
        },
        {
          id: 'credit_authorization',
          title: 'Credit Authorization',
          description: 'Authorize a credit check to proceed with your application.',
          points: 15,
          completed: false,
          required: true
        },
        {
          id: 'property_information',
          title: 'Property Information',
          description: 'Provide details about the property you wish to purchase or refinance.',
          points: 20,
          completed: false,
          required: true
        },
        {
          id: 'down_payment',
          title: 'Down Payment Verification',
          description: 'Verify the source of your down payment funds.',
          points: 15,
          completed: false,
          required: true
        },
        {
          id: 'employment_history',
          title: 'Employment History',
          description: 'Provide your employment history for the past 2 years.',
          points: 15,
          completed: false,
          required: true
        },
        {
          id: 'debt_obligations',
          title: 'Current Debt Obligations',
          description: 'List all current debt obligations and monthly payments.',
          points: 10,
          completed: false,
          required: true
        }
      ];
    } else if (loanType === 'sba') {
      applicationSteps = [
        ...commonSteps,
        {
          id: 'business_details',
          title: 'Business Details',
          description: 'Provide information about your business structure, industry, and operations.',
          points: 20,
          completed: false,
          required: true
        },
        {
          id: 'financial_statements',
          title: 'Financial Statements',
          description: 'Upload your business financial statements for the past 3 years.',
          points: 25,
          completed: false,
          required: true,
          badgeText: 'Major Points',
          badgeColor: 'bg-blue-500'
        },
        {
          id: 'business_plan',
          title: 'Business Plan',
          description: 'Upload your business plan including projections and funding use details.',
          points: 20,
          completed: false,
          required: true
        },
        {
          id: 'personal_financial_statement',
          title: 'Personal Financial Statement',
          description: 'Complete a personal financial statement for all owners with 20% or more ownership.',
          points: 20,
          completed: false,
          required: true
        },
        {
          id: 'tax_returns',
          title: 'Tax Returns',
          description: 'Upload business and personal tax returns for the past 3 years.',
          points: 20,
          completed: false,
          required: true
        },
        {
          id: 'business_debt',
          title: 'Business Debt Schedule',
          description: 'Provide a detailed schedule of all business debts.',
          points: 15,
          completed: false,
          required: true
        },
        {
          id: 'collateral',
          title: 'Collateral Information',
          description: 'Provide details about available collateral for your SBA loan.',
          points: 15,
          completed: false,
          required: true
        },
        {
          id: 'ownership_info',
          title: 'Ownership Information',
          description: 'Complete information for all owners, including resumes and forms.',
          points: 15,
          completed: false,
          required: true
        },
        {
          id: 'business_licenses',
          title: 'Business Licenses & Certifications',
          description: 'Upload all relevant business licenses and certifications.',
          points: 10,
          completed: false,
          required: true
        }
      ];
    }
    
    // Calculate total points
    const totalPossiblePoints = applicationSteps.reduce((sum, step) => sum + step.points, 0);
    
    setSteps(applicationSteps);
    setTotalPoints(totalPossiblePoints);
    
    // For demo purposes, randomly complete some steps
    // In a real app, this would be loaded from backend data
    setTimeout(() => {
      const randomCompletion = applicationSteps.map(step => {
        // 30% chance to complete a step for demo purposes
        const randomComplete = Math.random() < 0.3;
        return {
          ...step,
          completed: randomComplete
        };
      });
      
      setSteps(randomCompletion);
      updateProgress(randomCompletion);
    }, 500);
    
  }, [loanType]);
  
  // Update progress when steps change
  const updateProgress = (currentSteps: ApplicationStep[]) => {
    const earnedPoints = currentSteps
      .filter(step => step.completed)
      .reduce((sum, step) => sum + step.points, 0);
    
    const newProgress = Math.round((earnedPoints / totalPoints) * 100);
    setCurrentProgress(newProgress);
    
    if (onUpdate) {
      onUpdate(newProgress);
    }
    
    // Check if all required steps are complete
    const allRequiredComplete = currentSteps
      .filter(step => step.required)
      .every(step => step.completed);
    
    if (allRequiredComplete && newProgress >= 100) {
      setShowCelebration(true);
      if (onComplete) onComplete();
    }
  };
  
  // Mark a step as complete
  const completeStep = (stepId: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    );
    
    setSteps(updatedSteps);
    updateProgress(updatedSteps);
    
    // Briefly show celebration for completing a step
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1500);
  };
  
  // Open step action modal
  const openStepAction = (step: ApplicationStep) => {
    setSelectedStep(step);
    setIsActionModalOpen(true);
  };
  
  // Sort steps by required first, then by completion status
  const sortedSteps = [...steps].sort((a, b) => {
    if (a.required && !b.required) return -1;
    if (!a.required && b.required) return 1;
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="flex flex-col md:flex-row items-center mb-8 gap-6">
        <div className="w-40 h-40">
          <CircularProgressbar
            value={currentProgress}
            text={`${currentProgress}%`}
            styles={buildStyles({
              pathColor: currentProgress < 25 ? '#f87171' : 
                         currentProgress < 50 ? '#fbbf24' :
                         currentProgress < 75 ? '#60a5fa' : '#4ade80',
              textColor: '#1f2937',
              trailColor: '#e5e7eb',
              textSize: '16px',
              pathTransitionDuration: 0.5,
            })}
          />
        </div>
        
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">Your Funding Application</h2>
          <p className="text-lg text-gray-600 mb-2">
            {currentProgress < 25 ? "Just getting started! Keep going!" : 
             currentProgress < 50 ? "You're making progress! Keep up the good work." :
             currentProgress < 75 ? "You're well on your way!" : 
             currentProgress < 100 ? "Almost there! Just a few more steps." :
             "Congratulations! Your application is complete!"}
          </p>
          
          {/* Summary stats */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <Badge variant="outline" className="px-3 py-1 text-sm bg-blue-50">
              <span className="font-semibold">{steps.filter(s => s.completed).length}</span> of {steps.length} tasks completed
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-sm bg-green-50">
              <span className="font-semibold">{steps.filter(s => s.required && !s.completed).length}</span> required tasks remaining
            </Badge>
            {steps.some(s => !s.required && !s.completed) && (
              <Badge variant="outline" className="px-3 py-1 text-sm bg-purple-50">
                <span className="font-semibold">{steps.filter(s => !s.required && !s.completed).length}</span> bonus tasks available
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      {/* Confetti celebration */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            <Confetti />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {sortedSteps.map((step) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`transition-all duration-300 ${
              step.completed 
                ? 'bg-green-50 border-green-200' 
                : step.required 
                  ? 'bg-white border-gray-200' 
                  : 'bg-purple-50 border-purple-200'
            }`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    {step.completed ? (
                      <span className="text-green-500 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </span>
                    ) : (
                      <span className="text-gray-400 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                      </span>
                    )}
                    {step.title}
                  </CardTitle>
                  {step.badgeText && (
                    <Badge className={step.badgeColor || 'bg-blue-500'}>
                      {step.badgeText}
                    </Badge>
                  )}
                </div>
                <CardDescription>
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <div className="w-full flex justify-between items-center">
                  <Badge variant="outline" className="bg-white">
                    {step.points} Points
                  </Badge>
                  <Button 
                    variant={step.completed ? "outline" : "default"}
                    size="sm"
                    onClick={() => openStepAction(step)}
                    disabled={step.completed}
                  >
                    {step.completed ? "Completed" : "Complete Now"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Action Modal */}
      {isActionModalOpen && selectedStep && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-xl w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-xl font-bold mb-2">{selectedStep.title}</h3>
            <p className="text-gray-600 mb-4">{selectedStep.description}</p>
            
            {/* In a real app, this would be a form or upload component */}
            <div className="mb-6">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-md text-center">
                <p className="text-gray-700">For demonstration purposes, this step will be marked as complete immediately.</p>
                <p className="text-gray-500 text-sm mt-2">In a real application, this would contain the necessary form fields or file upload components for this step.</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsActionModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  completeStep(selectedStep.id);
                  setIsActionModalOpen(false);
                }}
              >
                Mark Complete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Progress Footer */}
      {currentProgress >= 100 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
        >
          <h3 className="text-2xl font-bold text-green-800 mb-2">Application Complete!</h3>
          <p className="text-green-700 mb-4">Your funding application has been submitted successfully.</p>
          <Button className="bg-green-600 hover:bg-green-700">
            View Application Status
          </Button>
        </motion.div>
      )}
    </div>
  );
};

// Simple confetti component
const Confetti: React.FC = () => {
  return (
    <div className="confetti-container">
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
            backgroundColor: [
              '#f87171', '#fbbf24', '#60a5fa', '#4ade80', '#c084fc',
              '#f472b6', '#34d399', '#a78bfa', '#93c5fd', '#fcd34d'
            ][Math.floor(Math.random() * 10)],
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            animation: `fall ${Math.random() * 3 + 2}s linear`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      <style jsx>{`
        .confetti-container {
          position: fixed;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 9999;
          pointer-events: none;
        }
        
        .confetti {
          position: absolute;
          z-index: 1;
          animation-iteration-count: infinite;
          border-radius: 50%;
        }
        
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};