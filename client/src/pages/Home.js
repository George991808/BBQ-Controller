import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";

import {
  LineChart,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import { QUERY_FIRST_DEVICE } from "../utils/queries";

let dataChart = [
  {
    time: 0,
    temperature1: 0,
  },
  {
    time: 10,
    temperature1: 0,
  },
  {
    time: 20,
    temperature1: 0,
  },
  {
    time: 30,
    temperature1: 0,
  },
  {
    time: 40,
    temperature1: 0,
  },
  {
    time: 50,
    temperature1: 0,
  },
  {
    time: 60,
    temperature1: 0,
  },
  {
    time: 70,
    temperature1: 0,
  },
  {
    time: 80,
    temperature1: 0,
  },
  {
    time: 80,
    temperature1: 0,
  },
];

const Home = () => {
  const { loading, data } = useQuery(QUERY_FIRST_DEVICE);
  const firstDevice = data?.firstDevice || [];
  let time = 0;
  let temperature = 25;
  //console.log("ASD", firstDevice);
  const [target, setTarget] = useState(120);
  const [vent, setVent] = useState(0);
  const [datatrend, setGamePlayTime] = useState([]);
  const ventRef = useRef({});
  ventRef.current = vent;
  const targetRef = useRef({});
  targetRef.current = target;

  useEffect(() => {
    const gameStartInternal = setInterval(() => {
      setGamePlayTime((currentData) => [
        ...currentData,
        {
          time: time,
          temperature1: temperature + Math.random() * 4,

          target: targetRef.current,
        },
      ]);
      temperature =
        (ventRef.current + 25 / 8) * 8 * 0.01 + temperature * (1 - 0.01);
      time += 1;

      console.log(ventRef.current);
    }, 1000);

    return () => {
      clearInterval(gameStartInternal);
    };
  }, []);

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <h1 className="body-header">Lets get Sizzlin</h1>
              <ResponsiveContainer width="100%" height={500}>
                <LineChart
                  data={datatrend}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="temperature1"
                    stroke="#82ca9d"
                    strokeWidth={4}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="red"
                    strokeWidth={4}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
      <div className="flex-row justify-center">
        <h1 className="body-header">Vent Position</h1>
      </div>
      <div className="flex-row justify-center">
        <input
          type="range"
          min={0}
          max={100}
          step={0.02}
          value={vent}
          onChange={(event) => {
            setVent(event.target.valueAsNumber);
            console.log(event.target.valueAsNumber);
          }}
        />
      </div>
      <div className="flex-row justify-center">
        <h1 className="body-header">Target</h1>
      </div>
      <div className="flex-row justify-center">
        <div className="flex-row justify-center">
          <input
            type="range"
            min={0}
            max={500}
            step={0.02}
            value={target}
            onChange={(event) => {
              setTarget(event.target.valueAsNumber);
              console.log(event.target.valueAsNumber);
            }}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
