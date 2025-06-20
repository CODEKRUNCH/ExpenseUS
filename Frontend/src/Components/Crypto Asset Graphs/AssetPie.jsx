import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Development', value: 28 },
  { name: 'Design', value: 20 },
  { name: 'Operations', value: 12 },
];

const COLORS = ['#7c40ff', '#6d2aff', '#9b6dff'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-purple-500 p-3 rounded-lg shadow-lg">
        <p className="text-white font-semibold">{payload[0].name}</p>
        <p className="text-white">Value: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function PurplePieChart() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  return (
    <ResponsiveContainer width="60%" height={180}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={70}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
          animationDuration={800}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]}
              stroke={activeIndex === index ? "#4C1D95" : "transparent"}
              strokeWidth={activeIndex === index ? 2 : 0}
              style={{
                filter: activeIndex === index ? 'brightness(1.1)' : 'brightness(1)',
                cursor: 'pointer'
              }}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}