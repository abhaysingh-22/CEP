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
  private chat: any = null;
  private conversationHistory: string[] = [];

  constructor() {
    console.log('Initializing Gemini Chat Service...');
    
    try {
      this.model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',  // Confirmed working model with new API key
        generationConfig: {
          maxOutputTokens: 300,  // Reduced to prevent quota issues
          temperature: 0.5,      // Lower temperature for more consistent responses
        }
      });
      this.initializeChat();
      console.log('Gemini service initialized successfully');
    } catch (error) {
      console.error('Error initializing Gemini service:', error);
      throw error;
    }
  }

  private initializeChat() {
    try {
      this.chat = this.model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      });
      console.log('Chat session initialized');
    } catch (error) {
      console.error('Error initializing chat session:', error);
      // Fallback to generateContent if chat fails
      this.chat = null;
    }
  }

  async sendMessage(message: string): Promise<string> {
    console.log('=== SENDING MESSAGE ===');
    console.log('Input message:', message);
    
    // Add delay to prevent rate limiting
    if (this.conversationHistory.length > 0) {
      console.log('Adding delay to prevent rate limiting...');
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
    }
    
    try {
      // Validate inputs
      if (!message || message.trim().length === 0) {
        throw new Error('Message cannot be empty');
      }

      let result;
      let text: string;

      // Always use generateContent with enhanced prompt
      console.log('Using generateContent with enhanced prompt...');
      
      // Create a comprehensive prompt that includes context and clear instructions
      let fullPrompt;
      
      // Simplified prompt that works consistently
      if (this.conversationHistory.length === 0) {
        // First message - simple introduction
        fullPrompt = `You are EcoBot, a helpful AI assistant for sustainable travel. Help with eco-friendly travel advice.

User: ${message}
EcoBot:`;
      } else {
        // Keep only the most recent exchange for context
        const lastUserMsg = this.conversationHistory.length >= 2 ? this.conversationHistory[this.conversationHistory.length - 2] : '';
        const lastBotMsg = this.conversationHistory.length >= 1 ? this.conversationHistory[this.conversationHistory.length - 1] : '';
        
        fullPrompt = `You are EcoBot, a helpful AI assistant for sustainable travel.

${lastUserMsg}
${lastBotMsg}

User: ${message}
EcoBot:`;
      }
      
      console.log('Prompt length:', fullPrompt.length);
      
      result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      text = response.text();
      
      console.log('Response received:', text.substring(0, 100) + '...');
      console.log('Response length:', text.length);
      
      // If empty response, try with a simpler prompt
      if (!text || text.trim().length === 0) {
        console.log('Empty response detected, trying simpler prompt...');
        
        const simplePrompt = `You are EcoBot. Answer this eco-travel question: ${message}`;
        const fallbackResult = await this.model.generateContent(simplePrompt);
        const fallbackResponse = await fallbackResult.response;
        text = fallbackResponse.text();
        
        if (!text || text.trim().length === 0) {
          throw new Error('Empty response from Gemini API even with simple prompt');
        }
      }

      // Update conversation history (keep it short)
      this.conversationHistory.push(`User: ${message}`);
      this.conversationHistory.push(`EcoBot: ${text.trim()}`);
      
      // Keep only last 2 exchanges (4 entries) to prevent prompt bloat
      if (this.conversationHistory.length > 4) {
        this.conversationHistory = this.conversationHistory.slice(-4);
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
      
      if (error?.status === 503 || error?.message?.includes('service is currently unavailable')) {
        throw new Error('🔧 Gemini AI service is temporarily unavailable. Please try again in a few moments.');
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
    this.conversationHistory = [];
    this.initializeChat();
  }
}