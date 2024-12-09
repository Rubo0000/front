import React from "react";

const PlotForm = ({ userInputs, setUserInputs, onSave }) => {
  const handleChange = (e, key) => {
    const { value } = e.target;

    setUserInputs((prev) => ({
      ...prev,
      plot: {
        ...prev.plot,
        [key]: value,
      },
    }));
  };

  return (
    <div className="settings-form">
      <label>
        Story Goal:
        <input
          type="text"
          placeholder="Defeat the Demon King"
          value={userInputs.plot.storyGoal}
          onChange={(e) => handleChange(e, "storyGoal")}
        />
      </label>
      <label>
        Final Enemy:
        <input
          type="text"
          placeholder="Dragon, Evil Wizard"
          value={userInputs.plot.finalEnemy}
          onChange={(e) => handleChange(e, "finalEnemy")}
        />
      </label>
      <label>
        Number of Chapters:
        <input
          type="number"
          min="2"
          value={userInputs.plot.numberOfChapters}
          onChange={(e) => handleChange(e, "numberOfChapters")}
        />
      </label>
      <label>
        Style:
        <input
          type="text"
          placeholder="Epic, Immersive"
          value={userInputs.plot.style}
          onChange={(e) => handleChange(e, "style")}
        />
      </label>
      <button className="save-button" onClick={onSave}>
        SAVE
      </button>
    </div>
  );
};

export default PlotForm;
