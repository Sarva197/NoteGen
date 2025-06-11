import React, { useState, useEffect } from "react";

function ShowUses() {
  const [textIndex, setTextIndex] = useState(0);

  const usesArray = [
    "Think of NoteGen as your go-to space for organizing research notes, project ideas, and important references—all in one place. No more scattered information across different apps!",
    "Whether you're preparing for exams or making lecture notes, NoteGen helps you structure your study materials efficiently, so you can revise without the last-minute hassle.",
    "Use AI-generated content to quickly summarize, expand, or rephrase your notes. Save time and boost productivity with just a click!",
    "Work on shared notes with classmates or colleagues, add comments, and keep everything synchronized across your devices.",
    "With subject-based sections and smart search, finding old notes is a breeze. No more scrolling endlessly—just search and get what you need!",
    "Easily compile all your notes into a well-formatted PDF for offline access, printing, or sharing with your team.",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % usesArray.length);
    }, 5000); // Change text every 5 seconds

    return () => clearInterval(timer); // Cleanup to prevent memory leaks
  }, []);

  return (
    <div className="container mt-5 p-5" style={{ minHeight: "60vh" }}>
      <div className="row p-5 offset-1">
        <h1 
          style={{ lineHeight: "1.5" }} 
          aria-live="polite" 
          aria-atomic="true"
        >
          {usesArray[textIndex]}
        </h1>
      </div>
    </div>
  );
}

export default ShowUses;
