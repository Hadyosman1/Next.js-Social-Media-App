import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { Article } from "@prisma/client";

/**
 * @method  GET
 * @route   ~/api/articles/search?searchKey= "*****"
 * @desc    Get Articles By searchKey
 * @access  public
 */

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const searchKey = req.nextUrl.searchParams.get("searchKey");
    let articles: Article[] = [];

    if (searchKey) {
      articles = await prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: searchKey, mode: "insensitive" } },
            { description: { contains: searchKey, mode: "insensitive" } },
          ],
        },
        orderBy: { createdAt: "desc" },
        include: {
          author: { select: { userName: true, profilePicture: true } },
          comments: {
            include: {
              user: { select: { userName: true, profilePicture: true } },
            },
          },
        },
      });
    }

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
