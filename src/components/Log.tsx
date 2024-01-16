// Log.tsx
import React, { useEffect } from "react";
import { Stock, useAppContext } from "../context/AppContext";
import PauseResumeButton from "./PauseResumeButton";

const Log: React.FC = () => {
  const { log, updateLog, isPaused } = useAppContext();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        updateLog(); // Fetch and update log
      }
    }, 2000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [updateLog, isPaused]);

  const renderStocks = (stocks: Stock[]) => {
    return (
      <div>
        {stocks.map((stock, index) => (
          <div key={index}>
            {stock.code}: {stock.price}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{flex:1, marginLeft: 16}}>
      <div
        style={{
          display: "flex",
        }}
      >
        <h2 style={{ flex: 1 }}>Log</h2>
        <PauseResumeButton />
      </div>
      <div style={{ border: "1px solid", padding: 4 }} >
        {log.map((item, index) => {
          return (
            <div key={index}>
              <div style={{marginTop: 16}}>Updates for {item.date}</div>
              {renderStocks(item.stocks)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Log;
