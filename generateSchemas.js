#!/usr/bin/env node

const { exec } = require('child_process');

console.log('🔄 Running schema generator script...');
exec('tsx server/scripts/generateSchemas.ts', (error, stdout, stderr) => {
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