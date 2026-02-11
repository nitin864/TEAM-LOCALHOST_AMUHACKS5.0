"use client";

import React, { useState, useMemo } from "react";
import { Search, Users, Heart, Lightbulb, CheckCircle2, AlertCircle } from "lucide-react";

type Category = "Environmental" | "Social" | "Legal" | "Community";

interface CivicDuty {
  id: number;
  title: string;
  description: string;
  why: string;
  howTo: string;
  category: Category;
  emoji: string;
  importance: "High" | "Medium" | "Essential";
}

const civicDutiesData: CivicDuty[] = [
  {
    id: 1,
    title: "Vote in Elections",
    description: "Exercise your democratic right to choose your representatives",
    why: "Your vote shapes the future of your community and country. Every vote counts in building the democracy we want.",
    howTo: "Register as a voter, verify your details, and cast your vote on election day. Bring valid ID proof.",
    category: "Legal",
    emoji: "🗳️",
    importance: "Essential",
  },
  {
    id: 2,
    title: "Pay Taxes Honestly",
    description: "Contribute your fair share to nation-building",
    why: "Taxes fund public services like roads, schools, hospitals, and infrastructure that benefit everyone.",
    howTo: "File your income tax returns on time, pay all applicable taxes, and keep proper records of your income.",
    category: "Legal",
    emoji: "💰",
    importance: "Essential",
  },
  {
    id: 3,
    title: "Keep Public Spaces Clean",
    description: "Don't litter and maintain cleanliness in shared spaces",
    why: "Clean spaces prevent disease, improve quality of life, and show respect for your community.",
    howTo: "Use dustbins, carry a bag for waste, participate in cleanliness drives, and report illegal dumping.",
    category: "Environmental",
    emoji: "🗑️",
    importance: "High",
  },
  {
    id: 4,
    title: "Follow Traffic Rules",
    description: "Drive safely and respect road regulations",
    why: "Traffic rules save lives, prevent accidents, and ensure smooth flow of vehicles for everyone.",
    howTo: "Wear helmets/seatbelts, follow speed limits, don't drink and drive, use signals, and respect pedestrians.",
    category: "Legal",
    emoji: "🚦",
    importance: "Essential",
  },
  {
    id: 5,
    title: "Conserve Water",
    description: "Use water responsibly and avoid wastage",
    why: "Water is a precious resource. Conservation ensures availability for future generations.",
    howTo: "Fix leaks, turn off taps when not in use, use water-saving devices, and harvest rainwater.",
    category: "Environmental",
    emoji: "💧",
    importance: "High",
  },
  {
    id: 6,
    title: "Respect Others' Rights",
    description: "Treat everyone with dignity regardless of background",
    why: "A harmonious society is built on mutual respect, equality, and understanding.",
    howTo: "Avoid discrimination, speak up against injustice, listen to diverse perspectives, and practice empathy.",
    category: "Social",
    emoji: "🤝",
    importance: "Essential",
  },
  {
    id: 7,
    title: "Help Your Community",
    description: "Volunteer and contribute to local welfare",
    why: "Strong communities support each other. Your help can make a real difference in someone's life.",
    howTo: "Join local NGOs, help neighbors in need, donate to causes, mentor students, or organize community events.",
    category: "Community",
    emoji: "❤️",
    importance: "High",
  },
  {
    id: 8,
    title: "Save Energy",
    description: "Reduce electricity consumption and use renewable sources",
    why: "Energy conservation reduces pollution, saves money, and protects the environment.",
    howTo: "Switch off lights when not needed, use LED bulbs, unplug devices, and use public transport.",
    category: "Environmental",
    emoji: "⚡",
    importance: "High",
  },
  {
    id: 9,
    title: "Report Corruption",
    description: "Stand against bribery and corrupt practices",
    why: "Corruption weakens society and denies honest people their rights and opportunities.",
    howTo: "Use anti-corruption helplines, file complaints with authorities, refuse to pay bribes, and support transparency.",
    category: "Legal",
    emoji: "🚫",
    importance: "Essential",
  },
  {
    id: 10,
    title: "Protect Public Property",
    description: "Don't damage government or community assets",
    why: "Public property belongs to everyone. Damage costs taxpayer money and harms community resources.",
    howTo: "Use facilities carefully, report vandalism, discourage others from damaging property.",
    category: "Community",
    emoji: "🏛️",
    importance: "High",
  },
  {
    id: 11,
    title: "Educate Yourself",
    description: "Stay informed about current affairs and civic issues",
    why: "An informed citizen makes better decisions and can participate meaningfully in democracy.",
    howTo: "Read news from reliable sources, attend community meetings, learn about laws and rights.",
    category: "Social",
    emoji: "📚",
    importance: "High",
  },
  {
    id: 12,
    title: "Queue Properly",
    description: "Wait your turn in lines without pushing or cutting",
    why: "Queuing shows respect for others' time and maintains order in public spaces.",
    howTo: "Stand in line, wait patiently, don't push, and respect the order of arrival.",
    category: "Social",
    emoji: "👥",
    importance: "Medium",
  },
  {
    id: 13,
    title: "Reduce, Reuse, Recycle",
    description: "Minimize waste and recycle materials",
    why: "Waste reduction protects the environment and conserves natural resources.",
    howTo: "Avoid single-use plastics, segregate waste, donate old items, compost organic waste.",
    category: "Environmental",
    emoji: "♻️",
    importance: "High",
  },
  {
    id: 14,
    title: "Be Punctual",
    description: "Respect others' time by being on time",
    why: "Punctuality shows professionalism and respect for commitments.",
    howTo: "Plan ahead, set reminders, leave early to account for delays.",
    category: "Social",
    emoji: "⏰",
    importance: "Medium",
  },
  {
    id: 15,
    title: "Support Local Businesses",
    description: "Buy from local shops and artisans",
    why: "Supporting local economy creates jobs and strengthens your community.",
    howTo: "Shop at local markets, hire local services, promote local products.",
    category: "Community",
    emoji: "🏪",
    importance: "Medium",
  },
  {
    id: 16,
    title: "Plant Trees",
    description: "Contribute to green cover and fight pollution",
    why: "Trees provide oxygen, reduce pollution, and combat climate change.",
    howTo: "Join tree plantation drives, plant in your garden, adopt and care for saplings.",
    category: "Environmental",
    emoji: "🌳",
    importance: "High",
  },
  {
    id: 17,
    title: "Respect Women",
    description: "Ensure safety and dignity for women in all spaces",
    why: "Gender equality and women's safety are fundamental to a progressive society.",
    howTo: "Challenge harassment, create safe spaces, support women's rights, and educate others.",
    category: "Social",
    emoji: "👩",
    importance: "Essential",
  },
  {
    id: 18,
    title: "Care for the Elderly",
    description: "Show respect and provide support to senior citizens",
    why: "Elders have contributed to society and deserve care and respect in their later years.",
    howTo: "Help them in public spaces, spend time with elderly relatives, volunteer at old-age homes.",
    category: "Social",
    emoji: "👴",
    importance: "High",
  },
  {
    id: 19,
    title: "Avoid Noise Pollution",
    description: "Keep noise levels reasonable in public and residential areas",
    why: "Excessive noise causes stress, health problems, and disturbs peace.",
    howTo: "Don't honk unnecessarily, use headphones, keep music volume low, respect quiet hours.",
    category: "Environmental",
    emoji: "🔇",
    importance: "Medium",
  },
  {
    id: 20,
    title: "Practice Road Courtesy",
    description: "Be patient and courteous to other road users",
    why: "Road rage and aggression cause accidents and create hostile environments.",
    howTo: "Let pedestrians cross, give way to emergency vehicles, don't block intersections, use indicators.",
    category: "Social",
    emoji: "🚗",
    importance: "High",
  },
];

const categoryColors = {
  "Environmental": "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300",
  "Social": "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
  "Legal": "bg-violet-50 dark:bg-violet-950 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300",
  "Community": "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300",
};

const importanceColors = {
  "Essential": "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  "High": "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  "Medium": "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
};

export default function CivicDutiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const [expandedDuty, setExpandedDuty] = useState<number | null>(null);

  const filteredDuties = useMemo(() => {
    return civicDutiesData.filter((duty) => {
      const matchesSearch = `${duty.title} ${duty.description} ${duty.why} ${duty.howTo}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || duty.category === selectedCategory;
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
            <Users size={16} />
            <span>Be a Responsible Citizen</span>
          </div>
          
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
            Your Civic Duties
          </h1>
          <p className="text-xl text-green-50 max-w-2xl mx-auto font-medium">
            Small actions, big impact. Learn how you can contribute to society.
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
              placeholder="Search civic duties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-green-500 dark:focus:border-green-400 transition-colors text-base font-medium"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-3">
            {(["All", "Environmental", "Social", "Legal", "Community"] as const).map((category) => (
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
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-2 border-green-200 dark:border-green-800 rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-green-600 dark:text-green-400 mb-1">
              {civicDutiesData.length}
            </div>
            <div className="text-sm font-bold text-gray-600 dark:text-gray-400">Total Duties</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">
              {filteredDuties.filter(d => d.importance === "Essential").length}
            </div>
            <div className="text-sm font-bold text-gray-600 dark:text-gray-400">Essential</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-6 text-center">
            <div className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-1">
              {filteredDuties.length}
            </div>
            <div className="text-sm font-bold text-gray-600 dark:text-gray-400">Showing</div>
          </div>
        </div>

        {/* Duties Cards Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredDuties.map((duty, index) => (
            <div
              key={duty.id}
              className="group bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:border-green-300 dark:hover:border-green-600 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 transform hover:-translate-y-1"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.05}s both`
              }}
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-2">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 ${categoryColors[duty.category]}`}>
                      {duty.category}
                    </span>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 ${importanceColors[duty.importance]}`}>
                      {duty.importance}
                    </span>
                  </div>
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {duty.emoji}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {duty.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-4">
                  {duty.description}
                </p>

                {/* Expandable Section */}
                {expandedDuty === duty.id && (
                  <div className="space-y-4 pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="text-green-600 dark:text-green-400" size={18} />
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">Why it matters</h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {duty.why}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="text-green-600 dark:text-green-400" size={18} />
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">How to do it</h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {duty.howTo}
                      </p>
                    </div>
                  </div>
                )}

                {/* Learn More Button */}
                <button
                  onClick={() => setExpandedDuty(expandedDuty === duty.id ? null : duty.id)}
                  className="mt-4 w-full px-4 py-2.5 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900 rounded-xl font-bold text-sm transition-colors"
                >
                  {expandedDuty === duty.id ? "Show Less" : "Learn More"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDuties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No duties found</h3>
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