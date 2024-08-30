import { NextResponse } from "next/server";
import prisma from "@/utils/db";

/**
 * @method  GET
 * @route   ~/api/articles/count
 * @desc    Get Articles count
 * @access  public
 */
export async function GET() {
  try {
    const articlesCount = await prisma.article.count();
    return NextResponse.json({ articlesCount }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
