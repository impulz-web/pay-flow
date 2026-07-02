'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'assistant';
  content: string;
}

interface ChatWidgetProps {
  isDarkMode: boolean;
}

export default function ChatWidget({ isDarkMode }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'assistant', content: 'Welcome to PayFlow support. I am FlowAI, your intelligent digital banking specialist. Ask me anything about our virtual cards, M-Pesa integration, fees, or secure transfers across Kenyan cities.' },
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const finalInput = textToSend || userInput;
    if (!finalInput.trim()) return;

    if (!textToSend) {
      setUserInput('');
    }
    setErrorText('');

    // Append user message
    const updatedMessages = [...messages, { sender: 'user', content: finalInput } as ChatMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch support response');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: 'assistant', content: data.text }]);
    } catch (err: any) {
      console.error(err);
      setErrorText('Could not contact support assistant. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const PRESET_QUERIES = [
    'How do I deposit via M-Pesa?',
    'What are the Business Account fees?',
    'Which Kenyan banks are supported?',
    'How do I get a Virtual Card?',
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className={`w-[360px] h-[480px] rounded-2xl border flex flex-col overflow-hidden mb-4 shadow-2xl transition-all duration-300 ${
          isDarkMode ? 'bg-navy-950 border-navy-800' : 'bg-white border-slate-200'
        }`}>
          {/* Header */}
          <div className="bg-navy-900 text-white px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-display font-medium text-sm">FlowAI Banking Specialist</h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-slate-300">Online & Compliant</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin flex flex-col">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-500 text-white self-end rounded-tr-none'
                    : isDarkMode
                      ? 'bg-navy-900 text-slate-200 self-start rounded-tl-none border border-navy-800'
                      : 'bg-slate-100 text-navy-900 self-start rounded-tl-none'
                }`}
              >
                {msg.content}
              </div>
            ))}

            {isTyping && (
              <div className={`max-w-[40%] rounded-2xl p-3 text-xs self-start rounded-tl-none flex items-center gap-1.5 ${
                isDarkMode ? 'bg-navy-900 text-slate-400' : 'bg-slate-100 text-navy-500'
              }`}>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-500" />
                <span>FlowAI typing...</span>
              </div>
            )}

            {errorText && (
              <div className="text-xs text-rose-500 flex items-center gap-1 bg-rose-500/10 p-2 rounded-lg mt-2">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorText}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preset Buttons */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {PRESET_QUERIES.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className={`text-[10px] px-2.5 py-1 rounded-full border transition-all text-left font-display hover:scale-[1.01] ${
                    isDarkMode 
                      ? 'border-navy-800 bg-navy-900/40 text-slate-300 hover:border-navy-700' 
                      : 'border-slate-200 bg-slate-50 text-navy-700 hover:bg-slate-100'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className={`p-3 border-t flex gap-2 ${
            isDarkMode ? 'bg-navy-950 border-navy-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask FlowAI a banking question..."
              className={`flex-1 text-xs p-2.5 rounded-xl border ${
                isDarkMode 
                  ? 'bg-navy-900 border-navy-800 text-white placeholder-slate-500' 
                  : 'bg-white border-slate-200 text-navy-900 placeholder-slate-400'
              }`}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isTyping || !userInput.trim()}
              className="p-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white rounded-xl transition-all shadow-sm shrink-0 flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 hover:scale-105 active:scale-95 text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-all border border-emerald-400/20"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6 animate-pulse" />
        )}
      </button>
    </div>
  );
}
