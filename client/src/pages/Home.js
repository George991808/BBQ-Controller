import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { QUERY_FIRST_DEVICE } from "../utils/queries";
import ToggleSwitch from "../components/ToggleSwitch/ToggleSwitch.js";

const Home = () => {
  const { loading, data } = useQuery(QUERY_FIRST_DEVICE);
  //const firstDevice = data?.firstDevice || [];
  let time = 0;
  let temperature = 25;
  //console.log("ASD", firstDevice);
  const [target, setTarget] = useState(120);
  const [vent, setVent] = useState(0);
  //const [mode, setMode] = useState("MAN");
  const [datatrend, setGamePlayTime] = useState([]);
  // const [toggled, setToggled] = React.useState(false);
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
          temperature1: temperature + (Math.random() * temperature) / 10,

          target: targetRef.current,
        },
      ]);
      temperature =
        (ventRef.current + 25 / 8) * 8 * 0.01 + temperature * (1 - 0.01);
      time += 1;
      if (Math.random() < 0.03) {
        temperature = temperature + (Math.random() - 1) * 4;
      }
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
              <h1 className="body-header flex-row  justify-center">
                Lets get Sizzlin
              </h1>
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
      <div className="flex-row justify-center col-12">
        <div className="flex-row justify-center col-12 col-md-6 ">
          <div className="flex-row justify-center col-12">
            <h1 className="body-header">Vent Position</h1>
          </div>
          <div className="flex-row justify-center col-12">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={vent}
              onChange={(event) => {
                setVent(event.target.valueAsNumber);
                console.log(event.target.valueAsNumber);
              }}
            />
          </div>
          <div className="flex-row justify-center col-12">
            <h1 className="body-header">{vent}</h1>
          </div>
        </div>
        <div className="flex-row justify-center col-12 col-md-6">
          <div className="flex-row justify-center col-12">
            <h1 className="body-header">Target</h1>
          </div>
          <div className="flex-row justify-center col-12">
            <div className="flex-row justify-center col-12">
              <input
                type="range"
                min={0}
                max={400}
                step={1}
                value={target}
                onChange={(event) => {
                  setTarget(event.target.valueAsNumber);
                  console.log(event.target.valueAsNumber);
                }}
              />
            </div>
            <div className="flex-row justify-center col-12">
              <h1 className="body-header">{target}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-row justify-center col-12">
        <div className="flex-row justify-center col-12 col-md-6">
          <div className="flex-row justify-flex-end col-4">
            <h1 className="body-header">Manual</h1>
          </div>
          <div className="flex-row justify-center col-4">
            <ToggleSwitch />
          </div>
          <div className="flex-row justify-flex-start  col-4">
            <h1 className="body-header">Automatic</h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
