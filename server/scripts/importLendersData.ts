import lendersData from '../data/lenders.json';
import { storage } from '../storage';
import { InsertLender } from '@shared/schema';

// Interface for lender data from JSON file
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

/**
 * Import lenders data from JSON file to database
 */
async function importLendersData() {
  console.log('🔄 Starting import of lenders data...');
  
  try {
    let importedCount = 0;
    
    for (const lender of lendersData) {
      const typedLender = lender as LenderData;
      
      // Only import Better List 100 lenders
      if (!typedLender.betterList100) {
        continue;
      }
      
      // Check if lender already exists
      const existingLender = await storage.getLender(typedLender.id);
      
      if (!existingLender) {
        // Create new lender
        const lenderData: InsertLender = {
          lenderId: typedLender.id,
          name: typedLender.name,
          category: typedLender.category,
          rating: typedLender.rating,
          reviews: typedLender.reviews,
          creditMin: typedLender.creditMin,
          maxFunding: typedLender.maxFunding,
          approvalTime: typedLender.approvalTime,
          features: typedLender.features,
          affiliateLink: typedLender.affiliateLink,
          betterList100: typedLender.betterList100,
          featured: typedLender.featured,
          slug: typedLender.slug,
          website: typedLender.website,
          description: generateDescription(typedLender),
          logoUrl: `https://logo.clearbit.com/${new URL(typedLender.website).hostname}`,
          reviewSnippet: generateReviewSnippet(typedLender)
        };
        
        await storage.createLender(lenderData);
        importedCount++;
        console.log(`✅ Imported: ${typedLender.name}`);
      } else {
        console.log(`⏭️ Skipped: ${typedLender.name} (already exists)`);
      }
    }
    
    console.log(`✅ Import completed! Imported ${importedCount} new lenders.`);
  } catch (error) {
    console.error('❌ Error importing lenders data:', error);
  }
}

/**
 * Generate description for a lender
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
 * Generate review snippet for a lender
 */
function generateReviewSnippet(lender: LenderData): string {
  return `${lender.name} is a top-rated provider of ${lender.category} with a BCS rating of ${lender.rating}/5 based on ${lender.reviews} customer reviews.`;
}

// Run the import
importLendersData().then(() => {
  console.log('🔄 Import process complete!');
  process.exit(0);
}).catch(error => {
  console.error('❌ Import failed:', error);
  process.exit(1);
});