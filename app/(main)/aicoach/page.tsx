"use client";
import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./aibot.css";
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
    const id = setInterval(() => {
      setMessages((prev) => { const updated = [...prev];
        const last = updated.length - 1;
        updated[last] = {
          ...updated[last],
          text: response.slice(0, i),
        };
        return updated;
      });
      i++;
      if (i > response.length) clearInterval(id);
    }, 12);
  };
  const askAI = async () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setMessages((prev) => [...prev, { sender: "bot", text: "" }]);
    const response = await generateResponse(userText);
    typeBotMessage(response);
  };
  return (
    <>
      <div className="quote-banner">
        “A responsible citizen builds a responsible nation.”
      </div>
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Ask about civic duties, laws, rights..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askAI()} />
          <button onClick={askAI}>Send</button>
        </div>
      </div>
     <div className="fact-box">
        <h3>Did You Know?</h3>
        <p>{facts[factIndex]}</p>
      </div>
    </>
  );
}
