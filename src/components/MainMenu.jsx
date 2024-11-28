import React, { useState } from "react";
import "../styles/MainMenu.css";
import MainCharacterForm from "./MainCharacterForm";
import SideCharacterForm from "./SideCharacterForm";
import SettingsForm from "./SettingsForm";
import PlotForm from "./PlotForm";

const MainMenu = ({ userInputs, setUserInputs }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const handleSelect = (menu) => {
    setExpandedMenu(menu);
  };

  const handleSave = () => {
    setExpandedMenu(null);
  };

  return (
    <div className="main-menu">
      {expandedMenu ? (
        <div className="expanded-menu">
          <div className="form-container">
            {expandedMenu === "Main Character" && (
              <MainCharacterForm
                userInputs={userInputs}
                setUserInputs={setUserInputs}
                onSave={handleSave}
              />
            )}
            {expandedMenu === "Side Character" && (
              <SideCharacterForm
                userInputs={userInputs}
                setUserInputs={setUserInputs}
                onSave={handleSave}
              />
            )}
            {expandedMenu === "Settings" && (
              <SettingsForm
                userInputs={userInputs}
                setUserInputs={setUserInputs}
                onSave={handleSave}
              />
            )}
            {expandedMenu === "Plot" && (
              <PlotForm
                userInputs={userInputs}
                setUserInputs={setUserInputs}
                onSave={handleSave}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="option-buttons">
          <button
            className="menu-button"
            onClick={() => handleSelect("Main Character")}
          >
            Main Character
          </button>
          <button
            className="menu-button"
            onClick={() => handleSelect("Side Character")}
          >
            Side Character
          </button>
          <button
            className="menu-button"
            onClick={() => handleSelect("Settings")}
          >
            Settings
          </button>
          <button className="menu-button" onClick={() => handleSelect("Plot")}>
            Plot
          </button>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
