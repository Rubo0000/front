import React from "react";
import "../styles/FormStyles.css";


const SettingsForm = ({ userInputs, setUserInputs, onSave }) => {
  const handleChange = (e, key) => {
    const { value } = e.target;

    setUserInputs((prev) => ({
      ...prev,
      setting: {
        ...prev.setting,
        [key]: value,
      },
    }));
  };

  return (
    <div className="settings-form">
      <label>
        Genre:
        <input
          type="text"
          placeholder="Fantasy, Sci-Fi"
          value={userInputs.setting.genre}
          onChange={(e) => handleChange(e, "genre")}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          placeholder="Forest, City"
          value={userInputs.setting.location}
          onChange={(e) => handleChange(e, "location")}
        />
      </label>
      <label>
        Tone:
        <input
          type="text"
          placeholder="Heroic, Dark"
          value={userInputs.setting.tone}
          onChange={(e) => handleChange(e, "tone")}
        />
      </label>
      <button className="save-button" onClick={onSave}>
        SAVE
      </button>
    </div>
  );
};

export default SettingsForm;
