import express, { Request, Response } from 'express';
import { storage } from '../storage';

export const router = express.Router();

/**
 * Get schema for a specific lender
 */
router.get('/lender/:id', async (req: Request, res: Response) => {
  try {
    const lenderId = req.params.id;
    
    // Validate input
    if (!lenderId) {
      return res.status(400).json({ 
        error: 'Lender ID is required' 
      });
    }

    // Normalize slug format
    const normalizedId = lenderId.replace(/-/g, '_');
    
    // Get lender schema from database
    const schemaJson = await storage.getLenderSchema(lenderId);
    
    if (!schemaJson) {
      // If schema doesn't exist, get lender data and generate it dynamically
      const lender = await storage.getLender(lenderId);
      
      if (!lender) {
        return res.status(404).json({ 
          error: 'Lender not found' 
        });
      }
      
      // Generate schema from lender data
      const schema = {
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": `${lender.name} ${lender.category}`,
        "description": lender.description || `${lender.name} offers ${lender.category} services.`,
        "provider": {
          "@type": "Organization",
          "name": lender.name,
          "url": lender.website,
          "logo": lender.logoUrl || `https://logo.clearbit.com/${new URL(lender.website).hostname}`
        },
        "review": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": lender.rating,
            "bestRating": "5"
          },
          "author": {
            "@type": "Organization",
            "name": "Better Capital Solutions"
          },
          "reviewBody": lender.reviewSnippet || `${lender.name} is a top-rated provider of ${lender.category} with a BCS rating of ${lender.rating}/5 based on ${lender.reviews} customer reviews.`
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": lender.rating,
          "reviewCount": lender.reviews,
          "bestRating": "5"
        }
      };
      
      // Return the generated schema
      return res.json(schema);
    }
    
    // Parse and return the stored schema
    return res.json(JSON.parse(schemaJson));
  } catch (error) {
    console.error('Error fetching lender schema:', error);
    return res.status(500).json({ 
      error: 'Failed to retrieve lender schema' 
    });
  }
});

/**
 * Generate and store schema for a lender
 */
router.post('/lender/:id/generate', async (req: Request, res: Response) => {
  try {
    const lenderId = req.params.id;
    
    // Validate input
    if (!lenderId) {
      return res.status(400).json({ 
        error: 'Lender ID is required' 
      });
    }
    
    // Get lender data
    const lender = await storage.getLender(lenderId);
    
    if (!lender) {
      return res.status(404).json({ 
        error: 'Lender not found' 
      });
    }
    
    // Generate schema from lender data
    const schema = {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      "name": `${lender.name} ${lender.category}`,
      "description": lender.description || `${lender.name} offers ${lender.category} services.`,
      "provider": {
        "@type": "Organization",
        "name": lender.name,
        "url": lender.website,
        "logo": lender.logoUrl || `https://logo.clearbit.com/${new URL(lender.website).hostname}`
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": lender.rating,
          "bestRating": "5"
        },
        "author": {
          "@type": "Organization",
          "name": "Better Capital Solutions"
        },
        "reviewBody": lender.reviewSnippet || `${lender.name} is a top-rated provider of ${lender.category} with a BCS rating of ${lender.rating}/5 based on ${lender.reviews} customer reviews.`
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": lender.rating,
        "reviewCount": lender.reviews,
        "bestRating": "5"
      }
    };
    
    // Store schema in database
    await storage.createLenderSchema({
      lenderId: lender.lenderId,
      schemaJson: JSON.stringify(schema, null, 2)
    });
    
    return res.json({
      success: true,
      message: 'Schema generated and stored successfully',
      schema
    });
  } catch (error) {
    console.error('Error generating lender schema:', error);
    return res.status(500).json({ 
      error: 'Failed to generate lender schema' 
    });
  }
});

/**
 * Generate schemas for all lenders in the BCS Top 100
 */
router.post('/generate-all', async (req: Request, res: Response) => {
  try {
    // Get all BCS Top 100 lenders
    const lenders = await storage.getBetterList100Lenders();
    
    const results = {
      total: lenders.length,
      successful: 0,
      failed: 0,
      failures: [] as string[]
    };
    
    // Generate schema for each lender
    for (const lender of lenders) {
      try {
        // Generate schema
        const schema = {
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          "name": `${lender.name} ${lender.category}`,
          "description": lender.description || `${lender.name} offers ${lender.category} services.`,
          "provider": {
            "@type": "Organization",
            "name": lender.name,
            "url": lender.website,
            "logo": lender.logoUrl || `https://logo.clearbit.com/${new URL(lender.website).hostname}`
          },
          "review": {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": lender.rating,
              "bestRating": "5"
            },
            "author": {
              "@type": "Organization",
              "name": "Better Capital Solutions"
            },
            "reviewBody": lender.reviewSnippet || `${lender.name} is a top-rated provider of ${lender.category} with a BCS rating of ${lender.rating}/5 based on ${lender.reviews} customer reviews.`
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": lender.rating,
            "reviewCount": lender.reviews,
            "bestRating": "5"
          }
        };
        
        // Store schema in database
        await storage.createLenderSchema({
          lenderId: lender.lenderId,
          schemaJson: JSON.stringify(schema, null, 2)
        });
        
        results.successful++;
      } catch (error) {
        console.error(`Error generating schema for ${lender.name}:`, error);
        results.failed++;
        results.failures.push(lender.name);
      }
    }
    
    return res.json({
      success: true,
      message: 'Schema generation process completed',
      results
    });
  } catch (error) {
    console.error('Error generating schemas:', error);
    return res.status(500).json({ 
      error: 'Failed to generate schemas' 
    });
  }
});

export default router;