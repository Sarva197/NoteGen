import React from "react";
import Hero from "./Hero";
import Pros from "./Pros";
import ShowUses from "./ShowUses";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Action from "../Action";

function HomePage() {
  return (
    <>
      <Hero />
      <Pros />
      <ShowUses />
      <RightSection
        imgUrl="images/yourNotes.jpg"
        prodDesc="From study materials to project documentation, NoteGen makes note-taking seamless. Generate AI-powered summaries, structure your topics, and download everything as a well-organized PDF—all in one place."
        productName="Smart notes for a smarter you"
        tryDemo=""
        tryName="Learn more"
      />
      <LeftSection
        imgUrl="images/smartYou.jpg"
        Desc="With NoteGen, capturing ideas goes beyond just text. Save research, AI-generated insights, and structured notes effortlessly. Organize your thoughts, create summaries, and never lose track of important information again."
        title="Your knowledge, your notes, your way"
        tryName="Learn More"
      />
      <RightSection
        imgUrl="images/Noteswork.jpg"
        prodDesc="Turn scattered information into structured notes with NoteGen. Store your ideas, compile research, and retrieve them instantly. Whether it's coursework, meeting minutes, or brainstorming sessions, NoteGen keeps it all together."
        productName="Simplify, organize, and never forget"
        tryDemo=""
        tryName="Learn more"
      />
      <LeftSection
        imgUrl="images/note-taking.png"
        Desc="Capture, edit, and organize with ease. NoteGen helps you store and refine notes using AI assistance. With smart search, categorized sections, and easy export options, your notes are always just a click away."
        title="Notes that work for you"
        tryName="Learn More"
      />
      <Action/>
    </>
  );
}

export default HomePage;
