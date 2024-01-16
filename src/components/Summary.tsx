// Summary.tsx
import React from 'react';
import { useAppContext } from '../context/AppContext';
import SummaryTable from './SummaryTable';

const Summary: React.FC = () => {
  const { summaries } = useAppContext();
  return (
    <div  style={{flex:1.4, marginLeft: 16}}>
      <h2>Summary</h2>
      <div style={{ border: "1px solid", padding: 4 }}>
        <SummaryTable summaries={summaries}/>
      </div>
    </div>
  );
};

export default Summary;
