"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import RepoCard from "@/components/RepoCard";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get("/api/favorites");
      setFavorites(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavorite = async (repo) => {
    try {
      await axios.delete(`/api/favorites?id=${repo._id}`);
      setFavorites((prev) =>
        prev.filter((item) => item._id !== repo._id)
      );
      toast.success("Removed from favorites");
    } catch (error) {
      console.error(error);
      toast.error("Error removing favorite");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">My Favorites</h1>
        <Link
          href="/"
          className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
        >
          Back to Home
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((repo) => (
          <RepoCard
            key={repo._id}
            repo={repo}
            onFavorite={removeFavorite}
            isFavoritePage={true}
          />
        ))}
      </div>
    </div>
  );
}