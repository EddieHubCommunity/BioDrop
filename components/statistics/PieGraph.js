import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export default function PieGraph({ data, dataKey = "value" }) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer height="100%">
        <PieChart>
          <Pie
            dataKey={dataKey}
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#38a1ad"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
