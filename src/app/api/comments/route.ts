import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken, verifyTokenForPage } from "@/utils/verifyToken";
import { ICreateNewCommentDto } from "@/types/dtos";
import { createCommentSchema } from "@/schemas/validationsSchemas";

/**
 * @method  POST
 * @route   ~/api/comments
 * @desc    Create comment
 * @access  private only logged in user or admin
 */
export async function POST(req: NextRequest) {
  try {
    const userFromToken = verifyToken(req);
    if (!userFromToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = (await req.json()) as ICreateNewCommentDto;

    const validation = createCommentSchema.safeParse(data);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: validation.error.errors[0].message,
          path: validation.error.errors[0].path[0],
        },
        { status: 400 },
      );
    }

    const article = await prisma.article.findUnique({
      where: { id: data.articleId },
    });
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 },
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        articleId: data.articleId,
        userId: userFromToken.id,
      },
    });

    return NextResponse.json(
      { message: "Comment created successfully", comment },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

/**
 * @method  GET
 * @route   ~/api/comments
 * @desc    get all comments
 * @access  private only admin
 */
export async function GET(req: NextRequest) {
  try {
    const Authorization = req.headers.get("Authorization");

    if (!Authorization || !Authorization.startsWith("Bearer")) {
      return NextResponse.json(
        { message: "Unauthorized , only Admin can get comments" },
        { status: 401 },
      );
    }

    const token = Authorization?.split(" ")[1];

    const userFromToken = verifyTokenForPage(token ?? "");

    if (!userFromToken || !userFromToken?.isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized , only Admin can get comments" },
        { status: 401 },
      );
    }

    const comments = await prisma.comment.findMany();

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
