import * as fs from 'fs';
import * as path from 'path';
import lendersData from '../data/lenders.json';
import { InsertLenderSchema } from '@shared/schema';
import { storage } from '../storage';

// Type for lender data from JSON file
interface LenderData {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  creditMin: number;
  maxFunding: number;
  approvalTime: string;
  features: string[];
  affiliateLink: string;
  betterList100: boolean;
  featured: boolean;
  slug: string;
  website: string;
}

// Type for structured schema
interface SchemaTemplate {
  "@context": string;
  "@type": string;
  "name": string;
  "description": string;
  "provider": {
    "@type": string;
    "name": string;
    "url": string;
    "logo": string;
  };
  "review"?: {
    "@type": string;
    "reviewRating": {
      "@type": string;
      "ratingValue": number;
      "bestRating": string;
    };
    "author": {
      "@type": string;
      "name": string;
    };
    "reviewBody"?: string;
  };
  "aggregateRating": {
    "@type": string;
    "ratingValue": number;
    "reviewCount": number;
    "bestRating": string;
  };
}

/**
 * Generate the schema description based on lender data
 */
function generateDescription(lender: LenderData): string {
  let description = `${lender.name} offers ${lender.category} with `;
  
  if (lender.maxFunding) {
    description += `funding up to $${lender.maxFunding.toLocaleString()}`;
  }
  
  if (lender.creditMin) {
    description += `, minimum credit score of ${lender.creditMin}`;
  }
  
  if (lender.approvalTime) {
    description += `, and ${lender.approvalTime} approval time`;
  }
  
  if (lender.features && lender.features.length > 0) {
    description += `. Features include: ${lender.features.join(', ')}.`;
  } else {
    description += '.';
  }
  
  return description;
}

/**
 * Generate a logo URL for the lender
 */
function getLenderLogo(lender: LenderData): string {
  // Try to get logo from clearbit or use a default logo
  return `https://logo.clearbit.com/${new URL(lender.website).hostname}` || 
         'https://bettercapitalsolutions.com/assets/logo.png';
}

/**
 * Generate JSON-LD schema for a lender
 */
function generateSchema(lender: LenderData): SchemaTemplate {
  const baseSchema: SchemaTemplate = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": `${lender.name} ${lender.category}`,
    "description": generateDescription(lender),
    "provider": {
      "@type": "Organization",
      "name": lender.name,
      "url": lender.website,
      "logo": getLenderLogo(lender)
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": lender.rating,
      "reviewCount": lender.reviews,
      "bestRating": "5"
    }
  };

  // Add review if a review snippet is available
  // For now, we'll create a generic review since we don't have review snippets in the data
  baseSchema.review = {
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
    "reviewBody": `${lender.name} is a top-rated provider of ${lender.category} with a BCS rating of ${lender.rating}/5 based on ${lender.reviews} customer reviews.`
  };

  return baseSchema;
}

/**
 * Generate and save schema for a single lender
 */
async function generateAndSaveSchema(lender: LenderData): Promise<void> {
  // Skip if not in BetterList 100
  if (!lender.betterList100) {
    return;
  }

  // Generate the schema
  const schema = generateSchema(lender);
  const schemaJson = JSON.stringify(schema, null, 2);

  // Create schema data
  const schemaData: InsertLenderSchema = {
    lenderId: lender.id,
    schemaJson
  };

  try {
    // Store in database
    await storage.createLenderSchema(schemaData);
    console.log(`✅ Schema created for ${lender.name}`);
  } catch (error) {
    console.error(`Error saving schema for ${lender.name}:`, error);
  }

  // Also save the schema into each lender's HTML page
  try {
    const lenderPagePath = path.join(process.cwd(), 'client', 'public', 'lenders', `${lender.slug}.html`);
    if (fs.existsSync(lenderPagePath)) {
      let htmlContent = fs.readFileSync(lenderPagePath, 'utf-8');
      
      // Check if there's already a schema in the page
      const existingSchemaRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;
      const hasExistingSchema = existingSchemaRegex.test(htmlContent);
      
      if (hasExistingSchema) {
        // Replace existing schema
        htmlContent = htmlContent.replace(
          existingSchemaRegex,
          `<script type="application/ld+json">${schemaJson}</script>`
        );
      } else {
        // Add new schema before </head>
        htmlContent = htmlContent.replace(
          '</head>',
          `  <script type="application/ld+json">${schemaJson}</script>\n</head>`
        );
      }
      
      fs.writeFileSync(lenderPagePath, htmlContent);
      console.log(`✅ Schema added to HTML page for ${lender.name}`);
    } else {
      console.warn(`⚠️ HTML page not found for ${lender.name} at ${lenderPagePath}`);
    }
  } catch (error) {
    console.error(`Error updating HTML for ${lender.name}:`, error);
  }
}

/**
 * Main function to generate schemas for all lenders
 */
async function generateAllSchemas(): Promise<void> {
  console.log('🔄 Starting schema generation for all BCS Top 100 lenders...');
  
  // Ensure the database tables are created
  try {
    // Loop through all lenders and generate schemas
    for (const lender of lendersData) {
      await generateAndSaveSchema(lender as LenderData);
    }
    
    console.log('✅ Completed schema generation for all BCS Top 100 lenders!');
  } catch (error) {
    console.error('❌ Error generating schemas:', error);
  }
}

// Run the script
generateAllSchemas().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});