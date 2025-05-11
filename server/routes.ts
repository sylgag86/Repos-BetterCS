import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";

// Import the routes
import lenderRoutes from "./routes/lenders";
import aiRecommendationsRoutes from "./routes/ai-recommendations";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Add lender routes from our lenders.ts file
  app.use('/api/lenders', lenderRoutes);

  // Add AI recommendation routes
  app.use('/api/ai', aiRecommendationsRoutes);

  // Add additional routes for utility functions if needed
  app.get('/api/seed-lenders', async (req, res) => {
    try {
      // Dynamically import and run the seed script
      const seedModule = await import('./data/seed');
      res.json({ message: 'Lender database seeding process initiated. Check server logs for details.' });
    } catch (error) {
      console.error('Error running seed script:', error);
      res.status(500).json({ error: 'Failed to seed lender database' });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
