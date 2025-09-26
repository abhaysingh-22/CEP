import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

console.log('=== GEMINI API DEBUG ===');
console.log('API Key exists:', !!API_KEY);
console.log('API Key length:', API_KEY?.length);
console.log('API Key preview:', API_KEY?.substring(0, 10) + '...');

if (!API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class GeminiChatService {
  private model: any;

  constructor() {
    console.log('Initializing Gemini Chat Service...');
    
    try {
      this.model = genAI.getGenerativeModel({ 
        model: 'models/gemini-1.5-flash-8b',
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7,
        }
      });
      console.log('Gemini service initialized successfully');
    } catch (error) {
      console.error('Error initializing Gemini service:', error);
      throw error;
    }
  }

  async sendMessage(message: string): Promise<string> {
    console.log('=== SENDING MESSAGE ===');
    console.log('Input message:', message);
    
    try {
      // Validate inputs
      if (!message || message.trim().length === 0) {
        throw new Error('Message cannot be empty');
      }

      // Create a simple, direct prompt
      const prompt = `You are EcoBot, a friendly assistant for sustainable travel. Answer this question about eco-friendly travel in a helpful way (max 2-3 sentences): ${message}`;
      
      console.log('Sending prompt to Gemini API...');
      console.log('Prompt length:', prompt.length);
      
      // Use generateContent instead of chat for simpler testing
      const result = await this.model.generateContent(prompt);
      console.log('Received result from Gemini API');
      
      const response = await result.response;
      const text = response.text();
      
      console.log('Response received:', text.substring(0, 100) + '...');
      console.log('Response length:', text.length);
      
      if (!text || text.trim().length === 0) {
        throw new Error('Empty response from Gemini API');
      }
      
      return text.trim();
      
    } catch (error: any) {
      console.error('=== GEMINI API ERROR ===');
      console.error('Error type:', error?.constructor?.name);
      console.error('Error message:', error?.message);
      console.error('Error code:', error?.code);
      console.error('Error status:', error?.status);
      console.error('Full error:', error);
      
      // More specific error messages based on common issues
      if (error?.message?.includes('API_KEY_INVALID') || error?.message?.includes('API key')) {
        throw new Error('❌ Invalid API key. Please verify your Gemini API key is correct.');
      }
      
      if (error?.message?.includes('PERMISSION_DENIED')) {
        throw new Error('❌ Permission denied. Please check your API key permissions.');
      }
      
      if (error?.message?.includes('quota') || error?.message?.includes('QUOTA_EXCEEDED') || error?.status === 429) {
        throw new Error('❌ API quota exceeded. Your free tier limit has been reached. Please wait a few minutes or upgrade your Gemini API plan.');
      }
      
      if (error?.message?.includes('RESOURCE_EXHAUSTED')) {
        throw new Error('❌ API rate limit exceeded. Please wait a moment and try again.');
      }
      
      if (error?.message?.includes('Too Many Requests')) {
        throw new Error('❌ Too many requests. Please wait before trying again. Free tier has limited requests per minute.');
      }
      
      if (error?.message?.includes('network') || error?.message?.includes('fetch') || error?.code === 'NETWORK_ERROR') {
        throw new Error('❌ Network error. Please check your internet connection.');
      }
      
      if (error?.message?.includes('blocked') || error?.message?.includes('safety')) {
        throw new Error('❌ Message was blocked by safety filters. Please try rephrasing your question.');
      }
      
      // Default error with original message
      throw new Error(`❌ Gemini API Error: ${error?.message || 'Unknown error occurred'}`);
    }
  }

  resetChat() {
    console.log('Chat reset requested');
    // Nothing to reset for generateContent approach
  }
}