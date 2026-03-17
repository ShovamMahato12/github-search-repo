import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Favorite from "@/models/favorite";

export async function DELETE(req, context) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);


    const { id } = await context.params;

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
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}