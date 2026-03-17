"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 bg-white p-4 rounded-2xl shadow-md"
    >
      <input
        type="text"
        placeholder="Search GitHub repositories..."
        className="flex-1 outline-none text-lg text-gray-700"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition"
      >
        Search
      </button>
    </form>
  );
}