import React from "react";
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

const dataChart = [
  {
    time: "14:00",
    temperature1: 30,
  },
  {
    time: "14:10",
    temperature1: 40,
  },
  {
    time: "14:20",
    temperature1: 60,
  },
  {
    time: "14:30",
    temperature1: 90,
  },
  {
    time: "14:40",
    temperature1: 120,
  },
  {
    time: "14:50",
    temperature1: 125,
  },
  {
    time: "15:00",
    temperature1: 118,
  },
  {
    time: "15:10",
    temperature1: 121,
  },
  {
    time: "15:20",
    temperature1: 120,
  },
  {
    time: "15:30",
    temperature1: 119,
  },
];

const Home = () => {
  const { loading, data } = useQuery(QUERY_FIRST_DEVICE);
  const firstDevice = data?.firstDevice || [];

  console.log("ASD", firstDevice);

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <h1>Device Info</h1>
              <ResponsiveContainer width="80%" height={500}>
                <AreaChart
                  data={dataChart}
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
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="temperature1"
                    stroke="#82ca9d"
                  />
                  <ReferenceLine y={120} label="Target" stroke="red" />
                </AreaChart>
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
