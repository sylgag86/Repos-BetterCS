import { Router, Request, Response } from 'express';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the router
const router = Router();

// Interface for funding recommendation request
interface FundingRecommendationRequest {
  businessType?: string;      // "small_business", "startup", "established", etc.
  industry?: string;          // "retail", "tech", "healthcare", etc.
  fundingPurpose?: string;    // "expansion", "equipment", "working_capital", etc.
  creditScore?: number;       // Credit score (e.g., 650)
  annualRevenue?: number;     // Annual revenue in dollars
  timeInBusiness?: number;    // Time in business in months
  fundingAmount?: number;     // Desired funding amount in dollars
  fundingTimeframe?: string;  // "immediate", "1_3_months", "3_6_months", etc.
  preferredFundingType?: string; // "loan", "line_of_credit", "sba", etc.
  additionalContext?: string; // Any additional information
}

// Function to load lender data
const loadLenders = async (): Promise<any[]> => {
  try {
    const dataPath = path.join(process.cwd(), 'server', 'data', 'lenders.json');
    const data = await fs.promises.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading lender data:', error);
    return [];
  }
};

// Endpoint for personalized funding recommendations
router.post('/recommendations', async (req: Request, res: Response) => {
  try {
    const userInput: FundingRecommendationRequest = req.body;
    
    // Load lenders data
    const lenders = await loadLenders();
    
    if (!lenders || lenders.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'Unable to load lender data',
      });
    }

    // Create a simplified version of lenders data to send to OpenAI
    // (to keep the prompt size manageable)
    const simplifiedLenders = lenders.map(lender => ({
      id: lender.id,
      name: lender.name,
      category: lender.category,
      rating: lender.rating,
      creditMin: lender.creditMin,
      maxFunding: lender.maxFunding,
      features: lender.features,
      betterList100: lender.betterList100,
    }));

    // Construct a prompt for OpenAI based on user input
    let prompt = `Based on the following user information, recommend the top 3 most suitable funding options from the provided lender list. Provide a detailed explanation for each recommendation, highlighting why it's a good match for the user's specific situation.

User Information:
`;
    
    // Add user details to the prompt
    if (userInput.businessType) {
      prompt += `Business Type: ${userInput.businessType}\n`;
    }
    if (userInput.industry) {
      prompt += `Industry: ${userInput.industry}\n`;
    }
    if (userInput.fundingPurpose) {
      prompt += `Funding Purpose: ${userInput.fundingPurpose}\n`;
    }
    if (userInput.creditScore) {
      prompt += `Credit Score: ${userInput.creditScore}\n`;
    }
    if (userInput.annualRevenue) {
      prompt += `Annual Revenue: $${userInput.annualRevenue.toLocaleString()}\n`;
    }
    if (userInput.timeInBusiness) {
      prompt += `Time in Business: ${userInput.timeInBusiness} months\n`;
    }
    if (userInput.fundingAmount) {
      prompt += `Desired Funding Amount: $${userInput.fundingAmount.toLocaleString()}\n`;
    }
    if (userInput.fundingTimeframe) {
      prompt += `Funding Timeframe: ${userInput.fundingTimeframe}\n`;
    }
    if (userInput.preferredFundingType) {
      prompt += `Preferred Funding Type: ${userInput.preferredFundingType}\n`;
    }
    if (userInput.additionalContext) {
      prompt += `Additional Context: ${userInput.additionalContext}\n`;
    }
    
    prompt += `\nAvailable Lenders:\n${JSON.stringify(simplifiedLenders, null, 2)}\n\n`;
    
    prompt += `Format your response as JSON with the following structure:
{
  "recommendations": [
    {
      "lenderId": "the-lender-id",
      "lenderName": "Lender Name",
      "matchScore": 95, // A score between 0-100 indicating how well this matches
      "reasoning": "Detailed explanation of why this lender is recommended",
      "keyBenefits": ["Benefit 1", "Benefit 2", "Benefit 3"]
    },
    // Two more recommendations...
  ],
  "generalAdvice": "General advice based on the user's situation"
}

Only include lenders that are truly suitable for the user's situation. The response should be valid JSON.`;

    // Request completion from OpenAI
    // The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are an expert in small business financing and personal loans, specializing in matching businesses and individuals with the most suitable funding options." 
        },
        { 
          role: "user", 
          content: prompt 
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2, // Lower temperature for more consistent, focused responses
    });

    // Get the response content
    const aiResponse = completion.choices[0].message.content;
    
    // Parse the JSON response
    const recommendations = JSON.parse(aiResponse || '{}');
    
    // Enhance the recommendations with full lender data
    if (recommendations.recommendations) {
      recommendations.recommendations = recommendations.recommendations.map((rec: any) => {
        const fullLenderData = lenders.find((l: any) => l.id === rec.lenderId) || {};
        return {
          ...rec,
          lenderDetails: {
            category: fullLenderData.category,
            rating: fullLenderData.rating,
            reviews: fullLenderData.reviews,
            approvalTime: fullLenderData.approvalTime,
            features: fullLenderData.features,
            slug: fullLenderData.slug,
            website: fullLenderData.website,
          },
        };
      });
    }
    
    // Send the enhanced recommendations to the client
    res.json({
      success: true,
      data: recommendations,
    });
    
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get funding recommendations',
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;