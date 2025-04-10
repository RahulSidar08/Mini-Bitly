import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export const ClicksLineChart = ({ data }) => {
  console.log("linechart",data)
  // Convert timestamps to date strings
  const clicksArray = Array.isArray(data) ? data : [data];
  const formattedData = clicksArray.reduce((acc, click) => {
    const date = new Date(click.timestamp).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.clicks += 1;
    } else {
      acc.push({ date, clicks: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="w-full h-80">
      <h2 className="text-xl font-semibold mb-2">Clicks Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="clicks" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
