import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { updateCommentSchema } from "@/schemas/validationsSchemas";
import { IUpdateCommentDto } from "@/types/dtos";

interface IProps {
  params: { id: string };
}

/**
 * @method  PUT
 * @route   ~/api/comments/:id
 * @desc    Update comment
 * @access  private Only (owner) can update
 */
export async function PUT(req: NextRequest, { params }: IProps) {
  try {
    const id = +params.id;
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 },
      );
    }

    const userFromToken = verifyToken(req);
    if (!userFromToken || userFromToken.id !== comment.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = (await req.json()) as IUpdateCommentDto;

    const validation = updateCommentSchema.safeParse(data);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: validation.error.errors[0].message,
          path: validation.error.errors[0].path[0],
        },
        { status: 400 },
      );
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: {
        content: data.content,
      },
    });

    return NextResponse.json(
      { message: "Comment updated successfully", updatedComment },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

/**
 * @method  DELETE
 * @route   ~/api/comments/:id
 * @desc    Delete comment
 * @access  private Only (owner || Admin) can delete
 */
export async function DELETE(req: NextRequest, { params }: IProps) {
  try {
    const id = +params.id;
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 },
      );
    }

    const userFromToken = verifyToken(req);
    if (
      !userFromToken ||
      (userFromToken.id !== comment.userId && !userFromToken?.isAdmin)
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const deletedComment = await prisma.comment.delete({ where: { id } });

    return NextResponse.json(
      { message: "Comment deleted successfully", deletedComment },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
