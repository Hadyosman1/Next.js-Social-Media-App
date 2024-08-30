import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { Article } from "@prisma/client";
import { verifyToken } from "@/utils/verifyToken";
import { createArticleSchema } from "@/schemas/validationsSchemas";
import { ICreateNewArticleDto } from "@/types/dtos";

/**
 * @method  GET
 * @route   ~/api/articles
 * @desc    Get All Articles
 * @access  public paginated and not paginated
 */
export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");
    if (
      page &&
      limit &&
      typeof +page === "number" &&
      typeof +limit === "number"
    ) {
      const articlesPerPage = (+page - 1) * +limit;
      const articles: Article[] = await prisma.article.findMany({
        skip: articlesPerPage,
        take: +limit,
      });
      return NextResponse.json(articles, { status: 200 });
    }

    const articles: Article[] = await prisma.article.findMany();

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

/**
 * @method  POST
 * @route   ~/api/articles
 * @desc    Create Article
 * @access  public only users and admins
 */
export async function POST(req: NextRequest) {
  try {
    const userFromToken = verifyToken(req);
    if (!userFromToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as ICreateNewArticleDto;
    const validation = createArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: validation.error.errors[0].message,
          path: validation.error.errors[0].path[0],
        },
        {
          status: 400,
        },
      );
    }

    //todo: ==>> Handle Add Picture
    const article: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
        authorId: userFromToken.id,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
