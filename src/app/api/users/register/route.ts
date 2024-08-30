import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { IRegisterUserDto } from "@/types/dtos";
import { createUserSchema } from "@/schemas/validationsSchemas";
import bcrypt from "bcryptjs";
import generateJWT from "@/utils/generateJWT";
import prepareCookie from "@/utils/prepareCookie";

/**
 * @method  POST
 * @route   ~/api/users/register
 * @desc    (Create/register) user
 * @access  public
 */
export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as IRegisterUserDto;

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

    //todo: ==>> Handle user Picture
    const createdUser = await prisma.user.create({
      data,
    });

    // eslint-disable-next-line no-unused-vars
    const { password, ...createdUserWithOutPassword } = createdUser;

    const token = generateJWT({
      id: createdUser.id,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
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
