import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Favorite from "@/models/favorite";

export async function GET() {
  try {
    await connectDB();
    const favorites = await Favorite.find().sort({ createdAt: -1 });
    return NextResponse.json(favorites);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("BODY:", body);

    const { id, name, html_url, description, owner, stargazers_count } = body;

    const existing = await Favorite.findOne({ repoId: id.toString() });

    if (existing) {
      return NextResponse.json(
        { message: "Already added" },
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

    console.log("SAVED:", newFavorite);

    return NextResponse.json(newFavorite, { status: 201 });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID required" },
        { status: 400 }
      );
    }

    const deleted = await Favorite.findOneAndDelete({ repoId: id });

    if (!deleted) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}