import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Favorite from "@/models/favorite";

export async function GET() {
  try {
    await connectDB();

    const favorites = await Favorite.find().sort({ createdAt: -1 });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { message: "Error fetching favorites" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      id,
      name,
      html_url,
      description,
      owner,
      stargazers_count,
    } = body;

    const existing = await Favorite.findOne({ repoId: id.toString() });

    if (existing) {
      return NextResponse.json(
        { message: "Already added to favorites" },
        { status: 400 }
      );
    }

    const newFavorite = await Favorite.create({
      repoId: id.toString(),
      name,
      owner: owner?.login,
      stars: stargazers_count,
      html_url,
      description,
    });

    return NextResponse.json(newFavorite, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}