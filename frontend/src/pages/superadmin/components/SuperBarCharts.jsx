import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "A", users: 100 },
  { name: "B", users: 200 },
];

export default function SuperBarCharts() {
  return (
    <div style={{ width: 400, height: 300 }}>
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="users" fill="#757FF6" />
      </BarChart>
    </div>
  );
}

