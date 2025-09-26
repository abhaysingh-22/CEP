import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

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

  constructor() {
    console.log('Initializing Gemini Chat Service...');
    console.log('API Key available:', !!API_KEY);
    console.log('API Key length:', API_KEY?.length);
    
    try {
      this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
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
      console.log('Chat initialized successfully');
    } catch (error) {
      console.error('Error initializing chat:', error);
      throw error;
    }
  }

  async sendMessage(message: string): Promise<string> {
    console.log('Sending message to Gemini:', message);
    
    try {
      // Validate inputs
      if (!message || message.trim().length === 0) {
        throw new Error('Message cannot be empty');
      }

      if (!this.chat) {
        console.log('Chat not initialized, reinitializing...');
        this.initializeChat();
      }

      // Simple message without too much context to avoid token issues
      const prompt = `You are EcoBot, a sustainable travel assistant. Help with this eco-travel question: ${message}`;
      
      console.log('Sending prompt to Gemini...');
      const result = await this.chat.sendMessage(prompt);
      
      console.log('Received result from Gemini');
      const response = await result.response;
      const text = response.text();
      
      console.log('Response text length:', text?.length);
      
      if (!text || text.trim().length === 0) {
        throw new Error('Empty response from Gemini API');
      }
      
      return text;
    } catch (error: any) {
      console.error('Detailed error sending message to Gemini:', {
        error: error,
        message: error?.message,
        stack: error?.stack,
        name: error?.name
      });
      
      // More specific error messages
      if (error?.message?.includes('API_KEY')) {
        throw new Error('Invalid API key. Please check your Gemini API configuration.');
      }
      
      if (error?.message?.includes('quota') || error?.message?.includes('limit')) {
        throw new Error('API quota exceeded. Please try again later.');
      }
      
      if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      }
      
      throw new Error(`AI service error: ${error?.message || 'Unknown error occurred'}`);
    }
  }

  resetChat() {
    this.initializeChat();
  }
}