#!/usr/bin/env tsx

import { exec } from 'child_process';
import * as path from 'path';

// Run the database migration first to create tables
console.log('🔄 Creating database tables...');

// Run the drizzle push command to create tables
exec('npm run db:push', (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error creating database tables: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`⚠️ Warning during database creation: ${stderr}`);
  }
  
  console.log(`✅ Database tables created: ${stdout}`);
  
  // Now run the schema generator
  console.log('🔄 Running schema generator...');
  
  // Get the path to the generator script
  const generatorPath = path.join(__dirname, 'generateSchemas.ts');
  
  // Execute the generator
  exec(`tsx ${generatorPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error generating schemas: ${error.message}`);
      return;
    }
    
    if (stderr) {
      console.error(`⚠️ Warning during schema generation: ${stderr}`);
    }
    
    console.log(stdout);
    console.log('✅ Schema generation completed!');
  });
});