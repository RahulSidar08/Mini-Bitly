import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const AnalyticsTable = ({ links }) => {
  const loadUrlLogs = async (shortCode) => {
    try {
      let res = await axios.get(`https://mini-bitly-tjgu.onrender.com/api/urls/get/${shortCode}`, {
        withCredentials: true,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <table className="w-full table-auto border border-gray-300 mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2">Original URL</th>
          <th className="px-4 py-2">Short URL</th>
          <th className="px-4 py-2">Created At</th>
          <th className="px-4 py-2">Details</th>
          <th className="px-4 py-2">Expires?</th>
        </tr>
      </thead>
      <tbody>
        {links.map((link) => (
          <tr key={link.shortCode} className="text-center border-t">
            <td className="px-4 py-2">{link.longUrl}</td>
            <td className="px-4 py-2">
              <a
                href={`${link.longUrl}`}
                target="_blank"
                rel="noopener,noreferrer"
                className="text-blue-600 underline"
              >
                {link.shortCode}
              </a>
            </td>
            <td className="px-4 py-2">
              {new Date(link.createdAt).toLocaleDateString()}
            </td>
            <td>
              <button onClick={() => {
                loadUrlLogs(link.shortCode);
              }} >View</button>
            </td>
            <td className="px-4 py-2">{link.expiresAt ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnalyticsTable;
