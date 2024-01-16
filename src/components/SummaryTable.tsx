import React from 'react';
import { StockSummary, useAppContext } from '../context/AppContext';

interface SummaryTableProps {
  summaries: StockSummary[];
}

const SummaryTable: React.FC<SummaryTableProps> = ({ summaries }) => {

  return (
    <table>
      <thead>
        <tr>
          <th>Stock</th>
          <th>Starting</th>
          <th>Lowest</th>
          <th>Highest</th>
          <th>Current</th>
        </tr>
      </thead>
      <tbody>
        {summaries.map((summary) => (
          <tr key={summary.code}>
            <td>{summary.code}</td>
            <td>{summary.currentPrice}</td>
            <td>{summary.lowestPrice}</td>
            <td>{summary.highestPrice}</td>
            <td>{summary.startingPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SummaryTable;
