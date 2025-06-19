import React, { useEffect, useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot } from "recharts";

const TAIL_LENGTH = 50;

const LtcChart = () => {
  const [data, setData] = useState(Array.from({ length: TAIL_LENGTH }, (_, i) => ({
    name: `${i}s`,
    value: 0,
  })));
  const buffer = useRef([]);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/ltcusdt@trade");

    ws.onmessage = (event) => {
      const price = parseFloat(JSON.parse(event.data).p);
      buffer.current.push(price);
    };

    const interval = setInterval(() => {
      if (buffer.current.length > 0) {
        const avg =
          buffer.current.reduce((sum, val) => sum + val, 0) / buffer.current.length;
        buffer.current = [];

        setData((prev) => {
          const newData = [...prev.slice(1), { name: `${prev.length}s`, value: avg }];
          return newData;
        });
      }
    }, 500); // Smooth head movement every 500ms

    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="mt-4 mr-5  border-white">
      <LineChart width={100} height={65} data={data}>
        <CartesianGrid strokeDasharray="0, 10" />
        <XAxis dataKey="name" hide />
        <YAxis domain={["auto", "auto"]} hide />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div
                  style={{
                    backgroundColor: "black",
                    border: "0px solid #00ffcc",
                    padding: "3px",
                    borderRadius: "2px",
                    color: "#abb2b9",
                    fontSize: "10px"
                  }}
                >
                  <p>LTC: ${payload[0].value.toFixed(2)}</p>
                </div>
              );
            }
            return null;
          }}
          cursor={false}
        />

        {data.length > 0 && (
          <ReferenceDot
            x={data[data.length - 1].name}
            y={data[data.length - 1].value}
            r={6}
            fill="#AB47BC"
            stroke="black"
            strokeWidth={1.5}
            label={{
              value: `$${data[data.length - 1].value.toFixed(2)}`,
              position: "top",
              fill: "white",
              fontSize: 12,
            }}
          />
        )}
        <Line
          type="basis" dataKey="value" stroke="#AB47BC" dot={false} isAnimationActive={true} animationDuration={500}
        />
      </LineChart>
    </div>
  );
};

export default LtcChart;