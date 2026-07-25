import { readFileSync } from 'fs';

// Load .env.local file manually
const envPath = '.env.local';
let apiKey = '';
try {
  const envContent = readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    if (line.startsWith('GEMINI_API_KEY=')) {
      apiKey = line.split('=')[1].trim();
      break;
    }
  }
  console.log('Loaded API key from .env.local');
  console.log('API Key (first 10 chars):', apiKey ? apiKey.substring(0, 10) + '...' : 'NOT SET');
} catch (error) {
  console.error('Error loading .env.local:', error.message);
}

async function listModels() {
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in .env.local');
    return;
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}` 
  );

  const data = await response.json();
  console.log("Available models:", JSON.stringify(data, null, 2));
}

listModels();
