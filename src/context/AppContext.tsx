// AppContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import moment from 'moment';

export interface Stock {
  code: string;
  price: number;
}

export interface StockEntries {
    date: string;
    stocks: Stock[];
}
export interface StockSummary {
  code: string;
  startingPrice: number;
  lowestPrice: number;
  highestPrice: number;
  currentPrice: number;
}

const computeSummary = (stockEntries: StockEntries[]): StockSummary[] => {
  const summaryMap: { [code: string]: StockSummary } = {};

  for (const entry of stockEntries) {
    for (const stock of entry.stocks) {
      if (!(stock.code in summaryMap)) {
        // Initialize summary for the stock code if not present
        summaryMap[stock.code] = {
          code: stock.code,
          startingPrice: stock.price,
          lowestPrice: stock.price,
          highestPrice: stock.price,
          currentPrice: stock.price,
        };
      } else {
        // Update summary for the stock code
        const summary = summaryMap[stock.code];
        summary.lowestPrice = Math.min(summary.lowestPrice, stock.price);
        summary.highestPrice = Math.max(summary.highestPrice, stock.price);
        summary.currentPrice = stock.price;
      }
    }
  }

  // Convert the summaryMap values to an array
  const summaries = Object.values(summaryMap);
  return summaries;
};

interface AppContextProps {
  log: StockEntries[];
  updateLog: () => void;
  isPaused: boolean;
  summaries: StockSummary[]; // New summaries state
  togglePause: () => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

interface MyComponentProps {
    children?: React.ReactNode; // Explicitly typing children prop
  }

export const AppProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [log, setLog] = useState<StockEntries[]>([]);
  const [summaries, setSummaries] = useState<StockSummary[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Update summaries whenever the log changes
    setSummaries(computeSummary(log));
  }, [log]);

  const updateLog = async () => {
    // Implement fetching data from the API and updating the log state
    try {
    const response = await fetch('https://join.reckon.com/stock-pricing');
    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data:Stock[] = await response.json();
    const dateNow = moment().format('YYYY-MM-DD hh:mm:ss')
    const newLog: StockEntries = {date: dateNow, stocks: data}

    // Update the log with the fetched data
    if (!isPaused) {
      setLog([newLog, ...log]);
    }

    // Update summaries whenever the log changes
    setSummaries(computeSummary([newLog, ...log]));
    
    } catch (error) {
    console.error('Error fetching data:', error);
    }
  };

  const togglePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  const value: AppContextProps = {
    log,
    updateLog,
    isPaused,
    summaries,
    togglePause
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
  };