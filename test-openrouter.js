import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the .env.local file
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/VITE_OPENROUTER_API_KEY=(.+)/);
const siteUrlMatch = envContent.match(/VITE_SITE_URL=(.+)/);
const siteNameMatch = envContent.match(/VITE_SITE_NAME=(.+)/);

const API_KEY = apiKeyMatch ? apiKeyMatch[1].trim() : null;
const SITE_URL = siteUrlMatch ? siteUrlMatch[1].trim() : 'https://ecotravel-cep.netlify.app';
const SITE_NAME = siteNameMatch ? siteNameMatch[1].trim() : 'EcoTravel Platform';

console.log('=== TESTING OPENROUTER API ===');
console.log('API Key exists:', !!API_KEY);
console.log('API Key length:', API_KEY?.length);
console.log('API Key preview:', API_KEY?.substring(0, 15) + '...');
console.log('Site URL:', SITE_URL);
console.log('Site Name:', SITE_NAME);

if (!API_KEY) {
  console.error('❌ API Key not found in .env.local');
  process.exit(1);
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: API_KEY,
  defaultHeaders: {
    "HTTP-Referer": SITE_URL,
    "X-Title": SITE_NAME,
  },
});

async function testOpenRouterAPI() {
  try {
    console.log('\n🧪 Initializing OpenRouter with Claude Sonnet...');
    
    const testMessage = "Hello! Tell me about sustainable travel in one sentence.";
    console.log('\n📤 Sending test message:', testMessage);
    
    const completion = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet",
      messages: [
        {
          role: "system",
          content: "You are EcoBot, a helpful AI assistant specializing in sustainable travel and eco-friendly tourism."
        },
        {
          role: "user", 
          content: testMessage
        }
      ],
      max_tokens: 300,  // Optimized for faster responses
      temperature: 0.5,
      stream: true  // Enable streaming for real-time response
    });

    // Collect streamed response
    let response = '';
    for await (const chunk of completion) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) {
        response += delta;
      }
    }
    console.log('✅ Success! Response:', response);
    
    // Test a follow-up message
    const followUp = "What about eco-friendly accommodations?";
    console.log('\n📤 Sending follow-up message:', followUp);
    
    const followUpCompletion = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet", 
      messages: [
        {
          role: "system",
          content: "You are EcoBot, a helpful AI assistant specializing in sustainable travel and eco-friendly tourism."
        },
        {
          role: "user",
          content: testMessage
        },
        {
          role: "assistant", 
          content: response
        },
        {
          role: "user",
          content: followUp
        }
      ],
      max_tokens: 300,  // Optimized for faster responses
      temperature: 0.5,
      stream: true  // Enable streaming
    });

    // Collect streamed follow-up response
    let followUpResponse = '';
    for await (const chunk of followUpCompletion) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) {
        followUpResponse += delta;
      }
    }
    console.log('✅ Follow-up Success! Response:', followUpResponse);
    
  } catch (error) {
    console.error('\n❌ Error testing OpenRouter API:');
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

testOpenRouterAPI();