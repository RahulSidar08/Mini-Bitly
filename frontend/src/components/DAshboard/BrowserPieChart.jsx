import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

export const BrowserPieChart = ({ data }) => {
  // Ensure we always have an array
  const clicksArray = Array.isArray(data) ? data : [data];

  const grouped = clicksArray.reduce((acc, click) => {
    const browser = click.browser || "Unknown";
    acc[browser] = (acc[browser] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([browser, count]) => ({
    name: browser,
    value: count,
  }));

  return (
    <div className="w-full h-80">
      <h2 className="text-xl font-semibold mb-2">Device / Browser Breakdown</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BrowserPieChart;
