import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { IRegisterUserDto } from "@/types/dtos";
import { createUserSchema } from "@/schemas/validationsSchemas";
import bcrypt from "bcryptjs";
import generateJWT from "@/utils/generateJWT";
import prepareCookie from "@/utils/prepareCookie";
import verifyImage from "@/utils/verifyImage";
import { uploadImageToFirebase } from "@/services/firebase";
import { verifyToken } from "@/utils/verifyToken";

/**
 * @method  POST
 * @route   ~/api/users/register
 * @desc    (Create/register) user only using form data
 * @access  public
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const data = {
      userName: formData.get("userName"),
      email: formData.get("email"),
      password: formData.get("password"),
      isAdmin: Boolean(formData.get("isAdmin")),
    } as IRegisterUserDto;

    const validation = createUserSchema.safeParse(data);
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

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;

    const file: File | null = formData.get("profilePicture") as unknown as File;
    if (file) {
      const result = verifyImage(file);
      if (result !== "valid") {
        return NextResponse.json(
          { message: result.message },
          { status: result.status },
        );
      }

      const publicImgUrl = await uploadImageToFirebase(file, "user");
      if (publicImgUrl.ok) data.profilePicture = publicImgUrl.url;
    }

    const createdUser = await prisma.user.create({
      data,
    });

    // eslint-disable-next-line no-unused-vars
    const { password, ...createdUserWithOutPassword } = createdUser;

    const userFromToken = verifyToken(req);
    if (userFromToken?.isAdmin) {
      return NextResponse.json(
        { ...createdUserWithOutPassword },
        { status: 201 },
      );
    }

    const token = generateJWT({
      id: createdUser.id,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      userName: createdUser.userName,
      profilePicture: createdUser.profilePicture,
    });

    const cookie = prepareCookie(token);

    return NextResponse.json(
      { ...createdUserWithOutPassword },
      { status: 201, headers: { "Set-Cookie": cookie } },
    );
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
