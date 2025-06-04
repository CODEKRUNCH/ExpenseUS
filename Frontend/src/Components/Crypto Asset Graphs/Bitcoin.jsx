import React, { useEffect, useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot } from "recharts";

const TAIL_LENGTH = 50;

const BtcChart = () => {
    const [data, setData] = useState(Array.from({ length: TAIL_LENGTH }, (_, i) => ({
        name: `${i}s`,
        value: 0,
    })));
    const buffer = useRef([]);

    useEffect(() => {
        const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

        ws.onmessage = (event) => {
            const price = parseFloat(JSON.parse(event.data).p);
            buffer.current.push(price);
        };

        const interval = setInterval(() => {
            if (buffer.current.length > 0) {
                const avg = buffer.current.reduce((sum, val) => sum + val, 0) / buffer.current.length;
                buffer.current = [];

                setData((prev) => {
                    const newData = [...prev.slice(1), { name: `${prev.length}s`, value: avg }];
                    return newData;
                });
            }
        }, 1000);

        return () => {
            ws.close();
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <div className="px-5 py-3">
                <LineChart width={500} height={280} data={data}>
                    <CartesianGrid strokeDasharray="0.2, 1" />
                    <XAxis dataKey="name" hide />
                    <YAxis domain={["auto", "auto"]} />
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
                                        <p>BTC: ${payload[0].value.toFixed(2)}</p>
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
                            fill="lime"
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
                        type="basis"
                        dataKey="value"
                        stroke="CYAN"
                        dot={false}
                        isAnimationActive={true}
                        animationDuration={500}
                    />
                </LineChart>
      <p className="w-20 flex flex-col items-center mt-2 ml-70 text-gray-400 p-2 border border-gray-600 rounded-md">Bitcoin </p>
            </div>
        </>
    );
};

export default BtcChart;
