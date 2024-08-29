import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { IRegisterUserDto } from "@/types/dtos";
import { createUserSchema } from "@/schemas/validationsSchemas";
import bcrypt from "bcryptjs";
import generateJWT from "@/utils/generateJWT";

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

    const createdUser = await prisma.user.create({
      data,
    });

    // eslint-disable-next-line no-unused-vars
    const { password, ...createdUserWithOutPassword } = createdUser;

    const JWTPayload = {
      id: createdUser.id,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
    };

    const token = generateJWT(JWTPayload);

    return NextResponse.json(
      { ...createdUserWithOutPassword, token },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
