import { NextRequest, NextResponse } from "next/server";
import { createArticleSchema } from "@/schemas/validationsSchemas";
import { ICreateNewArticleDto } from "@/types/dtos";
import { Article } from "@prisma/client";
import prisma from "@/utils/db";

/**
 * @method  GET
 * @route   ~/api/articles
 * @desc    Get All Articles
 * @access  public
 */
export async function GET() {
  try {
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
 * @access  public
 */
export async function POST(req: NextRequest) {
  try {
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

    const article: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
