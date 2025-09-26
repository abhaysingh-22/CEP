import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the .env.local file
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/VITE_GEMINI_API_KEY=(.+)/);
const API_KEY = apiKeyMatch ? apiKeyMatch[1].trim() : null;

console.log('=== LISTING AVAILABLE MODELS ===');
console.log('API Key exists:', !!API_KEY);

if (!API_KEY) {
  console.error('❌ API Key not found in .env.local');
  process.exit(1);
}

async function listModels() {
  try {
    console.log('\n🔍 Fetching available models...');
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Try to list models
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + API_KEY);
    const data = await response.json();
    
    if (data.error) {
      console.error('❌ Error listing models:', data.error);
      return;
    }
    
    console.log('\n✅ Available models:');
    if (data.models && data.models.length > 0) {
      data.models.forEach((model, index) => {
        console.log(`${index + 1}. ${model.name} (${model.displayName || 'No display name'})`);
        if (model.supportedGenerationMethods) {
          console.log(`   Supported methods: ${model.supportedGenerationMethods.join(', ')}`);
        }
      });
    } else {
      console.log('No models found or no access to models');
    }
    
  } catch (error) {
    console.error('\n❌ Error listing models:');
    console.error('Message:', error?.message);
    console.error('Full error:', error);
  }
}

listModels();