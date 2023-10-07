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
  const parsedDate = new Date(value);

  // Check if parsedDate is a valid date
  if (!isNaN(parsedDate.getTime())) {
    // If it's a valid date, call dateFormat to format it
    return dateFormat({ format: "short", date: parsedDate, locale: "local", UTCLocal: true });
  } else {
    // If it's not a valid date, return the original value
    return value;
  }
}

export default function StatsChart({ data }) {
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
          <Bar dataKey="views" fill="#38a1ad" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
