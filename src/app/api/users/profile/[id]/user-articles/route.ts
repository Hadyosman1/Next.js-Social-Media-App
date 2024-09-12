import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

type TProps = {
  params: { id: string };
};

/**
 * @method  GET
 * @route   /api/users/profile/:id/user-articles
 * @desc    Get user articles
 * @access  public
 */
export async function GET(req: NextRequest, { params }: TProps) {
  try {
    const id = +params.id;

    const articles = await prisma.article.findMany({
      where: { authorId: id },
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { userName: true, profilePicture: true } },
        comments: {
          include: {
            user: { select: { userName: true, profilePicture: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
