"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import RepoCard from "@/components/RepoCard";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get("/api/favorites");
      setFavorites(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchRepos = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(
        `https://api.github.com/search/repositories?q=${query}`
      );
      setRepos(res.data.items);
    } catch (error) {
      toast.error("Error fetching repositories");
    }
  };

  const addToFavorites = async (repo) => {
    try {
      await axios.post("/api/favorites", repo);
      toast.success("Added to favorites!");
      fetchFavorites();
    } catch (error) {
      toast.error("Already added to favorites");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">GitHub Repo Explorer</h1>
        <Link
          href="/favorites"
          className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
        >
          View Favorites
        </Link>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchRepos();
        }}
        className="flex gap-4 mb-10"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search repositories..."
          className="flex-1 border border-gray-300 px-4 py-2 rounded-xl"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            onFavorite={addToFavorites}
            isAlreadyFavorite={favorites.some(
              (fav) => fav.repoId == repo.id
            )}
          />
        ))}
      </div>
    </div>
  );
}