import { Router, Request, Response } from 'express';
import OpenAI from 'openai';

const router = Router();

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Sample lender data for AI recommendations (in a production app, this would come from a database)
const lenderData = [
  {
    id: "fundgrow",
    name: "FundGrow",
    category: "Business Term Loans",
    minCreditScore: 680,
    minAnnualRevenue: 100000,
    minTimeInBusiness: 6,
    fundingRange: [25000, 500000],
    fundingTimeframe: "3_6_months",
    bestFor: ["expansion", "equipment", "working_capital"],
    industries: ["retail", "food_service", "professional_services", "manufacturing"],
    rating: 4.8,
    reviews: 357,
    approvalTime: "2-3 weeks",
    features: ["Low interest rates", "Flexible terms", "No prepayment penalty"],
    slug: "fundgrow",
    website: "https://www.fundgrow.example.com"
  },
  {
    id: "capitalprime",
    name: "Capital Prime",
    category: "Business Line of Credit",
    minCreditScore: 650,
    minAnnualRevenue: 75000,
    minTimeInBusiness: 12,
    fundingRange: [10000, 250000],
    fundingTimeframe: "1_3_months",
    bestFor: ["working_capital", "inventory", "emergency"],
    industries: ["retail", "technology", "healthcare", "professional_services"],
    rating: 4.5,
    reviews: 295,
    approvalTime: "1-2 weeks",
    features: ["Revolving credit", "Draw as needed", "Only pay interest on what you use"],
    slug: "capitalprime",
    website: "https://www.capitalprime.example.com"
  },
  {
    id: "speedfund",
    name: "SpeedFund",
    category: "Merchant Cash Advance",
    minCreditScore: 550,
    minAnnualRevenue: 50000,
    minTimeInBusiness: 3,
    fundingRange: [5000, 100000],
    fundingTimeframe: "immediate",
    bestFor: ["emergency", "working_capital", "inventory"],
    industries: ["retail", "food_service", "transportation"],
    rating: 4.1,
    reviews: 418,
    approvalTime: "1-3 days",
    features: ["Fast funding", "Easy application", "Bad credit OK"],
    slug: "speedfund",
    website: "https://www.speedfund.example.com"
  },
  {
    id: "equipfinance",
    name: "EquipFinance",
    category: "Equipment Financing",
    minCreditScore: 620,
    minAnnualRevenue: 100000,
    minTimeInBusiness: 12,
    fundingRange: [25000, 1000000],
    fundingTimeframe: "30_days",
    bestFor: ["equipment"],
    industries: ["construction", "manufacturing", "transportation", "healthcare"],
    rating: 4.7,
    reviews: 211,
    approvalTime: "1-2 weeks",
    features: ["100% equipment financing", "Fixed rates", "Tax advantages"],
    slug: "equipfinance",
    website: "https://www.equipfinance.example.com"
  },
  {
    id: "sbalender",
    name: "SBA Lender",
    category: "SBA Loans",
    minCreditScore: 650,
    minAnnualRevenue: 100000,
    minTimeInBusiness: 24,
    fundingRange: [50000, 5000000],
    fundingTimeframe: "3_6_months",
    bestFor: ["expansion", "acquisition", "real_estate", "debt_refinancing"],
    industries: ["retail", "food_service", "manufacturing", "professional_services", "healthcare"],
    rating: 4.9,
    reviews: 189,
    approvalTime: "30-90 days",
    features: ["Government-backed", "Lowest rates", "Longer terms"],
    slug: "sbalender",
    website: "https://www.sbalender.example.com"
  },
  {
    id: "invoicefactor",
    name: "InvoiceFactor",
    category: "Invoice Factoring",
    minCreditScore: 500,
    minAnnualRevenue: 100000,
    minTimeInBusiness: 6,
    fundingRange: [10000, 1000000],
    fundingTimeframe: "immediate",
    bestFor: ["working_capital"],
    industries: ["manufacturing", "construction", "transportation", "professional_services"],
    rating: 4.2,
    reviews: 156,
    approvalTime: "1-3 days",
    features: ["No debt", "Client creditworthiness matters most", "Fast cash flow solution"],
    slug: "invoicefactor",
    website: "https://www.invoicefactor.example.com"
  },
  {
    id: "expresscredit",
    name: "Express Credit",
    category: "Business Credit Cards",
    minCreditScore: 680,
    minAnnualRevenue: 50000,
    minTimeInBusiness: 1,
    fundingRange: [5000, 50000],
    fundingTimeframe: "1_week",
    bestFor: ["working_capital", "emergency", "marketing"],
    industries: ["all"],
    rating: 4.4,
    reviews: 298,
    approvalTime: "1-7 days",
    features: ["Rewards points", "No annual fee first year", "Intro 0% APR"],
    slug: "expresscredit",
    website: "https://www.expresscredit.example.com"
  },
  {
    id: "startupboost",
    name: "StartupBoost",
    category: "Startup Funding",
    minCreditScore: 600,
    minAnnualRevenue: 0,
    minTimeInBusiness: 0,
    fundingRange: [25000, 250000],
    fundingTimeframe: "1_3_months",
    bestFor: ["startup_costs", "equipment", "working_capital"],
    industries: ["technology", "healthcare", "education", "non_profit"],
    rating: 4.3,
    reviews: 127,
    approvalTime: "2-4 weeks",
    features: ["Designed for new businesses", "Based on potential", "Mentorship included"],
    slug: "startupboost",
    website: "https://www.startupboost.example.com"
  },
  {
    id: "personalloan",
    name: "PersonalLoan",
    category: "Personal Loans",
    minCreditScore: 630,
    minAnnualRevenue: 0,
    minTimeInBusiness: 0,
    fundingRange: [1000, 50000],
    fundingTimeframe: "1_week",
    bestFor: ["personal", "startup_costs", "emergency"],
    industries: ["personal"],
    rating: 4.4,
    reviews: 512,
    approvalTime: "1-3 days",
    features: ["No collateral required", "Fixed monthly payments", "Flexible use of funds"],
    slug: "personalloan",
    website: "https://www.personalloan.example.com"
  },
  {
    id: "realestatecapital",
    name: "Real Estate Capital",
    category: "Commercial Real Estate Loans",
    minCreditScore: 680,
    minAnnualRevenue: 250000,
    minTimeInBusiness: 36,
    fundingRange: [100000, 10000000],
    fundingTimeframe: "3_6_months",
    bestFor: ["real_estate", "expansion"],
    industries: ["real_estate", "retail", "food_service", "professional_services"],
    rating: 4.8,
    reviews: 143,
    approvalTime: "30-60 days",
    features: ["Property as collateral", "Long terms up to 25 years", "Competitive rates"],
    slug: "realestatecapital",
    website: "https://www.realestatecapital.example.com"
  }
];

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

router.post('/recommendations', async (req: Request, res: Response) => {
  try {
    const userInput: FundingRecommendationRequest = req.body;
    
    // Validate the OpenAI API key is present
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'API key not configured'
      });
    }

    // Create a prompt for the recommendation
    // We'll use a structured approach to help the model generate consistent responses
    const prompt = `
    You are a financial advisor specializing in business and personal funding options. 
    You have detailed knowledge of various funding products including SBA loans, business lines of credit, 
    term loans, equipment financing, personal loans, and more.
    
    Based on the following user information, recommend the best funding options from our lender database.
    The recommendations should be personalized, data-driven, and actionable.
    
    USER PROFILE:
    - Business Type: ${userInput.businessType || 'Not specified'}
    - Industry: ${userInput.industry || 'Not specified'}
    - Funding Purpose: ${userInput.fundingPurpose || 'Not specified'}
    - Credit Score: ${userInput.creditScore || 'Not specified'}
    - Annual Revenue: ${userInput.annualRevenue ? '$' + userInput.annualRevenue.toLocaleString() : 'Not specified'}
    - Time in Business: ${userInput.timeInBusiness ? userInput.timeInBusiness + ' months' : 'Not specified'}
    - Requested Funding Amount: ${userInput.fundingAmount ? '$' + userInput.fundingAmount.toLocaleString() : 'Not specified'}
    - Funding Timeframe: ${userInput.fundingTimeframe || 'Not specified'}
    - Preferred Funding Type: ${userInput.preferredFundingType || 'Not specified'}
    - Additional Context: ${userInput.additionalContext || 'None provided'}
    
    OUR LENDER DATABASE: ${JSON.stringify(lenderData)}
    
    INSTRUCTIONS:
    1. Analyze the user's profile and funding needs.
    2. Identify 3 lenders from our database that best match the user's situation.
    3. For each recommended lender, provide:
       - A match score percentage (e.g., 95%) indicating how well the lender matches their needs
       - A brief explanation of why this lender is a good match
       - 3-4 key benefits of choosing this lender for their specific situation
       - All relevant lender details from our database
    4. Provide general advice about their funding situation.
    
    FORMAT YOUR RESPONSE AS A JSON OBJECT with this structure:
    {
      "recommendations": [
        {
          "lenderId": "string",
          "lenderName": "string",
          "matchScore": number,
          "reasoning": "string",
          "keyBenefits": ["string", "string", ...],
          "lenderDetails": {
            "category": "string",
            "rating": number,
            "reviews": number,
            "approvalTime": "string",
            "features": ["string", "string", ...],
            "slug": "string",
            "website": "string"
          }
        },
        ...
      ],
      "generalAdvice": "string"
    }
    `;

    // Call the OpenAI API
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a financial advisor specializing in funding options for businesses and individuals. Only recommend lenders from the provided lender database. Never make up or reference lenders that aren't in the provided data." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5,
    });

    // Extract and parse the response
    const content = response.choices[0].message.content || '';
    let recommendations = JSON.parse(content);
    
    // Validate that all recommendations reference lenders from our database
    // This is a safeguard in case the AI hallucinates lenders not in our database
    if (recommendations && recommendations.recommendations) {
      recommendations.recommendations = recommendations.recommendations
        .filter((rec: any) => {
          // Try to find matching lender in our database
          const matchingLender = lenderData.find(l => 
            l.id === rec.lenderId || 
            l.name.toLowerCase() === (rec.lenderName || '').toLowerCase()
          );
          
          // If we found a match, ensure the lender details are correct
          if (matchingLender) {
            rec.lenderId = matchingLender.id;
            rec.lenderName = matchingLender.name;
            rec.lenderDetails = {
              category: matchingLender.category,
              rating: matchingLender.rating,
              reviews: matchingLender.reviews,
              approvalTime: matchingLender.approvalTime,
              features: matchingLender.features,
              slug: matchingLender.slug,
              website: matchingLender.website
            };
            return true;
          }
          return false;
        })
        .slice(0, 3); // Ensure we only return 3 recommendations max
    }

    // Return the recommendations to the client
    res.json({
      success: true,
      data: recommendations
    });

  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred while generating recommendations'
    });
  }
});

export default router;