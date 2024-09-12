import { IUpdateArticleDto } from "@/types/dtos";
import { NextRequest, NextResponse } from "next/server";
import { Article } from "@prisma/client";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "@/services/firebase";
import { updateArticleSchema } from "@/schemas/validationsSchemas";
import verifyImage from "@/utils/verifyImage";

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
      include: {
        comments: {
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: {
                id: true,
                userName: true,
                profilePicture: true,
                isAdmin: true,
              },
            },
          },
        },
      },
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
 * @access  private
 */
export async function DELETE(req: NextRequest, { params }: IProps) {
  try {
    const userFromToken = verifyToken(req);
    if (!userFromToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const id = +params.id;
    const article = await prisma.article.findUnique({ where: { id } });
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 },
      );
    }

    if (userFromToken.id !== article.authorId && !userFromToken.isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized to delete this article" },
        { status: 403 },
      );
    }

    if (article.imageUrl) {
      const deleteImage = await deleteImageFromFirebase(
        article.imageUrl,
        "article",
      );

      if (!deleteImage) {
        return NextResponse.json(
          { message: "Error deleting image" },
          { status: 500 },
        );
      }
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
 * @access  private
 */
export async function PUT(req: NextRequest, { params }: IProps) {
  try {
    const userFromToken = verifyToken(req);
    if (!userFromToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const id = +params.id;
    const article = await prisma.article.findUnique({ where: { id } });
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 },
      );
    }

    if (userFromToken.id !== article.authorId && !userFromToken.isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized to update this article" },
        { status: 403 },
      );
    }

    const formData = await req.formData();

    const body = {
      title: formData.get("title"),
      description: formData.get("description"),
    } as IUpdateArticleDto;

    const validation = updateArticleSchema.safeParse(body);
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

      // delete old image
      if (article.imageUrl != null) {
        const deleteImage = await deleteImageFromFirebase(
          article.imageUrl,
          "article",
        );

        if (!deleteImage) {
          return NextResponse.json(
            { message: "Error deleting image" },
            { status: 500 },
          );
        }
      }

      const publicImgUrl = await uploadImageToFirebase(file, "article");
      if (publicImgUrl.ok) body.imageUrl = publicImgUrl.url;
    }

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
