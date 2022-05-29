import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import {format}
// const data =[];
// for (let num=30; num >= 0; num--){
//  data.push({
//    date:subDays
//  })
// }
// const series = [
//   {
//     name: "Series 1",
//     data: [
//       { category: "A", value: Math.random() },
//       { category: "B", value: Math.random() },
//       { category: "C", value: Math.random() },
//     ],
//   },
//   {
//     name: "Series 2",
//     data: [
//       { category: "B", value: Math.random() },
//       { category: "C", value: Math.random() },
//       { category: "D", value: Math.random() },
//     ],
//   },
//   {
//     name: "Series 3",
//     data: [
//       { category: "C", value: Math.random() },
//       { category: "D", value: Math.random() },
//       { category: "E", value: Math.random() },
//     ],
//   },
// ];

const TrendList = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300}></LineChart>
    </ResponsiveContainer>
  );
};

export default TrendList;
