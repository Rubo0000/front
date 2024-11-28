import React, { useState } from "react";
import MainMenu from "./components/MainMenu";
import GenerateStory from "./components/GenerateStory";
import Navbar from "./components/Navbar";

const App = () => {
  const [userInputs, setUserInputs] = useState({
    mainCharacter: {
      name: "",
      age: "",
      race: "",
      sex: "",
      personalityTraits: [],
      weapon: "",
      skills: [],
      motivation: "",
    },
    sideCharacter: {
      name: "",
      age: "",
      race: "",
      sex: "",
      personalityTraits: [],
      weapon: "",
      skills: [],
      motivation: "",
    },
    setting: {
      genre: "",
      location: "",
      tone: "",
    },
    plot: {
      storyGoal: "",
      finalEnemy: "",
      numberOfChapters: 1,
      style: "",
    },
  });

  return (
    <div>
      <Navbar />
      <MainMenu userInputs={userInputs} setUserInputs={setUserInputs} />
      <GenerateStory userInputs={userInputs} />
    </div>
  );
};

export default App;
