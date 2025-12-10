import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, AlertCircle } from 'lucide-react';
import { streamChatResponse } from '../services/gemini';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Greetings. I am Vedha AI. How can I assist with your digital transformation goals today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    setMessages(prev => [...prev, { role: 'model', text: '', timestamp: new Date() }]);

    try {
      const stream = streamChatResponse(history, userMsg.text);
      let fullResponse = "";

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
           const newMessages = [...prev];
           newMessages[newMessages.length - 1].text = fullResponse;
           return newMessages;
        });
      }
    } catch (e) {
      console.error(e);
      setError('Unable to connect to AI service. Please try again.');
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = 'I apologize, but I am experiencing technical difficulties. Please try again in a moment.';
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-vedha-accent hover:bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-500/30 transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-vedha-blue focus:ring-offset-2 focus:ring-offset-[#030712] ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open AI chat assistant"
        aria-expanded={isOpen}
      >
        <Bot className="h-6 w-6" />
      </button>

      {isOpen && (
        <div
          ref={chatWindowRef}
          className="fixed bottom-8 right-8 z-50 w-[350px] md:w-[400px] h-[500px] glass-panel rounded-2xl flex flex-col shadow-2xl animate-fade-in"
          role="dialog"
          aria-labelledby="chatbot-title"
          aria-modal="true"
        >
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5 rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-label="Online status"></div>
              <span id="chatbot-title" className="font-display font-bold text-white text-sm">Vedha AI (Gemini 3)</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-vedha-blue rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-vedha-accent text-white rounded-br-none'
                      : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
                  }`}
                  role={msg.role === 'user' ? 'status' : 'status'}
                >
                  {msg.text || (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-vedha-blue rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-vedha-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-vedha-blue rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400" role="alert">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-white/10 bg-black/20 rounded-b-2xl">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center space-x-2">
              <label htmlFor="chat-input" className="sr-only">Message</label>
              <input
                id="chat-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about our services..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-vedha-accent focus:ring-2 focus:ring-vedha-accent transition-colors"
                disabled={isLoading}
                aria-label="Chat message input"
              />
              <button
                type="submit"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-vedha-accent rounded-full text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-vedha-blue"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
