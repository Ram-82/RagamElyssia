#!/usr/bin/env node
import { exec } from 'child_process';

console.log('Starting build process...');

// Run esbuild command
exec('npm run build:esbuild', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error during build: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`Build stderr: ${stderr}`);
  }
  
  console.log(`Build stdout: ${stdout}`);
  console.log('Build completed successfully!');
});