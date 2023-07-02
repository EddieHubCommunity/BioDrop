import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function StatsChart({data}) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            contentStyle={{
              color: "black",
            }}
          />
          <Bar dataKey="views" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}