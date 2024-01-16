// PauseResumeButton.tsx
import React, { useContext } from "react";
import { useAppContext } from "../context/AppContext";

const PauseResumeButton: React.FC = () => {
  const { togglePause, isPaused } = useAppContext();

  return (
    <div style={{alignSelf:'center'}}>
      <button onClick={togglePause}>{isPaused ? "Resume " : "Pause Log"}</button>
    </div>
  );
};

export default PauseResumeButton;
