import React, { useState } from "react";

const ShortenForm = ({ onShorten }) => {
  const [originalUrl, setOriginalUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!originalUrl) return;
    onShorten(originalUrl);
    setOriginalUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="url"
        placeholder="Paste your URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="border px-3 py-2 w-full mb-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Shorten
      </button>
    </form>
  );
};

export default ShortenForm;
