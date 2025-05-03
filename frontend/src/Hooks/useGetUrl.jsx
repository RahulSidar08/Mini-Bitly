import { useEffect } from "react";
import axios from "axios";
export const useGetUrl = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/urls/getUrl", {
        withCredentials: true,
      });
      setLinks(res.data.longUrl);
      setData(res.data.urls);
      setClicksData(res.data.urls);
      setDeviceData(res.data.urls);
    };
    fetchData();
  }, []);
};
