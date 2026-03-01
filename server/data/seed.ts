import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from '@replit/database';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the Replit Database
const db = new Database();

// Read the lenders.json file
const lendersPath = path.join(__dirname, 'lenders.json');
const lenderData = fs.readFileSync(lendersPath, 'utf8');
const lenders = JSON.parse(lenderData);

// Async function to seed the database
async function seedDatabase() {
  console.log('Starting database seeding process...');
  
  try {
    // Clear existing lender data (optional)
    const keysResult = await db.list();
    // @replit/database types vary by version; normalize to string[]
    const keys: string[] = Array.isArray(keysResult)
      ? keysResult
      : ((keysResult as any)?.value ?? (keysResult as any)?.ok ?? []);
    const lenderKeys = keys.filter((key: string) => key.startsWith('lender_'));
    
    if (lenderKeys.length > 0) {
      console.log(`Clearing ${lenderKeys.length} existing lender records...`);
      for (const key of lenderKeys) {
        await db.delete(key);
      }
    }
    
    // Add a lender index to keep track of all lenders
    const lenderIds = (lenders as any[]).map((lender: any) => lender.id);
    await db.set('lender_index', lenderIds);
    console.log('Created lender index with all lender IDs');
    
    // Add each lender to the database
    for (const lender of lenders as any[]) {
      const key = `lender_${lender.id}`;
      await db.set(key, lender);
      console.log(`Added ${lender.name} to database with key: ${key}`);
    }
    
    console.log('Database seeding completed successfully!');
    console.log(`Total lenders added: ${lenders.length}`);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seeding process
seedDatabase();

export default seedDatabase;