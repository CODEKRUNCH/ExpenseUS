import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';


export default class FinanceChart extends PureComponent {
  render() {
    
const {
      data = [
        { name: 'Jan', expenses: 25, savings: 15 },
        { name: 'Feb', expenses: 50, savings: 30 },
        { name: 'Mar', expenses: 75, savings: 45 },
        { name: 'Apr', expenses: 20, savings: 60 },
        { name: 'May', expenses: 125, savings: 75 },
        { name: 'Jun', expenses: 150, savings: 90 },
        { name: 'Jul', expenses: 200, savings: 105 },
        { name: 'Aug', expenses: 200, savings: 120 },
        { name: 'Sep', expenses: 225, savings: 135 },
        { name: 'Oct', expenses: 240, savings: 150 },
        { name: 'Nov', expenses: 230, savings: 165 },
        { name: 'Dec', expenses: 250, savings: 180 }
      ],
      yAxisTicks = [0, 50, 100, 150, 200, 250],
      xAxisTicks
    } = this.props;

    return (
      <div className="rounded-lg p-4 shadow bg-[#0B1739] text-white">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-gray-300 text-sm font-medium">Financial Overview</h2>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">$125.2k</p>
              <span className="text-green-400 text-sm bg-gray-700 px-2 py-1 rounded">
                +12.5%
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm">June 21, 2023</p>
        </div>

        {/* Chart Container */}
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <YAxis 
                orientation="left"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                ticks={[0, 50, 100, 150, 200, 250]}
                domain={[0, 250]}
              />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                formatter={(value, name) => [`$${value}K`, name]}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  borderColor: '#4b5563',
                  borderRadius: '0.25rem'
                }}
              />
              <Legend />
              {/* Expenses Line - Purple */}
              <Area 
                type="monotone" 
                dataKey="expenses" 
                name="Expenses"
                stroke="#7e22ce" 
                fill="#7e22ce" 
                fillOpacity={0.1}
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              {/* Savings Line - Green */}
              <Area 
                type="monotone" 
                dataKey="savings" 
                name="Savings"
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.1}
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div className="flex justify-between text-xs text-gray-400 mt-4">
          <span>Jan</span>
          <span>Dec</span>
        </div>
      </div>
    );
  }
}