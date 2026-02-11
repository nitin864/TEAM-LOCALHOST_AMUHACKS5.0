"use client";
import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, Sparkles, Lightbulb, Bot, User } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const genAI = new GoogleGenerativeAI(
  "AIzaSyDimpHq2NuUWPtk5RRUcGOrKumKvoaL0SY" as string
);

export default function Aibot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const facts = [
    "Spitting in public places is punishable by fine in many states.",
    "Damaging public property can lead to imprisonment up to 5 years.",
    "Not following traffic rules can result in heavy penalties and license suspension.",
    "Voting is a right that strengthens democracy.",
    "Littering in public places spreads diseases and harms the environment.",
  ];

  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % facts.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateResponse = async (userPrompt: string): Promise<string> => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const systemPrompt = `
You are a Civic Responsibility Assistant inside an educational web app.
Explain civic duties, laws, and responsible behavior clearly.
If given a real-life case, suggest practical civic actions.
If unrelated to civic topics, politely guide the user back.
Give answers in bullet points where needed and keep them concise.
`;
      const result = await model.generateContent(
        systemPrompt + "\nUser: " + userPrompt
      );
      return result.response.text();
    } catch (error) {
      console.error(error);
      return "Sorry, I couldn't generate a response right now.";
    }
  };

  const typeBotMessage = (response: string) => {
    let i = 0;
    setIsTyping(true);
    const id = setInterval(() => {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated.length - 1;
        updated[last] = {
          ...updated[last],
          text: response.slice(0, i),
        };
        return updated;
      });
      i++;
      if (i > response.length) {
        clearInterval(id);
        setIsTyping(false);
      }
    }, 12);
  };

  const askAI = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setMessages((prev) => [...prev, { sender: "bot", text: "" }]);

    const response = await generateResponse(userText);
    typeBotMessage(response);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Quote Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-400 to-green-500 dark:from-emerald-700 dark:to-green-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-4">
            <Bot size={16} />
            <span>AI Civic Assistant</span>
          </div>

          <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
            "A responsible citizen builds a responsible nation."
          </h1>
          <p className="text-lg text-green-50 font-medium">
            Ask me anything about civic duties, laws, and rights
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Area - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg">
              {/* Chat Messages */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                      <Sparkles className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Start a Conversation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                      Ask me about civic responsibilities, laws, rights, or any civic topic you're curious about!
                    </p>
                  </div>
                )}

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        msg.sender === "user"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {msg.sender === "user" ? (
                        <User size={20} />
                      ) : (
                        <Bot size={20} />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      <Bot size={20} />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t-2 border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Ask about civic duties, laws, rights..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && askAI()}
                    className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-green-500 dark:focus:border-green-400 transition-colors text-sm font-medium"
                    disabled={isTyping}
                  />
                  <button
                    onClick={askAI}
                    disabled={!input.trim() || isTyping}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                  >
                    <Send size={18} />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Did You Know - Takes 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-6 shadow-lg sticky top-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-black text-amber-900 dark:text-amber-100">
                  Did You Know?
                </h3>
              </div>

              <div className="relative">
                <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed text-sm">
                  {facts[factIndex]}
                </p>

                {/* Pagination Dots */}
                <div className="flex gap-1.5 mt-4 justify-center">
                  {facts.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === factIndex
                          ? "w-6 bg-amber-500"
                          : "w-1.5 bg-amber-300 dark:bg-amber-700"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-1 bg-amber-200 dark:bg-amber-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-[7000ms] ease-linear"
                  style={{
                    width: "100%",
                    animation: "progress 7s linear infinite",
                  }}
                />
              </div>
            </div>

            {/* Quick Tips */}
            <div className="mt-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-5">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">
                💡 Try asking:
              </h4>
              <ul className="space-y-2 text-xs">
                <li className="text-gray-600 dark:text-gray-400 font-medium">
                  • What are my fundamental rights?
                </li>
                <li className="text-gray-600 dark:text-gray-400 font-medium">
                  • Explain right to equality
                </li>
                <li className="text-gray-600 dark:text-gray-400 font-medium">
                  • What happens if I litter?
                </li>
                <li className="text-gray-600 dark:text-gray-400 font-medium">
                  • How can I be a good citizen?
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}