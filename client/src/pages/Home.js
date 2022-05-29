import React, { useEffect, useState } from "react";
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
  let temperature = 0;
  console.log("ASD", firstDevice);
  const [datatrend, setGamePlayTime] = useState([]);

  useEffect(() => {
    const gameStartInternal = setInterval(() => {
      setGamePlayTime((currentData) => [
        ...currentData,
        { time: time, temperature1: temperature, target: 120 },
      ]);
      temperature += 1;
      time += 1;
      console.log(datatrend);
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
              <h1>Lets get Sizzlin</h1>
              <ResponsiveContainer width="80%" height={500}>
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
                  />
                  <Line type="monotone" dataKey="target" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        <form onSubmit>
          <input
            className="form-input"
            placeholder="Your username"
            name="name"
            type="text"
          />
          <input
            className="form-input"
            placeholder="Your email"
            name="email"
            type="email"
          />
          <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
          />
          <button
            className="btn btn-block btn-info"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default Home;
