import OpenAI from 'openai';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://ecotravel-omega.vercel.app/';
const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'EcoTravel Platform';

console.log('=== OPENROUTER API DEBUG ===');
console.log('API Key exists:', !!API_KEY);
console.log('API Key length:', API_KEY?.length);
console.log('API Key preview:', API_KEY?.substring(0, 15) + '...');
console.log('Site URL:', SITE_URL);
console.log('Site Name:', SITE_NAME);

if (!API_KEY) {
  throw new Error('VITE_OPENROUTER_API_KEY is not defined in environment variables');
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: API_KEY,
  // Required for browser usage - OpenRouter API keys are safe for client-side use
  // unlike OpenAI direct keys which should be server-side only
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    "HTTP-Referer": SITE_URL,
    "X-Title": SITE_NAME,
  },
});

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class OpenRouterChatService {
  private conversationHistory: Array<{role: 'user' | 'assistant', content: string}> = [];
  private readonly MAX_HISTORY = 10; // Keep last 10 exchanges
  private readonly MODEL = 'anthropic/claude-3.5-sonnet'; // Simplified model name

  constructor() {
    console.log('Initializing OpenRouter Chat Service...');
    console.log('Using model:', this.MODEL);
    this.initializeChat();
  }

  private initializeChat() {
    // Initialize with system message for EcoBot personality
    this.conversationHistory = [
      {
        role: 'assistant',
        content: `You are EcoBot, a helpful AI assistant specializing in sustainable travel and eco-friendly tourism. 
        
Your expertise includes:
- Eco-friendly travel destinations and accommodations
- Carbon footprint reduction strategies for travelers  
- Sustainable transportation options
- Local environmental conservation initiatives
- Green travel tips and best practices
- Climate-conscious travel planning

Always provide helpful, accurate, and environmentally-focused advice. Keep responses conversational, informative, and encouraging towards sustainable practices. If asked about topics outside sustainable travel, politely redirect the conversation back to eco-friendly travel topics.`
      }
    ];
    console.log('OpenRouter chat initialized with EcoBot persona');
  }

  async sendMessage(message: string): Promise<string> {
    console.log('=== SENDING MESSAGE TO OPENROUTER ===');
    console.log('Input message:', message);
    
    try {
      // Validate inputs
      if (!message || message.trim().length === 0) {
        throw new Error('Message cannot be empty');
      }

      // Add user message to history
      this.conversationHistory.push({
        role: 'user',
        content: message.trim()
      });

      // Prepare messages for API call
      const messages = this.conversationHistory.map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content
      }));

      console.log('Sending request to OpenRouter...');
      console.log('Conversation history length:', this.conversationHistory.length);

      const completion = await openai.chat.completions.create({
        model: this.MODEL,
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        stream: false
      });

      console.log('Received response from OpenRouter');
      
      const responseContent = completion.choices[0]?.message?.content;
      
      if (!responseContent || responseContent.trim().length === 0) {
        throw new Error('Empty response from OpenRouter API');
      }

      console.log('Response content length:', responseContent.length);
      console.log('Response preview:', responseContent.substring(0, 100) + '...');

      // Add assistant response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: responseContent.trim()
      });

      // Trim conversation history if it gets too long
      if (this.conversationHistory.length > this.MAX_HISTORY) {
        // Keep system message and trim older exchanges
        const systemMsg = this.conversationHistory[0];
        const recentHistory = this.conversationHistory.slice(-(this.MAX_HISTORY - 1));
        this.conversationHistory = [systemMsg, ...recentHistory];
        console.log('Trimmed conversation history to', this.conversationHistory.length, 'messages');
      }

      return responseContent.trim();

    } catch (error: any) {
      console.error('=== OPENROUTER API ERROR ===');
      console.error('Error type:', error?.constructor?.name);
      console.error('Error message:', error?.message);
      console.error('Error code:', error?.code);
      console.error('Error status:', error?.status);
      console.error('Full error:', error);

      // Handle specific OpenRouter/OpenAI errors
      if (error?.status === 401 || error?.message?.includes('API key')) {
        throw new Error('❌ Invalid API key. Please verify your OpenRouter API key is correct.');
      }
      
      if (error?.status === 403 || error?.message?.includes('PERMISSION_DENIED')) {
        throw new Error('❌ Permission denied. Please check your API key permissions and billing status.');
      }
      
      if (error?.status === 429 || error?.message?.includes('rate limit') || error?.message?.includes('quota')) {
        throw new Error('❌ API rate limit exceeded. Please wait a moment and try again.');
      }
      
      if (error?.status === 503 || error?.message?.includes('service unavailable')) {
        throw new Error('🔧 OpenRouter service is temporarily unavailable. Please try again in a few moments.');
      }
      
      if (error?.message?.includes('network') || error?.message?.includes('fetch') || error?.code === 'NETWORK_ERROR') {
        throw new Error('❌ Network error. Please check your internet connection.');
      }

      if (error?.message?.includes('model') && error?.message?.includes('not found')) {
        throw new Error('❌ Model not available. The Claude Sonnet model may be temporarily unavailable.');
      }

      // Default error with original message
      throw new Error(`❌ OpenRouter API Error: ${error?.message || 'Unknown error occurred'}`);
    }
  }

  resetChat() {
    console.log('Chat reset requested');
    this.initializeChat();
  }

  getConversationHistory(): Array<{role: 'user' | 'assistant', content: string}> {
    return [...this.conversationHistory];
  }
}