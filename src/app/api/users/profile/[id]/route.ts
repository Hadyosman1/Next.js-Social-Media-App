import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { IUpdateUserDto } from "@/types/dtos";
import bcrypt from "bcryptjs";
import { userUpdateSchema } from "@/schemas/validationsSchemas";
import { cookies } from "next/headers";

interface IProps {
  params: { id: string };
}

/**
 * @method  GET
 * @route   /api/users/profile/:id
 * @desc    Get user info
 * @access  public
 */
export async function GET(req: NextRequest, { params }: IProps) {
  try {
    const id = +params.id;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        articles: {
          orderBy: { createdAt: "desc" },
          include: { comments: { orderBy: { createdAt: "desc" } } },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // eslint-disable-next-line no-unused-vars
    const { password, ...userWithOutPassword } = user;

    return NextResponse.json(userWithOutPassword, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

/**
 * @method  DELETE
 * @route   /api/users/profile/:id
 * @desc    Delete user account
 * @access  private
 */
export async function DELETE(req: NextRequest, { params }: IProps) {
  try {
    const id = +params.id;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(req);
    if (
      !userFromToken ||
      (userFromToken.id !== id && !userFromToken?.isAdmin)
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    //todo: ==>> Handle delete user Picture from cloud
    const deletedUser = await prisma.user.delete({ where: { id } });

    if (
      !userFromToken.isAdmin ||
      (userFromToken.isAdmin && userFromToken.id == id)
    ) {
      cookies().delete("jwt_token");
    }

    return NextResponse.json(
      { message: "User deleted successfully", deletedUser },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

/**
 * @method  PUT
 * @route   /api/users/profile/:id
 * @desc    Update profile
 * @access  private
 */
export async function PUT(req: NextRequest, { params }: IProps) {
  try {
    const id = +params.id;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(req);
    if (
      !userFromToken ||
      (userFromToken.id !== id && !userFromToken?.isAdmin)
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const data = (await req.json()) as IUpdateUserDto;

    const validation = userUpdateSchema.safeParse(data);
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

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    //todo: ==>> Handle delete user Picture and add another new one
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        userName: data.userName,
        email: data.email,
        password: data.password,
      },
    });

    // eslint-disable-next-line no-unused-vars
    const { password, ...userWithOutPassword } = updatedUser;

    return NextResponse.json(
      { message: "User updated successfully", userWithOutPassword },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
