import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { message: "Query is required" },
        { status: 400 }
      );
    }

    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${query}`
    );

    return NextResponse.json(response.data);

  } catch (error) {
    console.error("GitHub API Error:", error.message);
    return NextResponse.json(
      { message: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}