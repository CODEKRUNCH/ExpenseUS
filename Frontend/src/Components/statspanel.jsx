import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', income: 5000, expense: 3200 },
  { name: 'Feb', income: 5200, expense: 2800 },
  { name: 'Mar', income: 5100, expense: 3500 },
  { name: 'Apr', income: 5300, expense: 3000 },
  { name: 'May', income: 5500, expense: 4000 },
  { name: 'Jun', income: 5600, expense: 3700 },
  { name: 'Jul', income: 5800, expense: 3900 },
  { name: 'Aug', income: 6000, expense: 3600 },
  { name: 'Sep', income: 5900, expense: 3400 },
  { name: 'Oct', income: 5700, expense: 3100 },
  { name: 'Nov', income: 5800, expense: 3300 },
  { name: 'Dec', income: 6000, expense: 4200 },
];
const totalIncome = data.reduce((sum, d) => sum + d.income, 0);
const totalExpense = data.reduce((sum, d) => sum + d.expense, 0);
const netSavings = totalIncome - totalExpense;
const growth = ((data[11].income - data[10].income) / data[10].income) * 100;

export default class Barchartexpvsinc extends PureComponent {

  render() {
    return (
        <div className=' bg-[#0B1739] p-4 rounded-xl'>
         
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-gray-300 text-sm font-medium">Income vs Expenses</h2>
                <div className="flex items-end gap-2">
                <p className="text-2xl font-bold">${(netSavings / 1000).toFixed(1)}k</p>
                <span className={`text-sm bg-gray-700 px-2 py-1 rounded ${growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                </span>
                </div>
            </div>
            </div>
        <div className='h-[300px]'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
        
          <XAxis dataKey="name" />
         
           <Tooltip 
                         formatter={(value, name) => [`$${value}K`, name]}
                         labelFormatter={(label) => `Month: ${label}`}
                         contentStyle={{
                           backgroundColor: '#1f2937',
                           borderColor: '#4b5563',
                           borderRadius: '0.50rem'
                         }}
                       />
                    <Legend
                content={({ payload }) => (
                    <div className="flex gap-6 mt-4">
                    {payload.map((entry, index) => (
                        <div key={`item-${index}`} className="flex items-center gap-1">
                        {/* Custom Shape: circle */}
                        <div
                            style={{
                            backgroundColor: entry.color,
                            width: 10,
                            height: 10,
                            borderRadius: '50%', // <-- circle instead of square
                            marginRight: 6,
                            }}
                        />
                        <span style={{ color: entry.color, fontWeight: '600' }}>
                            {entry.value === 'income' ? 'Income' : 'Expense '}
                        </span>
                        </div>
                    ))}
                    </div>
                )}
                />

          <Bar dataKey="expense" fill="#7e22ce" activeBar={<Rectangle fill="purple" stroke="blue" />} />
          <Bar dataKey="income" fill="	#3b82f6" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
      </div>
      </div>
    );
  }
}
