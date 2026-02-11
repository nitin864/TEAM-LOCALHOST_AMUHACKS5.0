"use client";

import React, { useState, useMemo } from "react";

type Category = "Fundamental Right" | "Legal Right" | "Civil Right";
interface Right {
  id: number;
  title: string;
  originalText: string;
  simplified: string;
  category: Category;
}
const rightsData: Right[] = [
  {
    id: 1,
    title: "Right to Equality (Article 14)",
    originalText:
      "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
    simplified: "Everyone is equal before the law. No one gets special treatment.",
    category: "Fundamental Right",
  },
  {
    id: 2,
    title: "Prohibition of Discrimination (Article 15)",
    originalText:
      "The State shall not discriminate against any citizen on grounds of religion, race, caste, sex, or place of birth.",
    simplified:
      "You cannot be treated unfairly because of your religion, caste, gender, or birthplace.",
    category: "Fundamental Right",
  },
  {
    id: 3,
    title: "Equality of Opportunity (Article 16)",
    originalText:
      "There shall be equality of opportunity for all citizens in matters relating to employment under the State.",
    simplified: "Everyone has an equal chance for government jobs.",
    category: "Fundamental Right",
  },
  {
    id: 4,
    title: "Abolition of Untouchability (Article 17)",
    originalText: "Untouchability is abolished and its practice in any form is forbidden.",
    simplified: "Untouchability is illegal and punishable by law.",
    category: "Fundamental Right",
  },
  {
    id: 5,
    title: "Abolition of Titles (Article 18)",
    originalText:
      "No title, not being a military or academic distinction, shall be conferred by the State.",
    simplified:
      "The government cannot give special titles that create inequality.",
    category: "Fundamental Right",
  },
  {
    id: 6,
    title: "Freedom of Speech & Expression (Article 19)",
    originalText:
      "All citizens shall have the right to freedom of speech and expression.",
    simplified:
      "You can speak your mind freely (within reasonable limits).",
    category: "Fundamental Right",
  },
  {
    id: 7,
    title: "Freedom of Assembly (Article 19)",
    originalText:
      "All citizens shall have the right to assemble peaceably and without arms.",
    simplified:
      "You can hold peaceful protests and gatherings.",
    category: "Fundamental Right",
  },
  {
    id: 8,
    title: "Freedom of Association (Article 19)",
    originalText:
      "All citizens shall have the right to form associations or unions.",
    simplified:
      "You can form groups, unions, and organizations.",
    category: "Fundamental Right",
  },
  {
    id: 9,
    title: "Freedom of Movement (Article 19)",
    originalText:
      "All citizens shall have the right to move freely throughout the territory of India.",
    simplified:
      "You can travel anywhere in India.",
    category: "Fundamental Right",
  },
  {
    id: 10,
    title: "Freedom to Reside Anywhere (Article 19)",
    originalText:
      "All citizens shall have the right to reside and settle in any part of the territory of India.",
    simplified:
      "You can live anywhere in India.",
    category: "Fundamental Right",
  },
  {
    id: 11,
    title: "Freedom of Profession (Article 19)",
    originalText:
      "All citizens shall have the right to practice any profession or carry on any occupation, trade or business.",
    simplified:
      "You can choose any career or business.",
    category: "Fundamental Right",
  },
  {
    id: 12,
    title: "Protection in Respect of Conviction (Article 20)",
    originalText:
      "No person shall be convicted of any offence except for violation of a law in force at the time.",
    simplified:
      "You can’t be punished for something that wasn’t illegal when you did it.",
    category: "Fundamental Right",
  },
  {
    id: 13,
    title: "Right to Life & Personal Liberty (Article 21)",
    originalText:
      "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
    simplified:
      "You have the right to live with dignity and freedom.",
    category: "Fundamental Right",
  },
  {
    id: 14,
    title: "Right to Education (Article 21A)",
    originalText:
      "The State shall provide free and compulsory education to all children of the age of six to fourteen years.",
    simplified:
      "Every child between 6–14 years has the right to free education.",
    category: "Fundamental Right",
  },
  {
    id: 15,
    title: "Protection Against Arrest (Article 22)",
    originalText:
      "No person who is arrested shall be detained without being informed of the grounds for such arrest.",
    simplified:
      "If arrested, you must be told why and have access to a lawyer.",
    category: "Legal Right",
  },

];

export default function ConstitutionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSimplified, setShowSimplified] = useState(true);

  const filteredRights = useMemo(() => {
    return rightsData.filter((right) =>
      `${right.title} ${right.originalText} ${right.category}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="const-container">
      <h1 className="const-title">⚖️ Indian Constitution – Rights & Freedoms</h1>

      <div className="const-controls">
        <input
          type="text"
          placeholder="Search rights..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="const-input"
        />

        <button
          onClick={() => setShowSimplified(!showSimplified)}
          className="toggle-btn"
        >
          {showSimplified ? "Show Legal Text" : "Show Simple Meaning"}
        </button>
      </div>

      <div className="rights-list">
        {filteredRights.map((right) => (
          <div key={right.id} className="right-card">
            <span className="category-tag">{right.category}</span>
            <h3>{right.title}</h3>
            <p>
              {showSimplified ? right.simplified : right.originalText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
