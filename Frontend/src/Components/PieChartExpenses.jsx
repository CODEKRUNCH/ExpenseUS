import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer,Tooltip } from 'recharts';

const data = [
  { name: 'Rent', value: 500 },
  { name: 'Utilities', value: 300 },
  { name: 'Groceries', value: 200 },
  { name: 'Transport', value: 150 },
  { name: 'Leisure', value: 120 },
  { name: 'Savings', value: 230 },
];

const COLORS = ['#0088FE', '#00C49F', '#A33AFF', '#FFBB28', '#FF8042', '#8884d8'];

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartExpense = () => {
  return (
    <div className='bg-[#0B1739] p-4 rounded-xl '>
    <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-gray-300 text-sm font-medium">Expenses By Category</h2>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">$125.2k</p>
              <span className="text-green-400 text-sm bg-gray-700 px-2 py-1 rounded">
                +12.5%
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm">June 21, 2023</p>
        </div>

    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70} // 👈 Makes it a donut chart
            outerRadius={150}
            labelLine={false}
            label={renderCustomLabel}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
                                   formatter={(value, name) => [`$${value}K`, name]}
                                   labelFormatter={(label) => `Month: ${label}`}
                                   contentStyle={{
                                     backgroundColor: '#1f2937',
                                     borderColor: '#4b5563',
                                     borderRadius: '0.50rem',
                                   }}
                                   itemStyle={{
                                    color:'white'
                                   }}
                                 />
        </PieChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
};

export default PieChartExpense;
