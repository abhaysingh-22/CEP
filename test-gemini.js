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

console.log('=== TESTING GEMINI API ===');
console.log('API Key exists:', !!API_KEY);
console.log('API Key length:', API_KEY?.length);
console.log('API Key preview:', API_KEY?.substring(0, 15) + '...');

if (!API_KEY) {
  console.error('❌ API Key not found in .env.local');
  process.exit(1);
}

async function testGeminiAPI() {
  try {
    console.log('\n🧪 Initializing Google Generative AI...');
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    console.log('✅ Google Generative AI initialized');
    
    const model = genAI.getGenerativeModel({ 
      model: 'models/gemini-1.5-flash-8b',
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.7,
      }
    });
    
    console.log('✅ Model initialized');
    
    const prompt = "Hello, say hi back in one sentence.";
    console.log('\n📤 Sending test message:', prompt);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Success! Response:', text);
    
  } catch (error) {
    console.error('\n❌ Error testing Gemini API:');
    console.error('Type:', error?.constructor?.name);
    console.error('Message:', error?.message);
    console.error('Code:', error?.code);
    console.error('Status:', error?.status);
    console.error('Full error:', error);
    
    // Check for common network issues
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error('\n🌐 This appears to be a network connectivity issue.');
      console.error('Please check:');
      console.error('1. Your internet connection');
      console.error('2. Firewall/proxy settings');
      console.error('3. DNS resolution');
    }
  }
}

testGeminiAPI();