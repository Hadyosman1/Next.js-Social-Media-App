import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { Article, Comment } from "@prisma/client";
import { verifyToken } from "@/utils/verifyToken";
import { createArticleSchema } from "@/schemas/validationsSchemas";
import { ICreateNewArticleDto } from "@/types/dtos";
import verifyImage from "@/utils/verifyImage";
import uploadImageToFirebase from "@/services/uploadImageToFirebase";

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
      const articles = await prisma.article.findMany({
        skip: articlesPerPage,
        take: +limit,
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
    }

    const articles = await prisma.article.findMany({
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

/**
 * @method  POST
 * @route   ~/api/articles
 * @desc    Create Article only using form data
 * @access  public only users and admins
 */
export async function POST(req: NextRequest) {
  try {
    const userFromToken = verifyToken(req);
    if (!userFromToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const body = {
      title: formData.get("title"),
      description: formData.get("description"),
    } as ICreateNewArticleDto;

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

    const file: File | null = formData.get("image") as unknown as File;
    if (file) {
      const result = verifyImage(file);
      if (result !== "valid") {
        return NextResponse.json(
          { message: result.message },
          { status: result.status },
        );
      }

      const publicImgUrl = await uploadImageToFirebase(file, "article");
      if (publicImgUrl.ok) body.imageUrl = publicImgUrl.url;
    }

    const article: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
        authorId: userFromToken.id,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
