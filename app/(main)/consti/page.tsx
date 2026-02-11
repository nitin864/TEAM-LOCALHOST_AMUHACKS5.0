"use client";

import React, { useState, useMemo } from "react";
import { Search, BookOpen, Scale, Sparkles } from "lucide-react";

type Category = "Fundamental Right" | "Legal Right" | "Civil Right";

interface Right {
  id: number;
  title: string;
  originalText: string;
  simplified: string;
  category: Category;
  emoji: string;
}

const rightsData: Right[] = [
  {
    id: 1,
    title: "Right to Equality",
    originalText:
      "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
    simplified: "Everyone is equal before the law. No one gets special treatment.",
    category: "Fundamental Right",
    emoji: "⚖️",
  },
  {
    id: 2,
    title: "Prohibition of Discrimination",
    originalText:
      "The State shall not discriminate against any citizen on grounds of religion, race, caste, sex, or place of birth.",
    simplified:
      "You cannot be treated unfairly because of your religion, caste, gender, or birthplace.",
    category: "Fundamental Right",
    emoji: "🤝",
  },
  {
    id: 3,
    title: "Equality of Opportunity",
    originalText:
      "There shall be equality of opportunity for all citizens in matters relating to employment under the State.",
    simplified: "Everyone has an equal chance for government jobs.",
    category: "Fundamental Right",
    emoji: "💼",
  },
  {
    id: 4,
    title: "Abolition of Untouchability",
    originalText: "Untouchability is abolished and its practice in any form is forbidden.",
    simplified: "Untouchability is illegal and punishable by law.",
    category: "Fundamental Right",
    emoji: "🚫",
  },
  {
    id: 5,
    title: "Abolition of Titles",
    originalText:
      "No title, not being a military or academic distinction, shall be conferred by the State.",
    simplified:
      "The government cannot give special titles that create inequality.",
    category: "Fundamental Right",
    emoji: "👑",
  },
  {
    id: 6,
    title: "Freedom of Speech & Expression",
    originalText:
      "All citizens shall have the right to freedom of speech and expression.",
    simplified:
      "You can speak your mind freely (within reasonable limits).",
    category: "Fundamental Right",
    emoji: "💬",
  },
  {
    id: 7,
    title: "Freedom of Assembly",
    originalText:
      "All citizens shall have the right to assemble peaceably and without arms.",
    simplified:
      "You can hold peaceful protests and gatherings.",
    category: "Fundamental Right",
    emoji: "👥",
  },
  {
    id: 8,
    title: "Freedom of Association",
    originalText:
      "All citizens shall have the right to form associations or unions.",
    simplified:
      "You can form groups, unions, and organizations.",
    category: "Fundamental Right",
    emoji: "🤝",
  },
  {
    id: 9,
    title: "Freedom of Movement",
    originalText:
      "All citizens shall have the right to move freely throughout the territory of India.",
    simplified:
      "You can travel anywhere in India.",
    category: "Fundamental Right",
    emoji: "🚶",
  },
  {
    id: 10,
    title: "Freedom to Reside Anywhere",
    originalText:
      "All citizens shall have the right to reside and settle in any part of the territory of India.",
    simplified:
      "You can live anywhere in India.",
    category: "Fundamental Right",
    emoji: "🏠",
  },
  {
    id: 11,
    title: "Freedom of Profession",
    originalText:
      "All citizens shall have the right to practice any profession or carry on any occupation, trade or business.",
    simplified:
      "You can choose any career or business.",
    category: "Fundamental Right",
    emoji: "💻",
  },
  {
    id: 12,
    title: "Protection in Respect of Conviction",
    originalText:
      "No person shall be convicted of any offence except for violation of a law in force at the time.",
    simplified:
      "You can't be punished for something that wasn't illegal when you did it.",
    category: "Fundamental Right",
    emoji: "🛡️",
  },
  {
    id: 13,
    title: "Right to Life & Personal Liberty",
    originalText:
      "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
    simplified:
      "You have the right to live with dignity and freedom.",
    category: "Fundamental Right",
    emoji: "❤️",
  },
  {
    id: 14,
    title: "Right to Education",
    originalText:
      "The State shall provide free and compulsory education to all children of the age of six to fourteen years.",
    simplified:
      "Every child between 6–14 years has the right to free education.",
    category: "Fundamental Right",
    emoji: "📚",
  },
  {
    id: 15,
    title: "Protection Against Arrest",
    originalText:
      "No person who is arrested shall be detained without being informed of the grounds for such arrest.",
    simplified:
      "If arrested, you must be told why and have access to a lawyer.",
    category: "Legal Right",
    emoji: "👮",
  },
  {
    id: 16,
    title: "Right to Information",
    originalText:
      "Citizens have the right to request information from public authorities.",
    simplified:
      "You can ask the government for information and they must reply.",
    category: "Civil Right",
    emoji: "📄",
  },
  {
    id: 17,
    title: "Right to Vote",
    originalText:
      "Every citizen above 18 years has the right to vote in elections.",
    simplified:
      "You can choose your leaders after turning 18.",
    category: "Civil Right",
    emoji: "🗳️",
  },
  {
    id: 18,
    title: "Right to Privacy",
    originalText:
      "The Right to Privacy is protected as part of Article 21 by the Supreme Court.",
    simplified:
      "Your personal data and life are private.",
    category: "Fundamental Right",
    emoji: "🔒",
  },
  {
    id: 19,
    title: "Consumer Protection Right",
    originalText:
      "Consumers have the right to safety, information, and redressal under the Consumer Protection Act.",
    simplified:
      "You can complain if you are cheated by a seller.",
    category: "Legal Right",
    emoji: "🛒",
  },
  {
    id: 20,
    title: "Right Against Exploitation",
    originalText:
      "Traffic in human beings and forced labour are prohibited.",
    simplified:
      "No one can force you to work without pay.",
    category: "Fundamental Right",
    emoji: "⛓️",
  },
  {
    id: 21,
    title: "Child Labour Prohibition",
    originalText:
      "No child below the age of fourteen shall be employed in hazardous work.",
    simplified:
      "Children cannot be made to work in dangerous jobs.",
    category: "Fundamental Right",
    emoji: "👶",
  },
  {
    id: 22,
    title: "Freedom of Religion",
    originalText:
      "All persons are equally entitled to freedom of conscience and religion.",
    simplified:
      "You can follow any religion you like.",
    category: "Fundamental Right",
    emoji: "🕉️",
  },
  {
    id: 23,
    title: "Cultural & Educational Rights",
    originalText:
      "Any section of citizens with a distinct culture has the right to preserve it.",
    simplified:
      "You can protect your language and culture.",
    category: "Fundamental Right",
    emoji: "🎭",
  },
  {
    id: 24,
    title: "Right to Constitutional Remedies",
    originalText:
      "The right to move the Supreme Court for enforcement of fundamental rights.",
    simplified:
      "You can go directly to court if your rights are violated.",
    category: "Fundamental Right",
    emoji: "⚖️",
  },
  {
    id: 25,
    title: "Right to Legal Aid",
    originalText:
      "Free legal aid is provided to ensure justice is not denied due to financial constraints.",
    simplified:
      "If you can't afford a lawyer, the government provides one.",
    category: "Legal Right",
    emoji: "👨‍⚖️",
  },
  {
    id: 26,
    title: "Right to Clean Environment",
    originalText:
      "Recognized under Article 21 as part of the right to life.",
    simplified:
      "You have the right to live in a clean and healthy environment.",
    category: "Fundamental Right",
    emoji: "🌿",
  },
  {
    id: 27,
    title: "Right to Shelter",
    originalText:
      "Recognized by courts as part of the right to life under Article 21.",
    simplified:
      "Everyone deserves a basic place to live.",
    category: "Fundamental Right",
    emoji: "🏘️",
  },
  {
    id: 28,
    title: "Right to Health",
    originalText:
      "Health is recognized as essential under Article 21 by judiciary interpretation.",
    simplified:
      "You have the right to access basic healthcare.",
    category: "Fundamental Right",
    emoji: "🏥",
  },
  {
    id: 29,
    title: "Right to Public Hearing",
    originalText:
      "Citizens can participate in public hearings regarding policies and development.",
    simplified:
      "You can raise your voice in public decision-making.",
    category: "Civil Right",
    emoji: "📢",
  },
  {
    id: 30,
    title: "Right to FIR",
    originalText:
      "Any person can file an FIR at a police station for a cognizable offence.",
    simplified:
      "You can report a crime to the police and they must register it.",
    category: "Legal Right",
    emoji: "🚨",
  }
];

const categoryColors = {
  "Fundamental Right": "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300",
  "Legal Right": "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
  "Civil Right": "bg-violet-50 dark:bg-violet-950 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300",
};

export default function ConstitutionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSimplified, setShowSimplified] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");

  const filteredRights = useMemo(() => {
    return rightsData.filter((right) => {
      const matchesSearch = `${right.title} ${right.originalText} ${right.simplified}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || right.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-400 to-green-500 dark:from-emerald-700 dark:to-green-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-6">
            <BookOpen size={16} />
            <span>Constitution of India</span>
          </div>
          
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
            Your Rights & Freedoms
          </h1>
          <p className="text-xl text-green-50 max-w-2xl mx-auto font-medium">
            Learn about the rights that protect you. Simple, clear, empowering.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search & Filter Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for rights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-green-500 dark:focus:border-green-400 transition-colors text-base font-medium"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-3">
            {(["All", "Fundamental Right", "Legal Right", "Civil Right"] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all transform hover:scale-105 active:scale-95 ${
                  selectedCategory === category
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-2">
            <button
              onClick={() => setShowSimplified(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                showSimplified
                  ? "bg-green-500 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Sparkles size={16} />
              Simple Meaning
            </button>
            <button
              onClick={() => setShowSimplified(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                !showSimplified
                  ? "bg-green-500 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Scale size={16} />
              Legal Text
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {filteredRights.length} {filteredRights.length === 1 ? "right" : "rights"} found
          </p>
        </div>

        {/* Rights Cards Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredRights.map((right, index) => (
            <div
              key={right.id}
              className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-green-300 dark:hover:border-green-600 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.05}s both`
              }}
            >
              {/* Category Badge & Emoji */}
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 ${categoryColors[right.category]}`}>
                  {right.category}
                </span>
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {right.emoji}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {right.title}
              </h3>

              {/* Description */}
              <p className={`leading-relaxed font-medium ${
                showSimplified 
                  ? "text-gray-700 dark:text-gray-300 text-base" 
                  : "text-gray-600 dark:text-gray-400 text-sm"
              }`}>
                {showSimplified ? right.simplified : right.originalText}
              </p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRights.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No rights found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}