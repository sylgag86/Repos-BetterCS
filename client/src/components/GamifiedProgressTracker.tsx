import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { BadgeCheck, Award, Star, Trophy, Rocket } from 'lucide-react';

interface GamifiedProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  completedItems?: string[];
  showRewards?: boolean;
}

const GamifiedProgressTracker: React.FC<GamifiedProgressTrackerProps> = ({
  currentStep,
  totalSteps,
  completedItems = [],
  showRewards = true
}) => {
  const [progress, setProgress] = useState(0);
  const [milestoneReached, setMilestoneReached] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  
  // Calculate percentage complete
  const percentComplete = Math.round((currentStep / totalSteps) * 100);
  
  // Define milestones with their respective badges
  const milestones = [
    { 
      threshold: 25, 
      badge: <Star className="h-6 w-6 text-yellow-400" />, 
      title: "Getting Started",
      description: "You've taken the first step towards finding the right funding!" 
    },
    { 
      threshold: 50, 
      badge: <BadgeCheck className="h-6 w-6 text-blue-500" />, 
      title: "Halfway There",
      description: "You're making excellent progress on your funding journey." 
    },
    { 
      threshold: 75, 
      badge: <Award className="h-6 w-6 text-purple-500" />, 
      title: "Almost Complete",
      description: "Just a few more steps to discover your perfect funding match!" 
    },
    { 
      threshold: 100, 
      badge: <Trophy className="h-6 w-6 text-amber-500" />, 
      title: "Funding Ready",
      description: "Congratulations! You've completed all the steps." 
    }
  ];
  
  // Find the current milestone
  const currentMilestone = milestones.filter(m => percentComplete >= m.threshold).pop();
  
  // Animate progress when the component mounts or when the currentStep changes
  useEffect(() => {
    setProgress(0);
    setAnimateProgress(true);
    
    const timer = setTimeout(() => {
      setProgress(percentComplete);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [currentStep, totalSteps, percentComplete]);
  
  // Show milestone animation when a new milestone is reached
  useEffect(() => {
    if (currentMilestone && percentComplete > 0) {
      setMilestoneReached(true);
      
      const timer = setTimeout(() => {
        setMilestoneReached(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [currentMilestone, percentComplete]);
  
  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Application Progress</h3>
        <div className="flex items-center space-x-1 text-sm">
          <span className="font-semibold">{percentComplete}%</span>
          <span className="text-neutral-500">Complete</span>
        </div>
      </div>
      
      <div className="relative">
        {/* Main progress bar */}
        <Progress 
          value={progress} 
          className={`h-3 transition-all duration-1000 ${animateProgress ? 'ease-out' : ''}`} 
        />
        
        {/* Milestone markers */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between px-1 -mt-3.5 pointer-events-none">
          {milestones.map((milestone, index) => (
            <div 
              key={index}
              className={`relative ${index === milestones.length - 1 ? 'mr-1' : ''}`}
              style={{ left: `${milestone.threshold - (index === milestones.length - 1 ? 4 : 2)}%` }}
            >
              <div 
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-500 
                  ${percentComplete >= milestone.threshold ? 'bg-primary text-white scale-100' : 'bg-neutral-200 text-neutral-400 scale-75'}`}
              >
                {percentComplete >= milestone.threshold ? milestone.badge : <div className="h-3 w-3 rounded-full bg-current" />}
              </div>
              {percentComplete >= milestone.threshold && (
                <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="text-xs font-semibold text-primary">{milestone.threshold}%</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Completed items */}
      {completedItems.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-neutral-700">Completed Items:</h4>
          <ul className="space-y-1">
            {completedItems.map((item, index) => (
              <li key={index} className="flex items-center text-sm">
                <BadgeCheck className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Current milestone and rewards (conditionally shown) */}
      {showRewards && currentMilestone && (
        <div className={`bg-neutral-50 border border-neutral-200 rounded-lg p-4 mt-6 transition-all duration-500 
          ${milestoneReached ? 'scale-105 shadow-md' : 'scale-100'}`}>
          <div className="flex items-center">
            <div className="mr-3 flex-shrink-0">
              {currentMilestone.badge}
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">{currentMilestone.title}</h3>
              <p className="text-sm text-neutral-600">{currentMilestone.description}</p>
            </div>
          </div>
          
          {/* Next milestone preview (when not at 100%) */}
          {percentComplete < 100 && (
            <div className="mt-3 pt-3 border-t border-neutral-200">
              <div className="flex items-center">
                <Rocket className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium">
                  Next milestone: {
                    milestones.find(m => m.threshold > percentComplete)?.threshold || 100
                  }% Complete
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GamifiedProgressTracker;