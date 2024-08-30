/* eslint-disable no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

/**
 * @method  GET
 * @route   ~/api/users
 * @desc    Get All Users
 * @access  public 
 */
export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany();

    const userFromToken = verifyToken(req);
    if (userFromToken && userFromToken.isAdmin) {
      return NextResponse.json(users, { status: 200 });
    }

    const usersWithoutEmailsAndPasswords = users.map(
      ({ email: _, ...user }) => ({
        ...user,
      }),
    );

    return NextResponse.json(usersWithoutEmailsAndPasswords, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
