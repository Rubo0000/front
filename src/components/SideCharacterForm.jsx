import React from "react";

const SideCharacterForm = ({ userInputs, setUserInputs, onSave }) => {
  const handleChange = (e, key) => {
    const { value } = e.target;

    setUserInputs((prev) => ({
      ...prev,
      sideCharacter: {
        ...prev.sideCharacter,
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
          placeholder="Lyara"
          value={userInputs.sideCharacter.name}
          onChange={(e) => handleChange(e, "name")}
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          placeholder="22"
          value={userInputs.sideCharacter.age}
          onChange={(e) => handleChange(e, "age")}
        />
      </label>
      <label>
        Race:
        <input
          type="text"
          placeholder="Half-Elf, Human"
          value={userInputs.sideCharacter.race}
          onChange={(e) => handleChange(e, "race")}
        />
      </label>
      <label>
        Sex:
        <input
          type="text"
          placeholder="Male, Female"
          value={userInputs.sideCharacter.sex}
          onChange={(e) => handleChange(e, "sex")}
        />
      </label>
      <label>
        Weapon:
        <input
          type="text"
          placeholder="Dagger, Bow"
          value={userInputs.sideCharacter.weapon}
          onChange={(e) => handleChange(e, "weapon")}
        />
      </label>
      <label>
        Skills (comma-separated):
        <input
          type="text"
          placeholder="Healing, Lightning Magic"
          value={userInputs.sideCharacter.skills.join(", ")}
          onChange={(e) => handleChange(e, "skills")}
        />
      </label>
      <label>
        Personality Traits (comma-separated):
        <input
          type="text"
          placeholder="Clever, Loyal"
          value={userInputs.sideCharacter.personalityTraits.join(", ")}
          onChange={(e) => handleChange(e, "personalityTraits")}
        />
      </label>
      <label>
        Motivation:
        <textarea
          placeholder="To discover her origins"
          value={userInputs.sideCharacter.motivation}
          onChange={(e) => handleChange(e, "motivation")}
        />
      </label>
      <button className="save-button" onClick={onSave}>
        SAVE
      </button>
    </div>
  );
};

export default SideCharacterForm;
