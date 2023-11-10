import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import dateFormat from "@services/utils/dateFormat";

function formatDate(value) {
  return dateFormat({
    format: "short",
    date: value,
    locale: "local",
    UTCLocal: true,
  });
}

export default function BarGraph({ data, dataKey = "views" }) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatDate} />
          <YAxis />
          <Tooltip
            labelFormatter={formatDate}
            contentStyle={{
              color: "black",
            }}
          />
          <Bar dataKey={dataKey} fill="#38a1ad" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
