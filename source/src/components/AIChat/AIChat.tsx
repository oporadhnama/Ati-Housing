'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! Welcome to Ati Society. Ask me anything about our plots, facilities, or location. (আপনি চাইলে বাংলাতেও প্রশ্ন করতে পারেন!)' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Create chat history to send to API
      const chatHistory = messages.map(m => ({ role: m.role, content: m.content }));
      chatHistory.push(userMessage);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'I am sorry, I am having trouble connecting right now. Please call us at 01333321444 instead.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-4"
          >
            {/* Grab attention text */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="hidden md:block bg-surface-white text-text-primary px-4 py-2 rounded-full shadow-lg border border-brand-gold/30 text-sm font-semibold pointer-events-none"
            >
              Ask AI about us
            </motion.div>
            
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center justify-center w-16 h-16 bg-brand-gold hover:bg-brand-gold-light text-white rounded-full shadow-gold-md focus:outline-none focus:ring-4 focus:ring-brand-gold-pale transition-transform hover:scale-110 active:scale-95 group"
            >
              {/* Pulse effect */}
              <span className="absolute inset-0 rounded-full border-2 border-brand-gold opacity-0 group-hover:animate-ping" />
              <MessageSquare size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-[100] w-[calc(100vw-3rem)] md:w-[400px] h-[550px] max-h-[85vh] bg-surface-white rounded-2xl shadow-2xl flex flex-col border border-border-subtle overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-navy p-4 text-white flex justify-between items-center shadow-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold/20 rounded-full flex items-center justify-center">
                  <Bot size={22} className="text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-base leading-tight">ATI AI Assistant</h3>
                  <p className="text-xs text-brand-gold-light">Online & Ready to help</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-surface-cream space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-brand-gold' : 'bg-brand-navy'}`}>
                    {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                  </div>
                  <div className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-brand-gold text-white rounded-tr-sm' 
                      : 'bg-white text-text-primary shadow-sm border border-black/5 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-navy flex-shrink-0 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-black/5 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-brand-gold" />
                    <span className="text-xs text-text-muted">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-border-subtle relative z-10">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  disabled={isLoading}
                  className="w-full bg-surface-cream border border-border-subtle rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-10 h-10 bg-brand-navy hover:bg-brand-navy-deep text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:hover:bg-brand-navy"
                >
                  <Send size={18} className="mr-0.5 mt-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
