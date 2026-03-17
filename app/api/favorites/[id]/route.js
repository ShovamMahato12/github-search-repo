import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Favorite from "@/models/favorite";

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const deleted = await Favorite.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Favorite not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}