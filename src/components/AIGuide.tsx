"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, Sparkles, Smile, RefreshCw, AlertCircle, HelpCircle } from "lucide-react";
import { ChatMessage } from "../types";

interface AIGuideProps {
  onClose?: () => void;
  onOpenBooking?: () => void;
}

export default function AIGuide({ onClose, onOpenBooking }: AIGuideProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presetPrompts = [
    { label: "PRP for Hair Loss", query: "Can you explain how PRP therapy stops hair loss and what the process looks like?" },
    { label: "Homeopathy for Psoriasis", query: "How does homeopathy treat chronic skin conditions like psoriasis or eczema naturally?" },
    { label: "Aesthetic Peels Guide", query: "What are medical chemical peels, and are they safe for hyperpigmentation?" },
    { label: "The Dual Therapy", query: "Why is combining modern medical aesthetics with homeopathy better for long-term health?" }
  ];

  // Welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "model",
          text: "Namaste! I am the **Muskaan Guide**, your warm and reassuring virtual assistant at Muskaan Clinic. 🌸\n\nI can help explain our Hair Restoration procedures (like PRP), Skin Care treatments (like clinical peels), and how constitutional homeopathy can heal your body from within.\n\nWhat hair or skin concerns can I help you understand today?",
          timestamp: new Date()
        }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setHasError(false);
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map history for API
      const chatHistory = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory
        })
      });

      if (!response.ok) {
        throw new Error("Failed to get response from clinical AI brain.");
      }

      const data = await response.json();
      
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: data.text,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
      setHasError(true);
      
      // Add a friendly fallback error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "model",
          text: "I apologize, but I am having trouble connecting to my clinical AI database right now. \n\nHowever, you can explore our complete services tab, or **book an official in-person consultation with Dr. Mohammad Imran Shaikh** directly using the Book tab above! We are located in Irwin Square, Amravati.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatText = (text: string) => {
    // Basic bold and list item formatting
    return text.split("\n").map((line, lineIdx) => {
      const formattedLine = line;
      
      // Bold formatting
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="font-bold text-charcoal">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const isListItem = line.trim().startsWith("- ") || line.trim().startsWith("* ");
      const listContent = isListItem ? line.replace(/^[-*]\s+/, "") : "";

      return (
        <p key={lineIdx} className={`text-sm leading-relaxed mb-2 ${isListItem ? "pl-4 list-item list-disc ml-4" : ""}`}>
          {isListItem ? listContent : (parts.length > 0 ? parts : line)}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-white border border-linen shadow-2xl rounded-2xl overflow-hidden" id="ai-guide-panel">
      {/* Panel Header */}
      <div className="bg-charcoal text-white p-4 flex justify-between items-center border-b border-slate-teal">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-slate-teal flex items-center justify-center border border-seafoam/20">
            <Bot className="text-linen" size={20} />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif font-bold text-sm text-white">Muskaan AI Guide</span>
              <Sparkles size={12} className="text-seafoam animate-pulse" />
            </div>
            <p className="text-[10px] text-seafoam font-semibold tracking-wider uppercase">
              Clinical Aesthetic & Homeopathy Assistant
            </p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            id="close-ai-guide-btn"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Disclaimers & Info */}
      <div className="bg-linen/30 border-b border-linen py-2 px-4 flex items-center space-x-2 text-[11px] text-charcoal/70">
        <AlertCircle size={14} className="text-slate-teal shrink-0" />
        <span>General guidance. Booking a consultation with Dr. Imran is advised for prescriptions.</span>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 min-h-0">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex items-start space-x-2.5 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}>
              {msg.role === "model" && (
                <div className="w-7 h-7 rounded-full bg-seafoam flex items-center justify-center text-charcoal shrink-0 mt-0.5 shadow-xs">
                  <Smile size={16} />
                </div>
              )}
              
              <div className={`p-3.5 rounded-2xl ${
                msg.role === "user"
                  ? "bg-slate-teal text-white rounded-tr-none shadow-md shadow-slate-teal/10"
                  : "bg-white border border-linen text-charcoal rounded-tl-none shadow-xs"
              }`}>
                {msg.role === "user" ? (
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                ) : (
                  <div className="space-y-0.5 prose prose-sm text-charcoal">
                    {formatText(msg.text)}
                  </div>
                )}
                <span className={`text-[9px] block text-right mt-1.5 ${msg.role === "user" ? "text-white/60" : "text-charcoal/40"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2.5 max-w-[85%]">
              <div className="w-7 h-7 rounded-full bg-seafoam flex items-center justify-center text-charcoal shrink-0 mt-0.5">
                <Smile size={16} className="animate-pulse" />
              </div>
              <div className="bg-white border border-linen p-4 rounded-2xl rounded-tl-none shadow-xs flex items-center space-x-2">
                <RefreshCw size={14} className="animate-spin text-slate-teal" />
                <span className="text-xs text-charcoal/60 font-medium">Muskaan Guide is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Preset Queries Grid */}
      {messages.length <= 1 && !isLoading && (
        <div className="p-4 bg-white border-t border-linen space-y-2">
          <p className="text-[10px] uppercase font-bold text-charcoal/50 flex items-center space-x-1.5 mb-1">
            <HelpCircle size={12} className="text-slate-teal" />
            <span>Common Clinical Questions</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {presetPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.query)}
                className="text-left text-xs bg-linen/20 hover:bg-linen hover:text-slate-teal text-charcoal/80 p-2.5 rounded-xl border border-linen transition-colors font-semibold"
                id={`preset-prompt-${idx}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Message Area */}
      <div className="p-4 bg-white border-t border-linen">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex space-x-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your hair/skin question..."
            disabled={isLoading}
            className="flex-1 bg-linen/20 border border-linen rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-slate-teal focus:ring-2 focus:ring-slate-teal/20 transition-all placeholder:text-charcoal/40"
            id="ai-chat-input"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-slate-teal hover:bg-charcoal text-white p-3 rounded-xl shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            id="ai-send-btn"
          >
            <Send size={16} />
          </button>
        </form>

        <div className="flex justify-between items-center mt-3 pt-1 text-[10px] text-charcoal/40">
          <span>Dr. M. I. Shaikh | Amravati</span>
          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="text-slate-teal font-bold hover:underline"
              id="ai-guide-book-shortcut"
            >
              Book Priority Visit →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
