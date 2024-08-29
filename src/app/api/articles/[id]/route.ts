import { IUpdateArticleDto } from "@/types/dtos";
import { NextRequest, NextResponse } from "next/server";
import { Article } from "@prisma/client";
import prisma from "@/utils/db";

interface IProps {
  params: { id: string };
}

/**
 * @method  GET
 * @route   ~/api/articles/:id
 * @desc    Get Single Article By Id
 * @access  public
 */
export async function GET(req: NextRequest, { params }: IProps) {
  try {
    const article: Article | null = await prisma.article.findUnique({
      where: { id: +params.id },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

/**
 * @method  DELETE
 * @route   ~/api/articles/:id
 * @desc    Delete Article
 * @access  public
 */
export async function DELETE(req: NextRequest, { params }: IProps) {
  try {
    const id = +params.id;

    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 },
      );
    }

    const deletedArticle = await prisma.article.delete({ where: { id } });

    return NextResponse.json(
      { message: "Article deleted successfully", deletedArticle },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

/**
 * @method  PUT
 * @route   ~/api/articles/:id
 * @desc    Update Article
 * @access  public
 */
export async function PUT(req: NextRequest, { params }: IProps) {
  try {
    const id = +params.id;

    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 },
      );
    }

    const data = (await req.json()) as IUpdateArticleDto;

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
