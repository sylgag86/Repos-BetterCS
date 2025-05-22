import express, { Request, Response } from "express";
import { storage } from "../storage";
import { insertApplicationSchema } from "@shared/schema";
import { z } from "zod";

export const router = express.Router();

// Submit funding application
router.post('/submit', async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validatedData = insertApplicationSchema.parse(req.body);
    
    // Store the application in the database
    const application = await storage.createApplication(validatedData);
    
    // TODO: Send email notification to admin
    // This will be implemented once we have SendGrid API key
    console.log('New application submitted:', {
      id: application.id,
      name: `${application.firstName} ${application.lastName}`,
      email: application.email,
      businessName: application.businessName,
      fundingAmount: application.fundingAmount
    });
    
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      applicationId: application.id
    });
    
  } catch (error) {
    console.error('Application submission error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid form data",
        errors: error.errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Failed to submit application"
    });
  }
});

// Get all applications (for admin)
router.get('/all', async (req: Request, res: Response) => {
  try {
    const applications = await storage.getAllApplications();
    res.json({
      success: true,
      applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications"
    });
  }
});

export default router;