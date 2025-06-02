import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 500 },
  { name: 'Mar', value: 550 },
  { name: 'Apr', value: 500 },
  { name: 'May', value: 450 },
  { name: 'June', value: 500 },
  { name: 'July', value: 600 },
  { name: 'July', value: 550 },
  { name: 'July', value: 600 },
  { name: 'July', value: 550 },
  { name: 'July', value: 600 },
  { name: 'July', value: 550 },
];

export default function CryptoCharts() {
  return (
    <>
    <div className='px-4 py-5 flex flex-col items-center'><h1 className='text-white font-bold'>Crypto Price Action</h1>
    <LineChart width={400} height={300} data={data}>
      <CartesianGrid strokeDasharray="0 9" />
      <XAxis tick={{ fill: "White", fontSize: 14 }} />
      <YAxis tick={{ fill: "White", fontSize: 14 }} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="cyan" />
    </LineChart>
    </div>
  </>
  );
}
