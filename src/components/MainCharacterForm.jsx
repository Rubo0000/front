import React from "react";

const MainCharacterForm = ({ userInputs, setUserInputs, onSave }) => {
  const handleChange = (e, key) => {
    const { value } = e.target;

    setUserInputs((prev) => ({
      ...prev,
      mainCharacter: {
        ...prev.mainCharacter,
        [key]:
          key === "skills" || key === "personalityTraits"
            ? value.split(",").map((item) => item.trim())
            : value,
      },
    }));
  };

  return (
    <div className="settings-form">
      <label>
        Name:
        <input
          type="text"
          placeholder="Eldarion"
          value={userInputs.mainCharacter.name}
          onChange={(e) => handleChange(e, "name")}
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          placeholder="24"
          value={userInputs.mainCharacter.age}
          onChange={(e) => handleChange(e, "age")}
        />
      </label>
      <label>
        Race:
        <input
          type="text"
          placeholder="Elf, Human"
          value={userInputs.mainCharacter.race}
          onChange={(e) => handleChange(e, "race")}
        />
      </label>
      <label>
        Sex:
        <input
          type="text"
          placeholder="Male, Female"
          value={userInputs.mainCharacter.sex}
          onChange={(e) => handleChange(e, "sex")}
        />
      </label>
      <label>
        Weapon:
        <input
          type="text"
          placeholder="Sword, Bow"
          value={userInputs.mainCharacter.weapon}
          onChange={(e) => handleChange(e, "weapon")}
        />
      </label>
      <label>
        Skills (comma-separated):
        <input
          type="text"
          placeholder="Tracking, Magic"
          value={userInputs.mainCharacter.skills.join(", ")}
          onChange={(e) => handleChange(e, "skills")}
        />
      </label>
      <label>
        Personality Traits (comma-separated):
        <input
          type="text"
          placeholder="Brave, Loyal"
          value={userInputs.mainCharacter.personalityTraits.join(", ")}
          onChange={(e) => handleChange(e, "personalityTraits")}
        />
      </label>
      <label>
        Motivation:
        <textarea
          placeholder="To save the village"
          value={userInputs.mainCharacter.motivation}
          onChange={(e) => handleChange(e, "motivation")}
        />
      </label>
      <button className="save-button" onClick={onSave}>
        SAVE
      </button>
    </div>
  );
};

export default MainCharacterForm;
