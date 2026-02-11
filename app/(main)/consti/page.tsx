"use client";

import React, { useState, useMemo } from "react";
import './consti.css'
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
  {
    id: 16,
    title: "Right to Information (RTI Act)",
    originalText:
      "Citizens have the right to request information from public authorities.",
    simplified:
      "You can ask the government for information and they must reply.",
    category: "Civil Right",
  },
  {
    id: 17,
    title: "Right to Vote",
    originalText:
      "Every citizen above 18 years has the right to vote in elections.",
    simplified:
      "You can choose your leaders after turning 18.",
    category: "Civil Right",
  },
  {
    id: 18,
    title: "Right to Privacy",
    originalText:
      "The Right to Privacy is protected as part of Article 21 by the Supreme Court.",
    simplified:
      "Your personal data and life are private.",
    category: "Fundamental Right",
  },
  {
    id: 19,
    title: "Consumer Protection Right",
    originalText:
      "Consumers have the right to safety, information, and redressal under the Consumer Protection Act.",
    simplified:
      "You can complain if you are cheated by a seller.",
    category: "Legal Right",
  },
  {
    id: 20,
    title: "Right Against Exploitation (Article 23)",
    originalText:
      "Traffic in human beings and forced labour are prohibited.",
    simplified:
      "No one can force you to work without pay.",
    category: "Fundamental Right",
  },
  {
    id: 21,
    title: "Child Labour Prohibition (Article 24)",
    originalText:
      "No child below the age of fourteen shall be employed in hazardous work.",
    simplified:
      "Children cannot be made to work in dangerous jobs.",
    category: "Fundamental Right",
  },
  {
    id: 22,
    title: "Freedom of Religion (Article 25)",
    originalText:
      "All persons are equally entitled to freedom of conscience and religion.",
    simplified:
      "You can follow any religion you like.",
    category: "Fundamental Right",
  },
  {
    id: 23,
    title: "Cultural & Educational Rights (Article 29)",
    originalText:
      "Any section of citizens with a distinct culture has the right to preserve it.",
    simplified:
      "You can protect your language and culture.",
    category: "Fundamental Right",
  },
  {
    id: 24,
    title: "Right to Constitutional Remedies (Article 32)",
    originalText:
      "The right to move the Supreme Court for enforcement of fundamental rights.",
    simplified:
      "You can go directly to court if your rights are violated.",
    category: "Fundamental Right",
  },
  {
    id: 25,
    title: "Right to Legal Aid",
    originalText:
      "Free legal aid is provided to ensure justice is not denied due to financial constraints.",
    simplified:
      "If you can’t afford a lawyer, the government provides one.",
    category: "Legal Right",
  },
  {
    id: 26,
    title: "Right to Clean Environment",
    originalText:
      "Recognized under Article 21 as part of the right to life.",
    simplified:
      "You have the right to live in a clean and healthy environment.",
    category: "Fundamental Right",
  },
  {
    id: 27,
    title: "Right to Shelter",
    originalText:
      "Recognized by courts as part of the right to life under Article 21.",
    simplified:
      "Everyone deserves a basic place to live.",
    category: "Fundamental Right",
  },
  {
    id: 28,
    title: "Right to Health",
    originalText:
      "Health is recognized as essential under Article 21 by judiciary interpretation.",
    simplified:
      "You have the right to access basic healthcare.",
    category: "Fundamental Right",
  },
  {
    id: 29,
    title: "Right to Public Hearing",
    originalText:
      "Citizens can participate in public hearings regarding policies and development.",
    simplified:
      "You can raise your voice in public decision-making.",
    category: "Civil Right",
  },
  {
    id: 30,
    title: "Right to File FIR",
    originalText:
      "Any person can file an FIR at a police station for a cognizable offence.",
    simplified:
      "You can report a crime to the police and they must register it.",
    category: "Legal Right",
  }
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
