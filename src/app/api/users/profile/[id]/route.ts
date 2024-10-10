import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { IUpdateUserDto } from "@/types/dtos";
import bcrypt from "bcryptjs";
import { userUpdateSchema } from "@/schemas/validationsSchemas";
import { cookies } from "next/headers";
import verifyImage from "@/utils/verifyImage";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "@/services/firebase";
import generateJWT from "@/utils/generateJWT";
import prepareCookie from "@/utils/prepareCookie";

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
    const user = await prisma.user.findUnique({ where: { id } });

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

    if (user.profilePicture != null) {
      const deleteImage = await deleteImageFromFirebase(
        user.profilePicture,
        "user",
      );

      if (!deleteImage) {
        return NextResponse.json(
          { message: "Error deleting image" },
          { status: 500 },
        );
      }
    }

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

    const formData = await req.formData();

    const data = {
      userName: formData.get("userName") ?? user.userName,
      email: formData.get("email")?.toString()?.toLowerCase() ?? user.email,
      password: formData.get("password") || undefined,
      isAdmin: formData.get("isAdmin") ?? user.isAdmin,
    } as IUpdateUserDto;

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

    const file: File | null = formData.get("profilePicture") as unknown as File;
    if (file) {
      const result = verifyImage(file);

      if (result !== "valid") {
        return NextResponse.json(
          { message: result.message },
          { status: result.status },
        );
      }

      // delete old image
      if (user.profilePicture != null) {
        const deleteImage = await deleteImageFromFirebase(
          user.profilePicture,
          "user",
        );

        if (!deleteImage) {
          return NextResponse.json(
            { message: "Error deleting image" },
            { status: 500 },
          );
        }
      }

      const publicImgUrl = await uploadImageToFirebase(file, "user");
      if (publicImgUrl.ok) data.profilePicture = publicImgUrl.url;
    }

    const token = generateJWT({
      id: id,
      email: data.email ?? user.email,
      isAdmin: data.isAdmin ?? user.isAdmin,
      userName: data.userName ?? user.userName,
      profilePicture: data.profilePicture ?? user.profilePicture,
    });

    const cookie = prepareCookie(token);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        password: data.password ?? user.password,
        email: data.email ?? user.email,
        isAdmin: data.isAdmin ?? user.isAdmin,
        userName: data.userName ?? user.userName,
        profilePicture: data.profilePicture ?? user.profilePicture,
      },
    });

    // eslint-disable-next-line no-unused-vars
    const { password, ...userWithOutPassword } = updatedUser;

    return NextResponse.json(
      { message: "User updated successfully", user: userWithOutPassword },
      { status: 200, headers: { "Set-Cookie": cookie } },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
