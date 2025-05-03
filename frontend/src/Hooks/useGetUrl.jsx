import { useEffect } from "react";
import axios from "axios";
export const useGetUrl = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://mini-bitly-tjgu.onrender.com/api/urls/getUrl", {
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
