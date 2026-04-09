"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

export const GlobalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: string; text: string; sender: 'ai' | 'user' }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages come
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial opening sequence
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          { id: Date.now().toString(), text: "Hallo! Ich bin der Medientrupp KI-Assistent. Wie kann ich Ihnen beim Skalieren Ihrer Infrastruktur helfen?", sender: "ai" }
        ]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { id: Date.now().toString(), text: inputValue, sender: 'user' as const };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        text: "Danke für die Nachricht! Einer unserer Senior-Berater wird sich das ansehen und sich bei Ihnen melden. In der Zwischenzeit: Möchten Sie unser Pitch-Deck sehen?", 
        sender: 'ai' 
      }]);
    }, 2000);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="relative group">
              {/* Pulse effect */}
              <motion.div 
                animate={{ scale: [1, 1.4], opacity: [0.5, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-indigo-500 rounded-full"
              />
              <button
                onClick={() => setIsOpen(true)}
                className="relative w-16 h-16 bg-slate-900 border-2 border-indigo-500 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all duration-300 group-hover:-translate-y-1"
                aria-label="Chat öffnen"
              >
                <MessageCircle size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[550px] max-h-[calc(100vh-6rem)] bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl shadow-indigo-900/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                </div>
                <div>
                  <h3 className="font-bold tracking-tight text-sm">Medientrupp Support</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Powered by AI</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800 transition-colors"
                aria-label="Chat schließen"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 pb-0 flex flex-col gap-4 scroll-smooth bg-slate-50/50">
              <AnimatePresence>
                {messages.map((m) => (
                  <motion.div 
                    key={m.id}
                    initial={{ opacity: 0, y: 10, x: m.sender === 'user' ? 10 : -10 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      m.sender === 'user' 
                        ? 'self-end bg-indigo-600 text-white rounded-br-sm shadow-md shadow-indigo-200' 
                        : 'self-start bg-white border border-slate-100 text-slate-700 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {m.text}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="self-start bg-white border border-slate-100 rounded-2xl rounded-bl-sm p-4 flex gap-1.5 shadow-sm"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div 
                        key={i}
                        animate={{ y: [0, -5, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }} 
                        className="w-2 h-2 rounded-full bg-slate-300" 
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100 mt-auto">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Schreiben Sie eine Nachricht..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium placeholder:text-slate-400"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-2 w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-full disabled:opacity-50 transition-all hover:bg-indigo-700"
                  aria-label="Senden"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </form>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
