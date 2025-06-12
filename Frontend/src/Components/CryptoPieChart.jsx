import React from 'react';
import { PieChart } from 'recharts';

const PieChartComponent = ({ name, percent }) => {
  const circleStyle = {
    background: `conic-gradient(#00ff66 ${percent}%, #333 ${percent}% 100%)`,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px'
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#1c1c1e',
    padding: '15px 20px',
    borderRadius: '8px',
    margin: '10px 0',
    width: '280px',
    color: '#fff'
  };

  return (
    <div style={containerStyle}>
      <div style={circleStyle}></div>
      <div style={{ flex: 1 }}>{name}</div>
      <div style={{ fontWeight: 'bold' }}>{percent}%</div>
    </div>
  );
};

export default PieChartComponent;
