import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const AnalyticsDashboard = ({ token }) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [error, setError] = useState("");

  // Fetch analytics data when the component mounts
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/analytics", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Error fetching analytics data");
        } else {
          setAnalyticsData(data);
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching analytics data");
      }
    };

    fetchAnalytics();
  }, [token]);

  // Utility to compute expiration status
  const getExpirationStatus = (expirationDate) => {
    if (!expirationDate) return "No Expiry";
    const expDate = new Date(expirationDate);
    return expDate > new Date() ? "Active" : "Expired";
  };

  // Prepare data for Clicks Over Time Chart (line chart)
  // Example: We aggregate all clicks by date for all URLs.
  const getClicksOverTimeData = () => {
    if (!analyticsData) return { labels: [], data: [] };

    // Let's assume we aggregate by day.
    const clickCounts = {};
    analyticsData.urls.forEach(url => {
      url.clickLogs.forEach(log => {
        const date = new Date(log.timestamp).toLocaleDateString();
        clickCounts[date] = (clickCounts[date] || 0) + 1;
      });
    });
    const labels = Object.keys(clickCounts).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    const dataPoints = labels.map(label => clickCounts[label]);

    return {
      labels,
      datasets: [
        {
          label: "Clicks Over Time",
          data: dataPoints,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
      ],
    };
  };

  // Prepare data for Device/Browser Breakdown Chart (pie chart)
  // Example: We group click logs by device type
  const getDeviceBreakdownData = () => {
    if (!analyticsData) return { labels: [], data: [] };

    const deviceCounts = {};
    analyticsData.urls.forEach(url => {
      url.clickLogs.forEach(log => {
        const device = log.device || "Other";
        deviceCounts[device] = (deviceCounts[device] || 0) + 1;
      });
    });
    const labels = Object.keys(deviceCounts);
    const counts = labels.map(label => deviceCounts[label]);

    return {
      labels,
      datasets: [
        {
          data: counts,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4CAF50",
            "#AA66CC",
          ],
        },
      ],
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-3xl font-bold mb-6">Analytics Dashboard</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Table Showing URL Data */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Original URL</th>
                <th className="py-2 px-4 border-b">Short URL</th>
                <th className="py-2 px-4 border-b">Total Clicks</th>
                <th className="py-2 px-4 border-b">Created Date</th>
                <th className="py-2 px-4 border-b">Expiration Status</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData?.urls && analyticsData.urls.length > 0 ? (
                analyticsData.urls.map(url => (
                  <tr key={url._id}>
                    <td className="py-2 px-4 border-b">{url.longUrl}</td>
                    <td className="py-2 px-4 border-b">
                      <a
                        href={`https://yourdomain.com/${url.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {`https://yourdomain.com/${url.shortCode}`}
                      </a>
                    </td>
                    <td className="py-2 px-4 border-b">{url.totalClicks}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(url.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {getExpirationStatus(url.expirationDate)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center">
                    No URL data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Line Chart: Clicks Over Time */}
          <div className="bg-gray-50 p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Clicks Over Time</h3>
            {analyticsData ? (
              <Line data={getClicksOverTimeData()} />
            ) : (
              <p>Loading chart...</p>
            )}
          </div>

          {/* Pie Chart: Device Breakdown */}
          <div className="bg-gray-50 p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Device Breakdown</h3>
            {analyticsData ? (
              <Pie data={getDeviceBreakdownData()} />
            ) : (
              <p>Loading chart...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
