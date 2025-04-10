import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnalyticsTable from './AnalyticsTable';
import ClicksChart from './ClicksChart';
import DeviceChart from './DeviceChart';
import { BrowserPieChart } from './BrowserPieChart';
import { ClicksLineChart } from './Linechart';
export const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [clicksData, setClicksData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [data,setData] = useState([])
  const [single,setSingle] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3000/api/urls/getUrl',{withCredentials:true});
      setLinks(res.data.longUrl);
      setData(res.data.urls)
      setClicksData(res.data.urls); // [{ date: '2025-04-01', clicks: 10 }, ...]
      setDeviceData(res.data.urls); // [{ device: 'Mobile', count: 40 }, ...]
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3000/api/urls/get/yt',{withCredentials:true});
      console.log(res)
      setSingle(res.data.link)
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <AnalyticsTable links={data} />
      <BrowserPieChart data={single}/>
      <ClicksLineChart data={single}/>
    </div>
  );
};

