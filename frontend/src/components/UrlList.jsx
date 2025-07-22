import React from "react";
import { incrementClick } from "../services/api";

const UrlList = ({ urls, onClickUpdate }) => {
  const handleClick = async (shortCode, originalUrl) => {
    try {
      await incrementClick(shortCode);      
      onClickUpdate(shortCode);              
      window.open(originalUrl, "_blank");   
    } catch (err) {
      console.error("Click increment failed:", err.message);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">🔗 Your Shortened URLs</h2>
      <ul className="space-y-4">
        {urls.map((url, index) => (
          <li
            key={index}
            className="border p-3 rounded-md bg-gray-50 flex justify-between items-center"
          >
            <button
              onClick={() => handleClick(url.shortCode, url.originalUrl)}
              className="text-left text-blue-600 underline hover:text-blue-800"
            >
              {window.location.origin}/{url.shortCode}
            </button>
            <span className="text-sm text-gray-800">
              Clicks: {url.clicks || 0}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;
