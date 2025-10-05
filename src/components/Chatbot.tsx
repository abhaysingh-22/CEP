import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Minimize2,
  Maximize2,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import { OpenRouterChatService, ChatMessage } from '../services/openRouterChat';

// Voice command interfaces for better type safety
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m EcoBot, your AI-powered sustainable travel assistant. Powered by Claude, I can help you with eco-friendly travel tips, destination recommendations, carbon footprint reduction, and sustainable tourism practices. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatService] = useState(() => {
    console.log('Creating OpenRouterChatService instance...');
    try {
      const service = new OpenRouterChatService();
      console.log('OpenRouterChatService created successfully');
      return service;
    } catch (error) {
      console.error('Failed to create OpenRouterChatService:', error);
      throw error;
    }
  });
  
  // Voice command states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initialize Speech Recognition
  useEffect(() => {
    // Check if Web Speech API is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setSpeechSupported(true);
      
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        console.log('🎤 Speech recognition started');
        setIsListening(true);
      };
      
      recognition.onend = () => {
        console.log('🎤 Speech recognition ended');
        setIsListening(false);
      };
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          console.log('🎤 Speech recognized:', transcript);
          setInputMessage(transcript);
          // Auto-send the message after voice input
          setTimeout(() => {
            if (transcript.trim()) {
              handleSendMessage(transcript.trim());
            }
          }, 100);
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('🎤 Speech recognition error:', event.error);
        setIsListening(false);
        
        // Show user-friendly error messages
        let errorMsg = 'Voice recognition failed. ';
        switch (event.error) {
          case 'not-allowed':
            errorMsg += 'Please allow microphone access.';
            break;
          case 'no-speech':
            errorMsg += 'No speech detected. Please try again.';
            break;
          case 'network':
            errorMsg += 'Network error. Check your connection.';
            break;
          default:
            errorMsg += 'Please try again.';
        }
        
        // Briefly show error in input placeholder
        const originalPlaceholder = inputRef.current?.placeholder;
        if (inputRef.current) {
          inputRef.current.placeholder = errorMsg;
          setTimeout(() => {
            if (inputRef.current && originalPlaceholder) {
              inputRef.current.placeholder = originalPlaceholder;
            }
          }, 3000);
        }
      };
      
      recognitionRef.current = recognition;
    } else {
      console.warn('🎤 Speech Recognition not supported in this browser');
      setSpeechSupported(false);
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Cleanup effect for speech synthesis
  useEffect(() => {
    return () => {
      // Stop any ongoing speech when component unmounts or chat closes
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isOpen]);

  // Text-to-Speech function
  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    setIsSpeaking(true);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    
    // Try to use a pleasant voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.lang.startsWith('en')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.onstart = () => {
      console.log('🔊 Speaking started');
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      console.log('🔊 Speaking ended');
      setIsSpeaking(false);
    };
    
    utterance.onerror = (event) => {
      console.error('🔊 Speech synthesis error:', event);
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  // Start/Stop voice listening
  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      // Clear any previous input
      setInputMessage('');
      recognitionRef.current.start();
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      console.log('Attempting to send message to chat service...');
      console.log('User message content:', userMessage.content);
      console.log('Chat service exists:', !!chatService);
      
      const response = await chatService.sendMessage(userMessage.content);
      console.log('Received response from chat service:', response);
      console.log('Response length:', response?.length);
      console.log('Response preview:', response?.substring(0, 100) + '...');
      
      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Auto-speak the response if voice is enabled
      if (voiceEnabled && response) {
        // Add a small delay to ensure message is rendered first
        setTimeout(() => {
          speakText(response);
        }, 300);
      }
      
    } catch (error: any) {
      console.error('Chat error details:', error);
      
      let errorContent = 'I apologize, but I\'m having trouble responding right now. ';
      
      // Handle specific error types
      if (error?.message?.includes('service is currently unavailable')) {
        errorContent = '🔧 The AI service is temporarily busy. Please wait a moment and try again!';
      } else if (error?.message?.includes('quota')) {
        errorContent = '📊 API usage limit reached. Please try again in a few minutes.';
      } else if (error?.message?.includes('network')) {
        errorContent = '🌐 Network connection issue. Please check your internet and try again.';
      } else if (error?.message) {
        errorContent += `Error: ${error.message}`;
      } else {
        errorContent += 'Please try again in a moment.';
      }
      
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: errorContent,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      
      // Speak error message if voice is enabled
      if (voiceEnabled) {
        setTimeout(() => {
          speakText('I apologize, but I\'m having trouble responding right now. Please try again.');
        }, 300);
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: generateId(),
        role: 'assistant',
        content: 'Chat cleared! How can I help you with your eco-travel plans?',
        timestamp: new Date(),
      },
    ]);
    chatService.resetChat();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Floating chat button
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 safe-area-bottom">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-12 w-12 sm:h-14 sm:w-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-nature-accent hover:bg-nature-accent/90 chatbot-pulse touch-target"
          title="Chat with EcoBot - Your sustainable travel assistant"
        >
          <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-3 w-3 sm:h-4 sm:w-4 bg-red-600 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 safe-area-bottom">
      <Card className={`transition-all duration-300 shadow-2xl ${
        isMinimized 
          ? 'w-72 sm:w-80 h-14 sm:h-16' 
          : 'w-[calc(100vw-2rem)] sm:w-80 md:w-96 h-[calc(100vh-6rem)] sm:h-[500px] md:h-[600px] max-w-md'
      }`}>
        {/* Header */}
        <CardHeader className="p-3 sm:p-4 bg-gradient-to-r from-nature-primary to-nature-accent text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <CardTitle className="text-base sm:text-lg font-semibold">EcoBot</CardTitle>
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-red-400 rounded-full animate-pulse flex-shrink-0"></div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 h-7 w-7 sm:h-8 sm:w-8 p-0 touch-target"
              >
                {isMinimized ? (
                  <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-7 w-7 sm:h-8 sm:w-8 p-0 touch-target"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="p-0 h-[calc(100%-8rem)] sm:h-[420px] md:h-[480px] flex flex-col">
              <ScrollArea className="flex-1 p-3 sm:p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex-shrink-0 h-8 w-8 bg-nature-accent rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[200px] sm:max-w-[250px] rounded-lg p-2 sm:p-3 ${
                          message.role === 'user'
                            ? 'bg-nature-primary text-white'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                        <p className={`text-xs mt-1 opacity-70`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>

                      {message.role === 'user' && (
                        <div className="flex-shrink-0 h-8 w-8 bg-nature-primary rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="flex-shrink-0 h-8 w-8 bg-nature-accent rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm text-muted-foreground">
                            EcoBot is thinking...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Input */}
              <div className="p-3 sm:p-4 border-t">
                <div className="flex gap-1 sm:gap-2">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isListening ? "🎤 Listening..." : "Ask about eco-travel..."}
                    disabled={isLoading || isListening}
                    className="flex-1 text-xs sm:text-sm"
                  />
                  
                  {/* Voice Control Buttons */}
                  {speechSupported && (
                    <Button
                      onClick={toggleListening}
                      disabled={isLoading}
                      size="sm"
                      variant={isListening ? "destructive" : "outline"}
                      className={`${isListening ? 'animate-pulse' : ''} touch-target min-w-[2rem] sm:min-w-[2.5rem]`}
                      title={isListening ? "Stop listening" : "Start voice input"}
                    >
                      {isListening ? <MicOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Mic className="h-3 w-3 sm:h-4 sm:w-4" />}
                    </Button>
                  )}
                  
                  {('speechSynthesis' in window) && (
                    <Button
                      onClick={() => {
                        if (isSpeaking) {
                          stopSpeaking();
                        } else {
                          setVoiceEnabled(!voiceEnabled);
                        }
                      }}
                      size="sm"
                      variant="outline"
                      className={`${isSpeaking ? 'animate-pulse' : ''} touch-target min-w-[2rem] sm:min-w-[2.5rem]`}
                      title={isSpeaking ? "Stop speaking" : voiceEnabled ? "Disable voice responses" : "Enable voice responses"}
                    >
                      {isSpeaking ? (
                        <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : voiceEnabled ? (
                        <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <VolumeX className="h-3 w-3 sm:h-4 sm:w-4 opacity-50" />
                      )}
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isLoading || isListening}
                    size="sm"
                    className="bg-nature-accent hover:bg-nature-accent/90 touch-target min-w-[2rem] sm:min-w-[2.5rem]"
                  >
                    <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearChat}
                    className="text-xs text-muted-foreground hover:text-foreground h-6 px-2"
                  >
                    Clear chat
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {/* Voice status indicators */}
                    {speechSupported && (
                      <span className="text-xs text-muted-foreground">
                        {isListening ? '🎤 Listening...' : 'Click mic to speak'}
                      </span>
                    )}
                    {!speechSupported && (
                      <span className="text-xs text-muted-foreground">
                        Voice not supported
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Voice instructions - Show only on larger screens */}
                {speechSupported && (
                  <div className="mt-2 text-xs text-muted-foreground bg-muted/50 rounded p-2 hidden sm:block">
                    <div className="flex items-center gap-2 mb-1">
                      <Mic className="h-3 w-3" />
                      <span className="font-medium">Voice Commands:</span>
                    </div>
                    <div className="space-y-1">
                      <div>• Click <Mic className="h-3 w-3 inline" /> to speak your message</div>
                      <div>• Responses will be read aloud automatically</div>
                      <div>• Click <Volume2 className="h-3 w-3 inline" /> to toggle voice responses</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default Chatbot;