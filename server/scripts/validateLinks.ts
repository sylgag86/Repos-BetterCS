
import fs from 'fs';
import path from 'path';
import { storage } from '../storage';

async function validateLinks() {
  const lenders = await storage.getBetterList100Lenders();
  const errors: Record<string, string[]> = {
    schemas: [],
    images: [],
    endpoints: [],
    links: []
  };

  for (const lender of lenders) {
    // Check schema existence
    const schema = await storage.getLenderSchema(lender.id);
    if (!schema) {
      errors.schemas.push(`Missing schema for ${lender.name}`);
    }

    // Check logo file
    const logoPath = path.join(process.cwd(), 'client/public/images/lenders', `${lender.slug}.svg`);
    if (!fs.existsSync(logoPath)) {
      errors.images.push(`Missing logo for ${lender.name}`);
    }

    // Validate HTML file
    const htmlPath = path.join(process.cwd(), 'client/public/lenders', `${lender.slug}.html`);
    if (!fs.existsSync(htmlPath)) {
      errors.links.push(`Missing HTML page for ${lender.name}`);
    }
  }

  console.log('Validation Results:', errors);
  return errors;
}

validateLinks().catch(console.error);
