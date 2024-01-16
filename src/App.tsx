// App.tsx
import React from "react";
import Summary from "./components/Summary";
import Log from "./components/Log";

const App: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <Log />
      <Summary />
    </div>
  );
};

export default App;
